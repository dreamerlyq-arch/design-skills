#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(skillRoot, "references/source-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const args = process.argv.slice(2);
const strictHead = args.includes("--strict-head");
const jsonOutput = args.includes("--json");
const rootFlag = args.indexOf("--workspace-root");

if (rootFlag >= 0 && !args[rootFlag + 1]) {
  console.error("--workspace-root requires a path");
  process.exit(2);
}

const workspaceRoot = resolve(rootFlag >= 0 ? args[rootFlag + 1] : manifest.workspaceRoot);
const result = { workspaceRoot, products: {}, baselines: [], errors: [], warnings: [] };

function git(repo, command) {
  return execFileSync("git", command, { cwd: repo, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

for (const [name, product] of Object.entries(manifest.products)) {
  const repo = resolve(workspaceRoot, product.repository);
  const productResult = { repository: repo, expectedCommit: product.observedCommit, files: [] };
  result.products[name] = productResult;

  if (!existsSync(repo)) {
    result.errors.push(`${name}: repository not found at ${repo}`);
    continue;
  }

  try {
    productResult.currentCommit = git(repo, ["rev-parse", "HEAD"]);
    productResult.branch = git(repo, ["branch", "--show-current"]);
    if (productResult.currentCommit !== product.observedCommit) {
      const message = `${name}: HEAD moved from ${product.observedCommit.slice(0, 12)} to ${productResult.currentCommit.slice(0, 12)}`;
      (strictHead ? result.errors : result.warnings).push(message);
    }
  } catch (error) {
    result.errors.push(`${name}: cannot read git state (${error.message})`);
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
    const source = readFileSync(target, "utf8");
    for (const expected of invariant.includes) {
      if (!source.includes(expected)) {
        fileResult.ok = false;
        fileResult.missing.push(expected);
        result.errors.push(`${name}: ${invariant.file} no longer contains ${JSON.stringify(expected)}`);
      }
    }
  }
}

for (const baseline of manifest.baselines) {
  const target = resolve(skillRoot, baseline.file);
  const baselineResult = { file: baseline.file, ok: true };
  result.baselines.push(baselineResult);
  if (!existsSync(target)) {
    baselineResult.ok = false;
    result.errors.push(`baseline missing: ${baseline.file}`);
    continue;
  }
  const bytes = readFileSync(target);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  Object.assign(baselineResult, { width, height, sha256 });
  if (width !== baseline.width || height !== baseline.height) {
    baselineResult.ok = false;
    result.errors.push(`baseline dimensions changed: ${baseline.file} is ${width}x${height}, expected ${baseline.width}x${baseline.height}`);
  }
  if (sha256 !== baseline.sha256) {
    baselineResult.ok = false;
    result.errors.push(`baseline content changed without manifest refresh: ${baseline.file}`);
  }
}

if (jsonOutput) {
  console.log(JSON.stringify(result, null, 2));
} else {
  for (const [name, product] of Object.entries(result.products)) {
    const commit = product.currentCommit?.slice(0, 12) ?? "unavailable";
    const passed = product.files.filter((file) => file.ok).length;
    console.log(`${name}: ${commit} on ${product.branch || "unknown branch"}; ${passed}/${product.files.length} source checks passed`);
  }
  console.log(`baselines: ${result.baselines.filter((item) => item.ok).length}/${result.baselines.length} checks passed`);
  for (const warning of result.warnings) console.warn(`WARN ${warning}`);
  for (const error of result.errors) console.error(`ERROR ${error}`);
}

process.exit(result.errors.length > 0 ? 1 : 0);
