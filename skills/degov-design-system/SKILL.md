---
name: degov-design-system
description: Apply and maintain the DeGov cross-product design contract when adding, refining, or reviewing UI in DeGov Homepage, Atlas, or Square. Use for new pages, features, components, token mapping, theme alignment, and visual QA; do not use for backend-only or API-only work.
---

# DeGov Design System

Use the shared semantic contract while preserving each product's technology, information architecture, routes, data, authentication, analytics, and interactions. This skill is a visual and implementation guide, not a shared React component package.

## Locate the authority

Confirm the target product, current checkout, route, and relevant local component before editing.

| Product | Repository | Token entry | Reusable UI entry |
| --- | --- | --- | --- |
| Homepage | `Degov` | `src/app/site.css` | `src/components/ui/` |
| Atlas | `degov-agent-api` | `apps/atlas/app/atlas-tokens.css` | `apps/atlas/components/` |
| Square | `degov-square` | `web/src/app/square-tokens.css` | `web/src/components/ui/` |

On Dre's machine, look under `/Users/uncledre/Documents/Devlompment/`. Prefer the current workspace when it already points at one of these repositories.

Read [references/design-contract.md](references/design-contract.md) before making a visual-system decision. When available, use `/Users/uncledre/Documents/Devlompment/degov-design-system/index.html` as the human-facing visual reference and fixed-viewport review surface.

## Apply the system

1. Inspect the target route, product-local tokens, and the closest existing component or pattern.
2. Map the UI need to the semantic roles in the design contract.
3. Reuse or extend the target product's local implementation. Do not copy a component from another product or create a second base scale.
4. Preserve documented product exceptions: Homepage's marketing expression, Atlas's neutral product UI, and Square's warm-gold emphasis.
5. Add a new token or pattern only when the existing semantic contract cannot express a real need. Keep it product-local until repeated cross-product demand is demonstrated.

For Card and Panel work, use neutral surfaces and semantic boundaries. Atlas and Square do not use colored structural borders; Square reserves `#e5b47a` for action, selection, focus, and other product emphasis.

## Validate

Match validation to the change, and keep implementation checks separate from visual acceptance.

- For a new page, major pattern, or cross-product alignment, inspect the real route at a normal desktop viewport and at 390px.
- Confirm panel padding, control states, readable line lengths, local table/list overflow, and the absence of document-level horizontal overflow.
- Exercise loading, empty, error, hover, focus, selected, disabled, dialog, and drawer states when they are in scope.
- Confirm existing route, data, API, authentication, and analytics behavior remains unchanged.
- Report the product, route, viewport, theme, checks run, and any unverified surface.

## Maintain the source

The authoring checkout is `/Users/uncledre/Documents/Devlompment/design-skills/skills/degov-design-system/`. Treat `~/.codex/skills/degov-design-system/` as the installed copy.

When Dre asks to evolve the system, update the authoring checkout and the local visual document together when their shared rules change. Do not expand a one-off page treatment into a permanent cross-product rule without evidence of reuse.
