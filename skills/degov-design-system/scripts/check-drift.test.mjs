import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = join(dirname(fileURLToPath(import.meta.url)), "check-drift.mjs");
const products = { homepage: "Degov", atlas: "degov-agent-api", square: "degov-square" };
const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aS2kAAAAASUVORK5CYII=", "base64");

function git(repo, ...args) {
  return execFileSync("git", ["-c", "core.hooksPath=/dev/null", "-c", "commit.gpgsign=false", ...args], {
    cwd: repo,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), "degov-skill-drift-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const skill = join(root, "skill");
  const workspace = join(root, "workspace");
  mkdirSync(join(skill, "scripts"), { recursive: true });
  mkdirSync(join(skill, "references"), { recursive: true });
  mkdirSync(join(skill, "assets"), { recursive: true });
  copyFileSync(script, join(skill, "scripts/check-drift.mjs"));
  const manifest = { version: 1, workspaceRoot: workspace, products: {}, baselines: [] };
  for (const [name, repository] of Object.entries(products)) {
    const repo = join(workspace, repository);
    mkdirSync(repo, { recursive: true });
    git(repo, "-c", "init.templateDir=", "init", "--initial-branch=main");
    writeFileSync(join(repo, "tokens.css"), "--control-height: 40px;\n");
    git(repo, "add", "tokens.css");
    git(repo, "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "-m", "fixture");
    const reference = `references/${name}.md`;
    writeFileSync(join(skill, reference), `# ${name}\n`);
    manifest.products[name] = {
      repository,
      observedCommit: git(repo, "rev-parse", "HEAD"),
      reference,
      invariants: [{ file: "tokens.css", includes: ["--control-height: 40px;"] }],
    };
    const file = `assets/${name}.png`;
    writeFileSync(join(skill, file), png);
    manifest.baselines.push({ product: name, file, width: 1, height: 1, sha256: createHash("sha256").update(png).digest("hex") });
  }
  const save = () => writeFileSync(join(skill, "references/source-manifest.json"), JSON.stringify(manifest));
  save();
  const run = (...args) => {
    const outcome = spawnSync(process.execPath, [join(skill, "scripts/check-drift.mjs"), ...args, "--json"], { encoding: "utf8" });
    assert.equal(outcome.error, undefined);
    assert.equal(outcome.stderr, "", "JSON mode must not emit an exception or unstructured stderr");
    return { code: outcome.status, result: JSON.parse(outcome.stdout), stdout: outcome.stdout };
  };
  return { root, skill, workspace, manifest, save, run, repo: (name) => join(workspace, products[name]) };
}

test("default selection checks all products and assets", (t) => {
  const f = fixture(t);
  const { code, result } = f.run();
  assert.equal(code, 0);
  assert.deepEqual(Object.keys(result.products), Object.keys(products));
  assert.equal(result.baselines.length, 3);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.warnings, []);
  assert.match(result.limitations, /do not verify rendered UI or behavior/);
});

test("single-product selection ignores missing unrelated repositories and assets", (t) => {
  const f = fixture(t);
  rmSync(f.repo("atlas"), { recursive: true });
  rmSync(join(f.skill, "assets/atlas.png"));
  rmSync(join(f.skill, "references/square.md"));
  const { code, result } = f.run("--product", "homepage");
  assert.equal(code, 0);
  assert.deepEqual(Object.keys(result.products), ["homepage"]);
  assert.deepEqual(result.baselines.map((baseline) => baseline.product), ["homepage"]);
  assert.deepEqual(result.errors, []);
});

test("workspace-root overrides the manifest workspace", (t) => {
  const f = fixture(t);
  const moved = join(f.root, "moved workspace");
  renameSync(f.workspace, moved);
  const { code, result } = f.run("--workspace-root", moved, "--product", "homepage");
  assert.equal(code, 0);
  assert.equal(result.workspaceRoot, moved);
  assert.equal(result.products.homepage.repository, join(moved, products.homepage));
});

test("repo-root inspects the selected real worktree instead of the default checkout", (t) => {
  const f = fixture(t);
  const worktree = join(f.root, "review worktree");
  git(f.repo("homepage"), "worktree", "add", "--detach", worktree, "HEAD");
  writeFileSync(join(worktree, "tokens.css"), "--control-height: 44px;\n");
  const { code, result } = f.run("--product", "homepage", "--repo-root", worktree);
  assert.equal(code, 1);
  assert.equal(result.products.homepage.repository, worktree);
  assert.equal(result.products.homepage.workingTree.dirty, true);
  assert.match(result.errors.join("\n"), /no longer contains/);
  assert.equal(f.run("--product", "homepage").code, 0);
});

test("same-HEAD tracked and untracked changes are reported without file contents", (t) => {
  const f = fixture(t);
  writeFileSync(join(f.repo("homepage"), "tokens.css"), "--control-height: 40px;\n/* DO_NOT_PRINT_TRACKED_SECRET */\n");
  writeFileSync(join(f.repo("homepage"), "local.env"), "DO_NOT_PRINT_UNTRACKED_SECRET\n");
  const { code, result, stdout } = f.run("--product", "homepage");
  const product = result.products.homepage;
  assert.equal(code, 0);
  assert.equal(product.currentCommit, product.expectedCommit);
  assert.equal(product.workingTree.trackedChanges, 1);
  assert.equal(product.workingTree.untrackedFiles, 1);
  assert.deepEqual(product.workingTree.entries, [{ status: " M", path: "tokens.css" }, { status: "??", path: "local.env" }]);
  assert.match(result.warnings.join("\n"), /working tree is dirty/);
  assert.doesNotMatch(stdout, /DO_NOT_PRINT/);
});

test("git status preserves renamed paths containing spaces", (t) => {
  const f = fixture(t);
  git(f.repo("homepage"), "mv", "tokens.css", "renamed tokens.css");
  const { result } = f.run("--product", "homepage");
  assert.deepEqual(result.products.homepage.workingTree.entries, [{ status: "R ", path: "renamed tokens.css", originalPath: "tokens.css" }]);
});

test("HEAD change warns by default and fails in strict-head mode", (t) => {
  const f = fixture(t);
  git(f.repo("homepage"), "-c", "user.name=Fixture", "-c", "user.email=fixture@example.invalid", "commit", "--allow-empty", "-m", "advance");
  const normal = f.run("--product", "homepage");
  assert.equal(normal.code, 0);
  assert.match(normal.result.warnings.join("\n"), /HEAD moved/);
  const strict = f.run("--product", "homepage", "--strict-head");
  assert.equal(strict.code, 1);
  assert.match(strict.result.errors.join("\n"), /HEAD moved/);
});

test("git failure stops source checks for that product and returns structured errors", (t) => {
  const f = fixture(t);
  rmSync(join(f.repo("homepage"), ".git"), { recursive: true });
  rmSync(join(f.repo("homepage"), "tokens.css"));
  const { code, result } = f.run("--product", "homepage");
  assert.equal(code, 1);
  assert.deepEqual(result.products.homepage.files, []);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0], /cannot read git state.*source checks skipped/);
});

test("missing product reference, source file, and baseline are reported", (t) => {
  const f = fixture(t);
  rmSync(join(f.skill, "references/homepage.md"));
  rmSync(join(f.repo("homepage"), "tokens.css"));
  rmSync(join(f.skill, "assets/homepage.png"));
  const { code, result } = f.run("--product", "homepage");
  assert.equal(code, 1);
  assert.match(result.errors.join("\n"), /missing product reference/);
  assert.match(result.errors.join("\n"), /missing tokens.css/);
  assert.match(result.errors.join("\n"), /baseline missing/);
});

test("invalid PNG headers fail cleanly without RangeError", async (t) => {
  const f = fixture(t);
  const target = join(f.skill, "assets/homepage.png");
  const wrongSignature = Buffer.from(png);
  wrongSignature[0] = 0;
  const wrongChunk = Buffer.from(png);
  wrongChunk.write("IDAT", 12, "ascii");
  const wrongLength = Buffer.from(png);
  wrongLength.writeUInt32BE(1, 8);
  for (const [name, bytes] of [["empty", Buffer.alloc(0)], ["truncated IHDR", png.subarray(0, 24)], ["signature", wrongSignature], ["first chunk", wrongChunk], ["IHDR length", wrongLength]]) {
    await t.test(name, () => {
      writeFileSync(target, bytes);
      const { code, result } = f.run("--product", "homepage");
      assert.equal(code, 1);
      assert.match(result.errors.join("\n"), /invalid PNG header/);
      assert.equal(result.baselines[0].ok, false);
    });
  }
});

test("PNG dimensions and unchanged-dimension content are checked", (t) => {
  const f = fixture(t);
  const target = join(f.skill, "assets/homepage.png");
  const bytes = readFileSync(target);
  bytes.writeUInt32BE(2, 16);
  writeFileSync(target, bytes);
  const changedSize = f.run("--product", "homepage");
  assert.equal(changedSize.code, 1);
  assert.match(changedSize.result.errors.join("\n"), /dimensions changed/);
  bytes.writeUInt32BE(1, 16);
  bytes[bytes.length - 1] ^= 1;
  writeFileSync(target, bytes);
  const changedContent = f.run("--product", "homepage");
  assert.equal(changedContent.code, 1);
  assert.match(changedContent.result.errors.join("\n"), /content changed without manifest refresh/);
});

test("invalid CLI arguments exit 2 with structured errors", async (t) => {
  const f = fixture(t);
  for (const args of [["--unknown"], ["positional"], ["--product"], ["--product", "nope"], ["--workspace-root"], ["--repo-root"], ["--repo-root", f.repo("homepage")], ["--product", "homepage", "--product", "square"], ["--strict-head", "--strict-head"], ["--workspace-root", "--strict-head"]]) {
    await t.test(args.join(" "), () => {
      const { code, result } = f.run(...args);
      assert.equal(code, 2);
      assert.equal(result.errors.length, 1);
      assert.deepEqual(result.products, {});
    });
  }
});
