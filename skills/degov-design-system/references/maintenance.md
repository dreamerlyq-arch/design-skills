# Skill maintenance and drift checks

## Source and installed copy

Resolve the loaded package and any separate authoring/install mapping from the current environment. Compare mapped copies before editing and preserve intentional differences and unrelated changes. Edit the reconciled authoring source, validate, sync only changed files and verify parity. If no separate mapping exists, maintain the designated package in place. A local sync does not authorize publication.

## Scoped checker

Run from either skill directory. Use a check when relying on a dated snapshot, investigating source drift, or changing source mappings, manifest entries, or retained assets. Instruction-only maintenance does not require a product scan; routine local changes do not need repeated scans of unrelated products.

```sh
# One product at the actual checkout
node scripts/check-drift.mjs --product atlas --repo-root /absolute/path/to/degov-agent-api

# All three products under a different parent directory
node scripts/check-drift.mjs --workspace-root /absolute/path/to/parent

# Deliberate source snapshot refresh, with machine-readable output
node scripts/check-drift.mjs --product atlas --repo-root /absolute/path/to/degov-agent-api --strict-head --json
```

Provide a workspace root or a product plus repository root. A workspace root without a product checks all registered products and assets. Legacy manifests with an explicit workspaceRoot remain supported, but this package does not encode a personal default. `--product` also scopes baseline checks. The checker reads local files and Git state; it does not start a server or modify product files.

- Changed HEAD: warning normally, error with `--strict-head`.
- Dirty tracked or untracked files: warning, including when HEAD matches. Inspect relevance; this is not a reason to reset, stash, stage, or clean the checkout.
- Missing repository/reference/source, failed Git inspection, unmatched source invariant, or invalid/changed baseline asset: error. Investigate whether source changed legitimately or the snapshot is stale. Update source observations or asset hashes only after reviewing the corresponding legitimate change.
- Invalid CLI arguments: exit 2. Check failures: exit 1. No errors: exit 0, possibly with warnings.

The source checks are selected text markers, not a parser, complete token audit, behavior test, or proof that a design is accepted. Asset header/dimension/hash checks establish integrity only. Even `--strict-head` cannot prove that a deployed screenshot matches local source or that a dirty checkout is reproducible.

## Update only changed evidence

- Workflow clarification: update the relevant instruction; no screenshot or source-commit refresh is needed.
- Source mapping or token/component observation: inspect the changed files and update the narrow product reference/invariants. Advance its observed commit/date only after reviewing the snapshot represented by that claim; record dirty observations separately. Label a partial inspection with the exact owners reviewed.
- Accepted visual change: update only the affected route/theme/state capture using [baselines.md](baselines.md). Keep capture provenance independent from source observations.
- Shared semantic rule: update [design-contract.md](design-contract.md) after acceptance. Update an external design document only if the current task explicitly identifies that artifact and authorizes its maintenance.

Keep historical commits and image hashes until their corresponding evidence is actually refreshed. Unselected experiments and current uncommitted work are not new canonical baselines.

For reusable lessons, record the applicable scope, observed problem, change, actual check/result, evidence pointer, and limits. Keep recommendations, source observations or verified behavior, and user-accepted rules or visual decisions distinct. A direct user preference may be recorded immediately; a verified mechanism supports only the conditions tested. Label untested recommendations and match the stated result to the checks actually performed.

## Validate a skill change

Validate frontmatter, Markdown references and source/install parity. An available authoring validator may supplement these checks; discover it from the environment rather than requiring a personal path or Python dependency. Use the scoped drift check under the conditions above; no manifest or asset refresh is needed for wording alone. If the checker changed, also run `node --test scripts/check-drift.test.mjs`. For substantial instruction changes, use realistic small-edit, shared-component, and QA scenarios to check routing and scope without mutating products; scenario reasoning is not evidence of actual runtime or visual behavior.

## Evolving decisions

For changeable or disputed rules, record scope, status (accepted decision, candidate, implementation observation or historical reference), last confirmation/verification date when known, and the rule it supersedes. Keep unknown acceptance explicit. Reconciliation dates are not acceptance dates; file modification time and commit time do not determine authority. Prefer applicable, accepted and verified evidence over recency alone. Keep task logs separate and reserve decision metadata for rules whose scope or authority needs clarification.

## Writing useful guidance

Lead ordinary design rules with the action, its applicable context and the intended result. Consolidate repeated rules at their owning reference and keep diagnostic examples optional. Retain explicit prohibitions for consequential safety or permission boundaries; state ordinary presentation choices through the preferred implementation and meaningful exceptions. Preserve confirmed intent when rewording, and assess changes by decision quality rather than keyword counts.
