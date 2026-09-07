# Skill maintenance and drift checks

## Source and installed copy

- Authoring source: `/Users/uncledre/Documents/Devlompment/design-skills/skills/degov-design-system/`.
- Installed copy: `/Users/uncledre/.codex/skills/degov-design-system/`.

Inspect both copies and the authoring repository's diff before editing. Preserve unrelated changes and reconcile intentional differences; never treat the current product repository as the skill authoring repository. Edit the authoring source, validate it, then sync the changed skill files to the installed copy and compare them. A local sync does not imply commit, push, or publication.

## Scoped checker

Run from either skill directory. Use a check when relying on a dated snapshot, investigating source drift, or changing source mappings, manifest entries, or retained assets. Instruction-only maintenance does not require a product scan; routine local changes do not need repeated scans of unrelated products.

```sh
# One product at its registered checkout
node scripts/check-drift.mjs --product atlas

# The actual target worktree; --repo-root requires --product
node scripts/check-drift.mjs --product atlas --repo-root /absolute/path/to/degov-agent-api

# All three products under a different parent directory
node scripts/check-drift.mjs --workspace-root /absolute/path/to/parent

# Deliberate source snapshot refresh, with machine-readable output
node scripts/check-drift.mjs --product atlas --strict-head --json
```

No arguments checks all registered products and assets. `--product` also scopes baseline checks. The checker reads local files and Git state; it does not start a server or modify product files.

- Changed HEAD: warning normally, error with `--strict-head`.
- Dirty tracked or untracked files: warning, including when HEAD matches. Inspect relevance; this is not a reason to reset, stash, stage, or clean the checkout.
- Missing repository/reference/source, failed Git inspection, unmatched source invariant, or invalid/changed baseline asset: error. Investigate whether source changed legitimately or the snapshot is stale. Do not edit source or hashes merely to make the checker pass.
- Invalid CLI arguments: exit 2. Check failures: exit 1. No errors: exit 0, possibly with warnings.

The source checks are selected text markers, not a parser, complete token audit, behavior test, or proof that a design is accepted. Asset header/dimension/hash checks establish integrity only. Even `--strict-head` cannot prove that a deployed screenshot matches local source or that a dirty checkout is reproducible.

## Update only changed evidence

- Workflow clarification: update the relevant instruction; no screenshot or source-commit refresh is needed.
- Source mapping or token/component observation: inspect the changed files and update the narrow product reference/invariants. Advance its observed commit/date only after reviewing the snapshot represented by that claim; record dirty observations separately. Do not mark a partial inspection as a complete product refresh.
- Accepted visual change: update only the affected route/theme/state capture using [baselines.md](baselines.md). Keep capture provenance independent from source observations.
- Shared semantic rule: update [design-contract.md](design-contract.md) after acceptance, then the local human-facing document at `/Users/uncledre/Documents/Devlompment/degov-design-system/index.html` if that rule is represented there. Do not update that document for script fixes or workflow wording alone.

Keep historical commits and image hashes until their corresponding evidence is actually refreshed. Unselected experiments and current uncommitted work are not new canonical baselines.

For reusable lessons, record the applicable scope, observed problem, change, actual check/result, evidence pointer, and limits. Keep recommendations, source observations or verified behavior, and user-accepted rules or visual decisions distinct. A direct user preference may be recorded immediately; a verified mechanism supports only the conditions tested. Label untested recommendations, and do not run unrelated product work to turn a documentation update into a validation claim.

## Validate a skill change

Run `python3 /Users/uncledre/.codex/skills/.system/skill-creator/scripts/quick_validate.py .` and check Markdown links and source/install parity. Use the scoped drift check under the conditions above; no manifest or asset refresh is needed for wording alone. If the checker changed, also run `node --test scripts/check-drift.test.mjs`. For substantial instruction changes, use realistic small-edit, shared-component, and QA scenarios to check routing and scope without mutating products; scenario reasoning is not evidence of actual runtime or visual behavior.
