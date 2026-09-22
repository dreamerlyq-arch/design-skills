# Maintaining the PubFi skill

## Scope and evidence

- Keep reusable design intent, authority boundaries, and source ownership here. Repository source/tests own implementation details; task evidence owns commit/PR history and verification logs. Keep each rule understandable from this package and the named source owners.
- Source maps locate current owners; they are not immutable specifications or visual acceptance. Inspect the intended revision and working-tree state before relying on them. A committed branch is not automatically merged, deployed, or accepted.
- Distinguish an explicit user rule, a user-accepted design, a current implementation observation, and a recommendation. Keep recommendations scoped; a tested mechanism supports only the conditions tested. Retain the conditions and scope that make a lesson reusable.
- For suspected regressions, compare the relevant original and current owners before attributing a difference to a merge. Then compare rendered states at the same viewport. Preserve deliberate surface exceptions.
- Updating a skill does not authorize changing application behavior or approving experiments to make a checker pass. A missing visual baseline does not block a local fix whose intended result is clear.

## Update and synchronize

1. Locate this package from its loaded `SKILL.md`. Resolve repository paths from the target workspace. Separate authoring/install mappings, personal browser preferences, and artifact directories belong to environment configuration or local rules.
2. If multiple copies are explicitly mapped, compare them first and preserve inherited differences. Edit shared intent in `design-contract.md`, authority in `authority.md`, and surface details in their own references. Keep homepage-only compositions scoped.
3. Review changed wording for scope, contradictions, unsupported acceptance claims, hidden cross-project context, and mandatory tools that the package does not provide. Keep necessary dependency requirements explicit.
4. Validate frontmatter (`name` and `description`), reference links/anchors, source pointers affected by the edit, and any retained assets. Run the bundled checker as appropriate below. External authoring validators are optional and must declare their own dependencies; this skill does not require another skill or Python packages.
5. When changing the checker, test meaningful success and failure paths, including a relocated skill, a workspace path containing spaces, a source archive without Git, missing owners, and altered registered assets. Use isolated fixture assets for destructive checker tests and preserve retained baselines.
6. Synchronize only intended changed files to mapped copies and compare their contents. Preserve unrelated files and assets. Report the actual scope and remaining verification gaps.

## Bundled pointer and asset check

Requires Node.js 18 or newer; uses only Node built-ins. No package installation, Git history, browser, network, or personal checkout path is required.

From this skill directory, with an explicitly selected workspace:

```sh
node scripts/check-drift.mjs --workspace-root /path/to/pubfi-checkout
node scripts/check-drift.mjs --workspace-root /path/to/pubfi-checkout --json
```

Without `--workspace-root`, the checker searches upward from the current working directory for the manifest's workspace markers. It does not search a personal home directory or use the skill's authoring repository as a default. Source archives and worktrees are supported. If discovery fails, select the workspace explicitly.

For package references and registered assets without checking application source:

```sh
node scripts/check-drift.mjs --skill-only
```

- `source-manifest.json` lists bounded source-owner paths and package references. It does not duplicate source code, token values, CSS selectors, or auth implementation strings. Keep source assertions in the owning repository's tests.
- A missing registered file or damaged asset is evidence drift to investigate, not proof of a product defect. A valid file does not establish that its contents still satisfy a design rule.
- Baselines require a skill-relative path, PNG dimensions, SHA-256, and capture/acceptance context described in [Baselines](baselines.md#adding-a-canonical-baseline). Asset checks verify identity and header dimensions, not rendered fidelity or full PNG decoding.
- Exit codes: `0` means the selected pointer/integrity checks passed, `1` means evidence needs investigation, and `2` means invalid arguments. No registered baselines means no image comparison was performed.

Run these checks for maintenance of their evidence, not as mandatory prerequisites for every PubFi task. Skill-only edits do not require application build/release lanes. Passing checks never proves runtime behavior, design compliance, or user acceptance.

## Evolving decisions

For changeable or disputed rules, record scope, status (accepted decision, candidate, implementation observation or historical reference), last confirmation/verification date when known, and the rule it supersedes. Keep unknown acceptance explicit. Reconciliation dates are not acceptance dates; file modification time and commit time do not determine authority. Prefer applicable, accepted and verified evidence over recency alone. Keep task logs separate and reserve decision metadata for rules whose scope or authority needs clarification.

## Writing useful guidance

Lead ordinary design rules with the action, its applicable context and the intended result. Consolidate repeated rules at their owning reference and keep diagnostic examples optional. Retain explicit prohibitions for consequential safety or permission boundaries; state ordinary presentation choices through the preferred implementation and meaningful exceptions. Preserve confirmed intent when rewording, and assess changes by decision quality rather than keyword counts.
