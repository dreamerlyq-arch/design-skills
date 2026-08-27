---
name: degov-design-system
description: Apply and maintain the DeGov cross-product design contract when adding, refining, or reviewing UI in DeGov Homepage, Atlas, or Square. Use for new pages, features, components, token mapping, theme alignment, and visual QA; do not use for backend-only or API-only work.
---

# DeGov Design System

Use this skill as a source map and verification gate, not as permission to redesign a product. Homepage, Atlas, and Square share semantic intent but keep product-local components, routes, data, authentication, analytics, and interaction behavior.

## Resolve the target

Before editing, state the product, route, repository, current commit, viewport, and closest existing pattern. On Dre's machine the repositories are under `/Users/uncledre/Documents/Devlompment/`.

| Product | Repository | Required product reference |
| --- | --- | --- |
| Homepage | `Degov` | [references/homepage.md](references/homepage.md) |
| Atlas | `degov-agent-api` | [references/atlas.md](references/atlas.md) |
| Square | `degov-square` | [references/square.md](references/square.md) |

Always read [references/design-contract.md](references/design-contract.md). Then read only the target product reference. For new pages, forms, asynchronous UI, responsive work, dialogs, drawers, or list/table work, also read [references/state-matrix.md](references/state-matrix.md). For visual comparison or release QA, read [references/baselines.md](references/baselines.md).

## Authority order

Use the first available authority in this order:

1. Current user instruction and closer repository rules.
2. The current target route and its imported product-local component.
3. The target product token entry and reusable component listed in its reference.
4. The target product reference in this skill.
5. The shared design contract.
6. The stored screenshot baseline, which is comparison evidence rather than source code.

If a product file contradicts a shared rule, preserve the product implementation and document the exception. Do not silently normalize it. If the drift checker reports a missing invariant or the current route differs materially from its baseline, inspect the new source before editing and treat the reference as stale until reconciled.

## Preflight

Run the drift check from the skill authoring or installed directory:

```sh
node scripts/check-drift.mjs
```

Use `--strict-head` only for a deliberate reference refresh. A changed commit is a warning because normal product work advances HEAD; a missing source file, missing invariant, or changed baseline asset is an error.

Then inspect the target route, token entry, nearest existing component, its callers, and all states in scope. Never choose a component only because another DeGov product has a similarly named one.

## Implement

1. Reuse the product-local component or pattern named in the relevant product reference.
2. Map visual values through the product token entry. Do not introduce a second base scale or copy another product's CSS/React implementation.
3. Preserve product character: Homepage is editorial marketing; Atlas is neutral and data-dense; Square is neutral with restrained warm-gold emphasis.
4. Preserve source behavior: route results, data/API semantics, authentication, wallet state, analytics, external destinations, keyboard behavior, and accessible names.
5. Add a product-local exception only when the existing contract cannot express the real need. Promote it to the shared contract only after repeated accepted use.

For Card and Panel work, use neutral surfaces and semantic hierarchy. Atlas and Square do not use colored structural borders. Square reserves `#e5b47a` for product emphasis, action, focus, and selection.

## Validate

- Compare a major change at 1440×1000 and 390×844 against the relevant stored baseline and the current live route.
- Exercise every applicable row in the state matrix; do not infer loading, empty, error, invalid, disabled, selected, focus, dialog, or drawer behavior from the default state.
- Check panel padding, heading wrapping, local table/list overflow, fixed or sticky elements, and document-level horizontal overflow.
- Run the target repository's existing design/build/type checks in addition to `scripts/check-drift.mjs`.
- Report the product, route, source commit, viewport, theme, state coverage, checks run, and anything not verified.

## Maintain the skill

The authoring checkout is `/Users/uncledre/Documents/Devlompment/design-skills/skills/degov-design-system/`; `~/.codex/skills/degov-design-system/` is the installed copy. When accepted product work changes a canonical token, component, state, or page baseline, update the relevant product reference, `references/source-manifest.json`, and baseline assets in the same skill change. Update the local visual document at `/Users/uncledre/Documents/Devlompment/degov-design-system/index.html` only when shared human-facing rules change.
