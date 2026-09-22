#!/usr/bin/env node
// Bounded source-pointer and registered PNG identity checks; not UI compliance.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const usage = 'Usage: node check-drift.mjs [--workspace-root PATH | --skill-only] [--json]';
let workspaceArg;
let skillOnly = false;
let jsonOutput = false;
const args = process.argv.slice(2);
function argumentError(message) {
  console.error(`${message}\n${usage}`);
  process.exit(2);
}
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--workspace-root') {
    if (workspaceArg !== undefined || !args[i + 1] || args[i + 1].startsWith('--')) {
      argumentError('--workspace-root requires one path and may occur only once');
    }
    workspaceArg = args[++i];
  } else if (arg === '--skill-only') skillOnly = true;
  else if (arg === '--json') jsonOutput = true;
  else if (arg === '--help') { console.log(usage); process.exit(0); }
  else argumentError(`Unknown argument: ${arg}`);
}
if (skillOnly && workspaceArg !== undefined) argumentError('Choose --skill-only or --workspace-root');

const result = { mode: skillOnly ? 'skill-only' : 'workspace', workspaceRoot: null,
  references: [], files: [], baselines: [], errors: [],
  limits: 'Pointer and asset identity checks only; no runtime, visual, or acceptance validation.' };
function localPath(root, file) {
  if (typeof file !== 'string' || !file || isAbsolute(file)) throw new Error('Paths must be nonempty relative paths');
  const target = resolve(root, file);
  const within = relative(root, target);
  if (!within || within === '..' || within.startsWith('..' + sep) || isAbsolute(within)) throw new Error(`Path escapes its root: ${file}`);
  return target;
}
function isFile(path) { return existsSync(path) && statSync(path).isFile(); }
function checkFile(root, file, bucket, label) {
  const item = { file, ok: false };
  bucket.push(item);
  try {
    item.ok = isFile(localPath(root, file));
    if (!item.ok) result.errors.push(`${label} missing or not a file: ${file}`);
  } catch (error) { result.errors.push(`${label}: ${error.message}`); }
}
try {
  const manifest = JSON.parse(readFileSync(resolve(skillRoot, 'references/source-manifest.json'), 'utf8'));
  if (manifest.version !== 2 || !Array.isArray(manifest.references) || !manifest.references.length
      || !Array.isArray(manifest.sourceOwners) || !manifest.sourceOwners.length
      || !Array.isArray(manifest.workspaceMarkers) || !manifest.workspaceMarkers.length || !Array.isArray(manifest.baselines)) {
    throw new Error('Invalid source manifest schema (version 2 required)');
  }
  for (const file of manifest.references) checkFile(skillRoot, file, result.references, 'reference');
  if (!skillOnly) {
    const matches = (root) => manifest.workspaceMarkers.every((file) => isFile(localPath(root, file)));
    let candidate = resolve(workspaceArg ?? process.cwd());
    if (workspaceArg === undefined) {
      while (!matches(candidate) && dirname(candidate) !== candidate) candidate = dirname(candidate);
    }
    if (!matches(candidate)) {
      result.errors.push('PubFi workspace markers not found; select the intended checkout with --workspace-root');
    } else {
      result.workspaceRoot = candidate;
      for (const file of manifest.sourceOwners) checkFile(candidate, file, result.files, 'source owner');
    }
  }
  for (const baseline of manifest.baselines) {
    const item = { file: baseline.file, ok: false };
    result.baselines.push(item);
    try {
      if (!Number.isInteger(baseline.width) || baseline.width <= 0 || !Number.isInteger(baseline.height)
          || baseline.height <= 0 || !/^[a-f0-9]{64}$/.test(baseline.sha256)) {
        throw new Error('invalid registered dimensions or SHA-256');
      }
      const bytes = readFileSync(localPath(skillRoot, baseline.file));
      if (bytes.length < 33 || bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a'
          || bytes.readUInt32BE(8) !== 13 || bytes.toString('ascii', 12, 16) !== 'IHDR') {
        throw new Error('not a PNG with a readable IHDR');
      }
      item.width = bytes.readUInt32BE(16);
      item.height = bytes.readUInt32BE(20);
      item.sha256 = createHash('sha256').update(bytes).digest('hex');
      if (item.width !== baseline.width || item.height !== baseline.height) throw new Error('registered dimensions differ');
      if (item.sha256 !== baseline.sha256) throw new Error('registered content hash differs');
      item.ok = true;
    } catch (error) { result.errors.push(`baseline ${baseline.file}: ${error.message}`); }
  }
} catch (error) { result.errors.push(error.message); }

if (jsonOutput) console.log(JSON.stringify(result, null, 2));
else {
  const passed = (items) => `${items.filter((item) => item.ok).length}/${items.length}`;
  console.log(`references: ${passed(result.references)} found`);
  console.log(skillOnly ? 'source owners: not checked (--skill-only)' : `source owners: ${passed(result.files)} found`);
  console.log(result.baselines.length ? `baseline integrity: ${passed(result.baselines)}` : 'baselines: none registered; no image comparison performed');
  console.log(result.limits);
  for (const error of result.errors) console.error(`ERROR ${error}`);
}
process.exit(result.errors.length ? 1 : 0);
