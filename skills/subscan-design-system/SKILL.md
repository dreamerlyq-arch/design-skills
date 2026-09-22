---
name: subscan-design-system
description: Apply Subscan UI source mappings and evidence-based module patterns when auditing existing pages, reviewing UI changes, or designing and implementing new Subscan interfaces. Covers explorer layout, amounts, addresses, tables, navigation, forms, themes, and chain-specific modules; routes www and portfolio to their own visual owners. Excludes backend-only work.
---

# Subscan Design System

Status: local reviewable draft, established 2026-09-22. The source mappings are verified; proposed visual baselines have not received final design approval. Treat site-wide visual approval as open until the relevant scope is accepted.

## Start from the correct surface

1. Identify repository, revision, product surface, chain, route, changed module and relevant states. Read current project instructions and preserve unrelated changes.
2. Read [source map](references/source-map.md). Explorer, www and portfolio are separate surfaces. Verify paths and exports in the checkout being edited; this map is not a fixed API contract.
3. For an audit, read [review workflow](references/review-workflow.md). For a new page, read [composition candidates](references/page-compositions.md) and the relevant [module patterns](references/module-patterns.md). A local fix needs only its owner and affected pattern; consult [failure mechanisms](references/counterexamples.md) when diagnosing or adopting a suspect analogue, not for every edit.

## Authority and evidence

- Explicit user-approved designs and decisions take precedence. Record what was approved, its scope and evidence; distinguish that design decision from permission to maintain the skill.
- Shared source and repeated rendered patterns establish existing implementation, not automatically an approved visual rule.
- Candidate patterns below guide proposals. New visual decisions remain proposals until accepted; derive reusable values from the relevant accepted owner and scope.
- Select baselines for their verified strengths and record their exceptions. Separate data correctness, functional failures, visual mismatches and subjective design suggestions.
- Existing audits are snapshots. Inspect the current source before assuming a recorded defect still exists.

## Audit existing UI

Map changed files to route → chain → module → state. Distinguish new routes, new modules on old routes, modified shared components, and navigation entries. Count unique root causes separately from affected pages. Compare a changed module with the closest existing analogue and adjacent modules, not an unrelated whole page.

For each finding report impact, owner, reproducible condition, evidence level, proposed correction and uncovered states. Distinguish introduced, pre-existing and uncertain attribution. A successful lint, screenshot, HTTP response or reused component does not establish visual/behavioral acceptance.

## Design new UI

Start with the closest suitable module pattern and its actual shared components. Explain the chosen layout, information hierarchy and state behavior before inventing a new pattern. Preserve product meaning, units, precision, links and conditional chain behavior.

Verify final composed UI: Text can be inline, Balance can set its own font size, and a domain StatusTag is not automatically a global status system. Reuse alone does not guarantee consistent hierarchy or behavior.

Keep loading, empty, error and populated states distinct. Ensure real links look interactive, form controls have names and feedback, and shareable navigation restores state. Preserve content when rearranging narrow layouts.

## Completion and maintenance

Report actual changed modules, verification evidence and unverified areas. Describe representative coverage by its actual page families and states. Scale validation to the affected surface and risk.

Use [maintenance](references/maintenance.md) to resolve package copies, reconcile evolving decisions and verify changes. Keep volatile route counts and task evidence outside the effective rules. This package remains usable without old reports or another design skill.
