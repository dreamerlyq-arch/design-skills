---
name: degov-design-system
description: Apply DeGov product design rules and source mappings when implementing or reviewing Homepage, Atlas, or Square UI, shared tokens, components, themes, and visual QA. Excludes backend-only and API-only work.
---

# DeGov Design System

Keep the three products coherent through semantic roles and product-local components. This skill provides source mappings and design constraints; it does not authorize a redesign or a change to product behavior.

## Resolve the target

Identify the requested product and route, actual checkout, branch/diff, and the component imported by that route. Resolve the repositories below from the current environment or user-selected worktree; their names are lookup hints, not fixed locations. A product name or historical port alone does not establish the target.

| Product | Repository | Required product reference |
| --- | --- | --- |
| Homepage | `Degov` | [references/homepage.md](references/homepage.md) |
| Atlas | `degov-agent-api` | [references/atlas.md](references/atlas.md) |
| Square | `degov-square` | [references/square.md](references/square.md) |

Read the target product reference, then load additional guidance only as needed:

| Task | Guidance and verification scope |
| --- | --- |
| Local spacing, type, copy, or style fix | Inspect the caller and local tokens; verify the affected presentation and states. Keep the review within the affected product and states. |
| New UI, shared component, token, theme, or responsive change | Read [design-contract.md](references/design-contract.md) and relevant rows in [state-matrix.md](references/state-matrix.md). Check affected consumers and rendered variants in the target product. |
| Visual comparison or whole-product QA | Read [baselines.md](references/baselines.md). Inventory requested routes, themes, states, and viewports; reconcile coverage before claiming completion. |
| Skill/source refresh or suspected drift | Read [maintenance.md](references/maintenance.md). Check only the affected product unless the task spans products. |

## Authority order

Current user instructions and closer repository rules control scope. Within that scope:

- Confirmed product tokens and shared components own reusable visual rules. Inspect the actual import and CSS cascade before choosing an owner.
- The current route establishes behavior, content, and applicability. Existing code or an uncommitted diff is evidence, not proof of an accepted design. Preserve inherited work and documented exceptions; promote a local override only with scoped acceptance.
- Product references are dated source snapshots. The shared contract supplies semantic defaults where the product has no established pattern. Screenshots supply visual comparison evidence, not component or behavior authority.

When these disagree, inspect source and acceptance context. Resolve discrepancies against the current owner and accepted intent; clarify conflicts that materially change the requested outcome.

## Implement

- Reuse the target product's imported component and token owner. Fix a shared defect in that owner and check its affected consumers; similar names across repositories do not make implementations interchangeable.
- Preserve product character: Homepage is editorial marketing; Atlas is neutral and data-dense; Square uses neutral surfaces with restrained warm-gold emphasis. Atlas and Square structural borders stay neutral; semantic status colors retain their meaning.
- Preserve content, destinations, route results, data/API semantics, authentication, wallet state, analytics, keyboard behavior, and accessible names unless the user explicitly authorizes that behavior change.
- Keep new exceptions local until accepted. Promote them to shared rules only when repeated accepted use supports it.

## Validate

- Choose checks from the changed owner and affected behavior, while honoring required repository checks. A local visual fix does not automatically require a full build or all-product drift scan.
- For layout or visual acceptance, inspect the actual target route at the agreed viewport; for responsive changes include the affected narrow layout. Use baseline dimensions only when comparing that baseline. Read [baselines.md](references/baselines.md) for defaults and special surfaces such as `/deck`.
- Exercise applicable states, actual client navigation for route/motion changes, and affected light/dark variants. Check natural heading wraps, local table overflow, sticky elements, and document overflow where relevant.
- Distinguish source checks, runtime checks, visual/behavior review, and user acceptance. Report actual coverage and material gaps; a passing drift script, build, HTTP response, or screenshot alone does not prove usability.

## Maintain the skill

Use [maintenance.md](references/maintenance.md) for environment-resolved package locations, scoped drift commands, and reference or baseline updates. Keep implementation observations separate from accepted design decisions; refresh only the evidence that actually changed.
