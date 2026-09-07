#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const jsonOutput = args.includes("--json");
const result = { workspaceRoot: null, products: {}, baselines: [], errors: [], warnings: [] };
const limitations = "Checks cover source text and baseline asset integrity; they do not verify rendered UI or behavior.";

function finish(code) {
  if (jsonOutput) {
    console.log(JSON.stringify({ ...result, limitations }, null, 2));
  } else {
    for (const [name, product] of Object.entries(result.products)) {
      const commit = product.currentCommit?.slice(0, 12) ?? "unavailable";
      const passed = product.files.filter((file) => file.ok).length;
      console.log(`${name}: ${commit} on ${product.branch || "detached or unavailable"}; ${passed}/${product.files.length} source text invariants passed`);
    }
    console.log(`baselines: ${result.baselines.filter((item) => item.ok).length}/${result.baselines.length} asset integrity checks passed`);
    for (const warning of result.warnings) console.warn(`WARN ${warning}`);
    for (const error of result.errors) console.error(`ERROR ${error}`);
    console.log(limitations);
  }
  process.exit(code);
}

function parseArgs() {
  const options = {};
  const booleanFlags = new Set(["--strict-head", "--json"]);
  const valueFlags = new Set(["--workspace-root", "--product", "--repo-root"]);
  for (let i = 0; i < args.length; i += 1) {
    const flag = args[i];
    if (!booleanFlags.has(flag) && !valueFlags.has(flag)) {
      throw new Error(`Unknown argument: ${flag}`);
    }
    if (Object.hasOwn(options, flag)) throw new Error(`Duplicate argument: ${flag}`);
    if (booleanFlags.has(flag)) {
      options[flag] = true;
    } else {
      const value = args[i + 1];
      if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
      options[flag] = value;
      i += 1;
    }
  }
  if (options["--repo-root"] && !options["--product"]) {
    throw new Error("--repo-root requires --product homepage|atlas|square");
  }
  if (options["--product"] && !["homepage", "atlas", "square"].includes(options["--product"])) {
    throw new Error(`Unknown product: ${options["--product"]}; expected homepage, atlas, or square`);
  }
  return options;
}

let options;
try {
  options = parseArgs();
} catch (error) {
  result.errors.push(error.message);
  finish(2);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(resolve(skillRoot, "references/source-manifest.json"), "utf8"));
  if (!manifest.workspaceRoot || !manifest.products || !Array.isArray(manifest.baselines)) {
    throw new Error("workspaceRoot, products, and baselines are required");
  }
  if (options["--product"] && !manifest.products[options["--product"]]) {
    throw new Error(`manifest has no ${options["--product"]} product`);
  }
} catch (error) {
  result.errors.push(`Cannot read source manifest: ${error.message}`);
  finish(1);
}

const workspaceRoot = resolve(options["--workspace-root"] ?? manifest.workspaceRoot);
result.workspaceRoot = workspaceRoot;
const selectedProduct = options["--product"];

function git(repo, command, trim = true) {
  const output = execFileSync("git", command, {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return trim ? output.trim() : output;
}

function readWorkingTree(repo) {
  const records = git(repo, ["status", "--porcelain=v1", "-z", "--untracked-files=all"], false).split("\0");
  const entries = [];
  for (let i = 0; i < records.length; i += 1) {
    if (!records[i]) continue;
    const status = records[i].slice(0, 2);
    const entry = { status, path: records[i].slice(3) };
    if (status.includes("R") || status.includes("C")) entry.originalPath = records[++i];
    entries.push(entry);
  }
  return {
    dirty: entries.length > 0,
    trackedChanges: entries.filter((entry) => entry.status !== "??").length,
    untrackedFiles: entries.filter((entry) => entry.status === "??").length,
    entries,
  };
}

for (const [name, product] of Object.entries(manifest.products)) {
  if (selectedProduct && name !== selectedProduct) continue;
  const repo = resolve(options["--repo-root"] ?? resolve(workspaceRoot, product.repository));
  const productResult = { repository: repo, expectedCommit: product.observedCommit, reference: product.reference, files: [] };
  result.products[name] = productResult;

  if (!product.reference || !existsSync(resolve(skillRoot, product.reference))) {
    result.errors.push(`${name}: missing product reference ${product.reference ?? "<unspecified>"}`);
  }
  if (!existsSync(repo)) {
    result.errors.push(`${name}: repository not found at ${repo}`);
    continue;
  }

  try {
    productResult.currentCommit = git(repo, ["rev-parse", "HEAD"]);
    productResult.branch = git(repo, ["branch", "--show-current"]);
    productResult.workingTree = readWorkingTree(repo);
  } catch {
    result.errors.push(`${name}: cannot read git state at ${repo}; source checks skipped`);
    continue;
  }

  if (productResult.currentCommit !== product.observedCommit) {
    const message = `${name}: HEAD moved from ${product.observedCommit.slice(0, 12)} to ${productResult.currentCommit.slice(0, 12)}`;
    (options["--strict-head"] ? result.errors : result.warnings).push(message);
  }
  const workingTree = productResult.workingTree;
  if (workingTree.dirty) {
    result.warnings.push(`${name}: working tree is dirty (${workingTree.trackedChanges} tracked changes, ${workingTree.untrackedFiles} untracked files); HEAD alone does not identify the inspected source`);
  }

  for (const invariant of product.invariants) {
    const target = resolve(repo, invariant.file);
    const fileResult = { file: invariant.file, ok: true, missing: [] };
    productResult.files.push(fileResult);
    if (!existsSync(target)) {
      fileResult.ok = false;
      fileResult.missing.push("<file>");
      result.errors.push(`${name}: missing ${invariant.file}`);
      continue;
    }
    let source;
    try {
      source = readFileSync(target, "utf8");
    } catch {
      fileResult.ok = false;
      result.errors.push(`${name}: cannot read ${invariant.file}`);
      continue;
    }
    for (const expected of invariant.includes) {
      if (!source.includes(expected)) {
        fileResult.ok = false;
        fileResult.missing.push(expected);
        result.errors.push(`${name}: ${invariant.file} no longer contains ${JSON.stringify(expected)}`);
      }
    }
  }
}

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
for (const baseline of manifest.baselines) {
  if (!baseline.product || !manifest.products[baseline.product]) {
    result.errors.push(`baseline has missing or unknown product: ${baseline.file}`);
    continue;
  }
  if (selectedProduct && baseline.product !== selectedProduct) continue;
  const target = resolve(skillRoot, baseline.file);
  const baselineResult = { product: baseline.product, file: baseline.file, ok: true };
  result.baselines.push(baselineResult);
  if (!existsSync(target)) {
    baselineResult.ok = false;
    result.errors.push(`baseline missing: ${baseline.file}`);
    continue;
  }
  let bytes;
  try {
    bytes = readFileSync(target);
  } catch {
    baselineResult.ok = false;
    result.errors.push(`cannot read baseline: ${baseline.file}`);
    continue;
  }
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  baselineResult.sha256 = sha256;
  if (bytes.length < 33 || !bytes.subarray(0, 8).equals(pngSignature)
    || bytes.readUInt32BE(8) !== 13 || bytes.toString("ascii", 12, 16) !== "IHDR") {
    baselineResult.ok = false;
    result.errors.push(`invalid PNG header: ${baseline.file}`);
    continue;
  }
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  Object.assign(baselineResult, { width, height });
  if (width === 0 || height === 0 || width !== baseline.width || height !== baseline.height) {
    baselineResult.ok = false;
    result.errors.push(`baseline dimensions changed: ${baseline.file} is ${width}x${height}, expected ${baseline.width}x${baseline.height}`);
  }
  if (sha256 !== baseline.sha256) {
    baselineResult.ok = false;
    result.errors.push(`baseline content changed without manifest refresh: ${baseline.file}`);
  }
}

finish(result.errors.length > 0 ? 1 : 0);
