# DeGov cross-product design contract

Use this reference for token mapping, component decisions, and product-theme exceptions. Current user instructions and closer project rules remain authoritative for business behavior and scope.

## Architecture

The system has three layers:

1. **Primitive:** stable color, type, spacing, radius, shadow, and motion values.
2. **Semantic:** UI roles such as surface, text, border, control, focus, and status.
3. **Theme:** Homepage, Atlas, and Square overrides of semantic roles.

Products consume the contract through their existing local CSS and components. The first release does not extract a cross-repository React package.

## Shared scales

| Area | Contract |
| --- | --- |
| Font | `Instrument Sans` for interface and display; monospace only for code, keys, data, or compact metadata |
| Type sizes | 12, 14, 16, 20, 24, 30, 40, 64px as the common reference scale |
| Spacing | 4, 8, 12, 16, 20, 24, 32, 40, 48px |
| Control height | 40px default, 34px compact |
| Panel padding | 24px desktop, 16px compact/mobile |
| Layout | 1400px content maximum, 12px mobile gutter |
| Motion | 100–280ms for normal UI feedback; prefer opacity and transform; provide reduced-motion behavior |

Do not narrow text columns or enlarge type until normal English headings form a one-word-per-line waterfall.

## Semantic roles

Use intent-driven names even when the target product maps them to differently named CSS variables.

- `surface.canvas`: page background.
- `surface.shell`: navigation and app-shell background.
- `surface.base`: ordinary Card and Panel background.
- `surface.raised`: popover, dialog, drawer, and raised-control background.
- `surface.hover`: hover and lightweight selected feedback.
- `text.primary`, `text.muted`, `text.faint`, `text.onAccent`.
- `border.subtle`, `border.default`.
- `control.primary`, `control.accent`, `control.height`, `control.heightCompact`.
- `focus.color`, `focus.ring`.
- `status.success`, `status.warning`, `status.info`, `status.danger`, `status.violet`.

Status colors carry status meaning. Product accents do not replace semantic success, warning, info, or danger colors.

## Product themes

### Homepage

- Canvas and shell: `#1f2228`.
- Surface: low-opacity neutral white layers.
- Text and primary emphasis: white.
- Radius: sharp by default; 0px small/medium and 4px large are the current reference.
- May use editorial spacing, campaign-scale type, and marketing expression.
- Does not set Atlas or Square application density.

### Atlas

- Canvas `#080809`, shell `#101011`, base surface `#141415`, raised surface `#1c1c1e`, hover surface `#252527`.
- Primary text `#f5f3f0`, muted text `#a29fa1`, faint text `#777478`.
- Accent and primary control emphasis: white.
- Radius: 8px small, 12px medium, 18px large.
- Use neutral product surfaces, quiet lines, compact controls, and data-oriented hierarchy.

### Square

- Uses the same neutral surface family and product radius scale as Atlas.
- Warm-gold accent: `#e5b47a` in dark mode; current light-mode reference is `#9b6730`.
- Gold is for action, focus, selected state, and product emphasis.
- Gold is not a Card, Panel, table, or list-row border color.
- Preserve Square's navigation, wallet, notification, settings, and governance flows.

## Components

### Button

- Keep primary, secondary, ghost, disabled, and compact states visually distinct.
- Use one primary action per immediate decision group.
- Primary controls are 40px high; compact controls are 34px.
- Homepage and Atlas use neutral-white emphasis. Square uses warm gold.

### Input and Select

- Pair controls with a persistent label.
- Use a raised neutral surface, semantic border, placeholder contrast, focus ring, disabled state, and invalid state.
- Keep target-product keyboard behavior and accessibility semantics.

### Badge and Tag

- Use neutral pills for metadata and semantic colors for status.
- Do not use the product accent for every state.

### Avatar and icon control

- Keep a reliable fallback for remote images.
- Icon-only controls require an accessible name and visible focus state.

### Tooltip, Dialog, and Drawer

- Tooltips explain unfamiliar compact controls; they do not replace labels for primary tasks.
- Dialogs protect focused decisions. Drawers support secondary workflows or filters.
- Preserve focus management, escape/close behavior, overlay treatment, and mobile fit.

### Navigation

- Selected state is stable; hover is lighter and distinct from selected.
- Keep information architecture and route destinations product-local.

### Loading, empty, and error states

- Loading preserves likely geometry without delaying the whole page unnecessarily.
- Empty states explain the absence and the next useful action.
- Error states name the failure and a recovery path while preserving current query or form context.

## Card and Panel

- Use neutral surfaces, semantic borders, internal padding, and spacing to create hierarchy.
- A Card is for a standalone collection, detail, or actionable summary.
- A Panel groups controls and supporting context for one task.
- Do not wrap every row or content fragment in a Card.
- Prefer row separators and surface contrast for dense tables and lists.
- Use 24px desktop padding and 16px compact/mobile padding unless the product already documents a tighter pattern.
- Nested lists and tables should scroll inside their own container on mobile; the document itself must not overflow horizontally.

## Adoption gate

Before broad token adoption, map one existing real page in each product. Verify visual consistency at desktop and 390px and confirm that route, data, API, authentication, analytics, and interaction behavior remains unchanged. Expand only after that pilot is accepted.
