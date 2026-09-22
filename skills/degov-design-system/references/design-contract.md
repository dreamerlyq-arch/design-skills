# DeGov cross-product design contract

Use this reference for shared semantic intent when adding UI or changing shared tokens/components. Exact values and product exceptions belong in the product references and confirmed source owners. An established product pattern takes precedence over the shared fallback.

## Architecture

The system has three layers:

1. **Primitive:** stable color, type, spacing, radius, shadow, and motion values.
2. **Semantic:** UI roles such as surface, text, border, control, focus, and status.
3. **Theme:** Homepage, Atlas, and Square overrides of semantic roles.

Products consume the contract through local CSS and components. Shared visual semantics do not imply a shared React package or permission to move code between repositories.

## Product boundaries

| Product | Character and exceptions |
| --- | --- |
| Homepage | Editorial marketing, white emphasis, generous narrative spacing. Marketing CTA and generic UI exports have different contracts; inspect the caller. `/deck` is a separate presentation surface. |
| Atlas | Neutral data UI, white action/focus emphasis, compact rows, explicit source and status information. |
| Square | Neutral application surfaces, warm-gold action/focus/selection emphasis, dark and light theme mappings. Gold does not color structural Card, Panel, table, or row borders. |

Use each product's existing font, type, spacing, radius, control-height, and layout tokens. In particular, Homepage marketing CTAs are not governed by the Atlas/Square control height. The generic Homepage Card's radius/padding is a local exception, not the marketing page default. Keep natural English phrase wrapping at the target viewport.

## Semantic roles

Use intent-driven names even when the target product maps them to differently named CSS variables.

- `surface.canvas`: page background.
- `surface.shell`: navigation and app-shell background.
- `surface.base`: ordinary Card and Panel background.
- `surface.raised`: popover, dialog, drawer, and raised-control background.
- `surface.hover`: transient pointer or keyboard-highlight feedback.
- `surface.selected`: persistent selection treatment using the product’s existing tokens or variants; map this conceptual role to an existing token or variant when one fits.
- `text.primary`, `text.muted`, `text.faint`, `text.onAccent`.
- `border.subtle`, `border.default`.
- `control.primary`, `control.accent`, `control.height`, `control.heightCompact`.
- `focus.color`, `focus.ring`.
- `status.success`, `status.warning`, `status.info`, `status.danger`, `status.violet`.

Status colors carry status meaning. Product accents do not replace semantic success, warning, info, or danger colors.

## Components

### Button

- Keep primary, secondary, ghost, disabled, and compact states visually distinct.
- Use one primary action per immediate decision group.
- Use the product's height and emphasis tokens, including route-specific marketing exceptions.

### Input and Select

- Give every control a persistent accessible name. Forms use visible labels; established compact filters/search may use an accessible name without adding a redundant visible heading. A placeholder alone is not a label.
- Use a raised neutral surface, semantic border, placeholder contrast, focus ring, disabled state, and invalid state.
- Keep target-product keyboard behavior and accessibility semantics.

### Badge and Tag

- Use neutral pills for metadata and semantic colors for status.

### Avatar and icon control

- Keep a reliable fallback for remote images.
- Icon-only controls require an accessible name and visible focus state.

### Tooltip, Dialog, and Drawer

- Tooltips explain unfamiliar compact controls; they do not replace labels for primary tasks.
- Dialogs protect focused decisions. Drawers support secondary workflows or filters.
- Preserve focus management, escape/close behavior, overlay treatment, and mobile fit.

### Navigation

- Selected state remains recognizable while hovered or keyboard-highlighted. Hover is lighter and distinct; retain a persistent marker or equivalent non-color cue. Use product-local colors rather than one cross-product value.
- Keep information architecture and route destinations product-local.

### Loading, empty, and error states

- Loading preserves likely geometry without delaying the whole page unnecessarily.
- Empty states explain the absence and the next useful action.
- Error states name the failure and a recovery path while preserving current query or form context. Independently loaded regions own their result and failure; an operation failure updates its own feedback while preserving independent resource results.
- Preserve zero, unknown, unavailable and empty distinctions. For voting distributions, amounts and thresholds, verify units, precision and the actual child typography; zero totals use an explicit zero or empty visualization. Lists may shorten identities while details retain complete, copyable values.

## Card and Panel

- Use neutral surfaces, semantic borders, internal padding, and spacing to create hierarchy.
- A Card is for a standalone collection, detail, or actionable summary.
- A Panel groups controls and supporting context for one task.
- Prefer row separators and surface contrast for dense tables and lists.
- Use the product's panel/card padding tokens and documented exceptions.
- Nested lists and tables should scroll inside their own container on mobile; keep document width within the viewport.

## Adoption gate

For a new cross-product visual direction, review one real page in each affected product at the intended desktop/mobile viewports before broad adoption. For an existing shared-component fix, inspect its affected consumers and variants in the requested product; keep that review in the affected product. Keep an unaccepted direction reviewable until a design decision is made.

## What this contract cannot decide

This file does not select the concrete component, state machine, exact route layout, or copy for a feature. Those decisions come from the target product reference and current source. If the required product state is not documented, inspect an accepted adjacent implementation and record the new evidence rather than inventing a cross-product default.
