# PubFi design and authority contract

Use this reference for system-wide semantic intent. Current user instructions, current source and tests, closer repository rules, and the target route or service remain authoritative.

## Contract layers

PubFi has four implementation layers:

1. **Primitive:** stable type, color, spacing, radius, control, and motion values in `apps/web/src/styles/tokens.css`.
2. **Semantic:** roles such as canvas, surface, text, border, action, focus, danger, attention, ready, and disabled.
3. **Surface:** marketing, Discovery/Status, account, and Dashboard mappings of semantic roles.
4. **Component:** explicit React primitives and route-local compositions that own markup, accessibility, state, and behavior.

Prefer dependency direction from primitive to semantic to surface to component. The shared component owns its state model; page selectors own local composition.

## Source and CSS ownership

- `apps/web/app/globals.css` defines the stylesheet import order.
- `apps/web/src/styles/tokens.css` owns shared and surface token declarations.
- `apps/web/src/components/ui/` owns reusable interactive primitives such as `Button`, `TokenSelect`, and status helpers.
- `apps/web/src/styles/components/` owns shared component presentation. `marketing-system.css` is the marketing appearance contract; `product-utility.css` is the product/account utility contract.
- `apps/web/src/styles/discovery/` owns Discovery composition and responsive behavior.
- `apps/web/src/styles/pages/dashboard-*.css`, `auth.css`, and `settings.css` own route-family composition, not alternative base systems.

Resolve cascade conflicts in the owning token, primitive variant, appearance prop or stylesheet. Keep route-specific geometry local.

When one route exposes a visual inconsistency, audit the sibling variants that share its component or semantic family before closing the change. Check default, hover, focus, open, disabled, desktop, and mobile states that actually render, then fix the narrowest shared owner instead of accumulating page patches.

### Repository-wide coverage

When the user requests a global or entire-repository UI check, inventory the current repository and reconcile every UI style owner before claiming completion. Include global and page CSS, CSS Modules, inline/component styles, standalone HTML/style templates, loading and error states, and responsive overrides. Discover owners through actual route composition as well as source searches, including surfaces with implicit inherited styling.

For radius changes, identify every independent filled or outlined surface and control, resolve its final token and cascade (including calculated values, later rules, hover/open states, and breakpoints), and record each item as changed, already compliant, or intentionally excluded with a reason. Preserve internal dividers, chart/brand shapes, circles, pills, and explicitly larger radii. Joined surfaces round only the outer perimeter in each layout.

Keep a per-file coverage record in the task's evidence location under the current environment rules, obtain independent QA for repository-wide completion, and verify reported examples plus representative desktop/mobile states in the browser. Report source coverage separately from rendered coverage; parser success, HTTP 200, a search result, or a sample screenshot does not prove all routes and states. Derive file counts from the current checkout rather than storing a fixed count as the scope. This full inventory requirement applies to explicitly global tasks, not ordinary local edits.

## Core roles

Use the names already present in source. These mappings describe intent, not a demand to rename every variable.

| Role | Current source intent |
| --- | --- |
| Global canvas | `--bg`, `--surface`, `--surface-elevated` |
| Product text | `--product-text`, `--product-copy`, `--product-muted` |
| Product structure | `--product-line`, `--product-line-strong`, `--product-row-line` |
| Product interaction | `--product-signal`, `--product-focus`, `--product-action-*` |
| Product status | `--product-danger`, `--product-attention`, `--product-ready`, `--product-success` |
| Marketing canvas/text | `--marketing-canvas`, `--marketing-heading`, `--marketing-copy`, `--marketing-muted` |
| Marketing signal | `--marketing-signal` (`#05d6c7`) for brand actions and interaction accents; decorative translucent fills use neutral surface roles |
| Marketing geometry | shell, gutter, type, button, radius, space, and motion tokens prefixed `--marketing-*` |

Status colors carry status meaning. Cyan is the PubFi signal and interaction accent; it is not a substitute for danger, attention, success, readiness, or unknown states.

## Typography and layout

- Public heading roles use the white marketing heading token. Omit decorative eyebrow labels above page, section, and card titles; retain meaningful status, field labels, and breadcrumbs.

- Marketing display uses Instrument Sans; marketing body uses IBM Plex Sans; code, keys, operational metadata, and compact evidence can use IBM Plex Mono or the product mono token.
- Product/application surfaces use the shared sans and mono roles already mapped by their theme.
- Visible interface phrases use natural sentence or title case. Preserve conventional acronyms, HTTP methods, chain symbols and machine identifiers as authored.
- Marketing shell maximum is 1400px with 64px desktop, 32px tablet, and 16px mobile gutters.
- The Discovery overview shares the 1400px public shell; dense Discovery subroutes and Dashboard may keep narrower working axes when that improves evidence scanning.
- Preserve natural phrase wrapping. At intermediate widths, change grid tracks, max-width, or stacking before text and artwork overlap.
- In side-by-side text sections, keep each content grid aligned to the start so unequal column lengths do not stretch short headings or add blank space above lists.
- Separate Hero and content through spacing and composition; use dividers where tables, rows or content groups need a boundary.
- Fixed heights are reserved for true controls or intentional frames. Content cards use `min-height` when responsive copy may grow.

## Component contracts

### Button and action groups

- Inline copy controls use `CopyIconButton`: a 16px icon, transparent background, no border, and no pointer hover fill or motion. Keep a 32px desktop hit area and 44px coarse-pointer hit area, keyboard-only focus indication, accessible labels, and copied/failed feedback. Preserve full menu actions and secret-copy confirmation behavior.
- Use `apps/web/src/components/ui/Button.tsx`; variants are `primary`, `secondary`, and `ghost`, sizes are `sm` and `md`, and appearances are `default`, `marketing`, and `marketing-inverse`.
- Keep one primary action per immediate decision group. Secondary actions may size to content while the primary action can take remaining width when the layout calls for unequal emphasis.
- Explicit back links and back buttons place a left arrow before the label; verify rendered flex order because shared trailing-icon CSS can override DOM order. Other button icons follow the label. Marketing button label-to-icon spacing is `--marketing-button-icon-gap` (10px).
- Marketing hover/focus fill is `--marketing-signal`; entry and exit animation must use the same cyan value. Reduced motion keeps a direct, stable state change.
- Paired actions in the same surface family share their gap, vertical offset, height, padding, icon order, and responsive stacking through owner tokens or primitives rather than route-local copies.
- Disabled controls cannot fire. Loading controls prevent duplicate submission without changing their accessible name unexpectedly.
- Disabled is not loading: use `not-allowed` for unavailable controls and `wait` only for an actual pending action. Wire `aria-busy` to that pending state; a CSS selector alone cannot supply it. Check computed styles through the final responsive cascade, including controls disabled by a parent fieldset.

### Input, search, and select

- Text, search, password, numeric, and multiline fields share one reusable input component family and visual contract. Their resting, hover, focused, and disabled backgrounds remain opaque black; use the single border treatment below for focus. Active fields use one 1px border at 85% neutral light opacity. Preserve native field semantics, validation, refs, and specialized OTP or code-editor behavior.
- Use `TextInput` and `TextArea` from `apps/web/src/components/ui/TextInput.tsx`, with shared presentation in `apps/web/src/styles/components/text-input.css`, when present in the target revision. Route owners retain sizing and layout, not competing background or focus rules. Resting and hover borders use 18% and 30% neutral light opacity; semantic invalid states retain their error color.
- A picker search field has one owned border treatment. Place wrapper separators between result groups where they convey a distinct boundary.
- Expand/collapse and dropdown indicators use line chevrons consistently, including native details markers.
- Standard selects and searchable pickers share `apps/web/src/components/ui/SelectTrigger.tsx` as their trigger primitive for chevron geometry, right inset, disabled treatment, and expanded state. Share presentation without conflating listbox and dialog semantics; preserve each owner's keyboard, dismissal, and filtering behavior. Reusing a CSS class alone does not establish component reuse.
- Verify focus thickness in the rendered cascade: border, outline, and box-shadow can add up. A one-pixel field focus treatment must remain one pixel in total, including search inputs, code editors, inline edits, and grouped controls; retain visible keyboard focus for buttons and links.

- Use the existing product control, `DiscoveryTopbarSearch`, or `TokenSelect` owner instead of drawing a lookalike field.
- Labels, descriptions, errors, and `aria-*` relationships persist through validation. Search keeps the typed query visible and distinguishes no results from request failure.
- Focus uses the surface focus token and must remain visible on dark, translucent, and cyan backgrounds.
- A field-style select's open panel matches its trigger width unless an explicit content-driven variant requires otherwise. Measure both at desktop and mobile widths; long options must wrap without enlarging the document. Audit page overrides even when all call sites already use `TokenSelect`.

### Form validation

- Show English inline errors using product error tokens. Browser-native validation bubbles follow the browser locale and cannot be made consistent through input CSS or page language alone. Preserve required/format constraints, invalid-submission blocking, server errors, pending states, and existing eligibility gates.
- Prefer the existing shared validation owner. When present in the target revision, `apps/web/src/components/ui/InlineValidationForm.tsx` coordinates errors and submit-time focus; `TextInput`, `TextArea`, and specialized fields retain native semantics and refs. Verify the owner in the checked-out revision before assuming it is available.
- Native `invalid` events can suppress the popup with `preventDefault()` while preserving constraint validation. Using `noValidate` requires an equivalent validation owner that preserves submission blocking. Keep field-specific wording with the field owner instead of inferring product meaning from a generic field name.
- Link each error to its field without discarding existing help or server-error associations. Render messages outside numeric prefix/suffix groups and JSON editor overlays so error text does not alter control geometry. Include required agreement checkboxes and specialized OTP fields in the affected-form inventory.
- Focus the first invalid field after error rendering only for a validation attempt. Editing another invalid field clears its client error without stealing focus; an effect reacting to every error-state update can cause focus jumps. Clear obsolete client errors when switching form methods or request operations. Preserve form refs, external submit-button associations, and OTP auto-submission.
- Verify click and Enter submission, repeated invalid attempts, multiple invalid fields, editing a later field while an earlier error remains, and existing server-error presentation. Confirm the relevant constraint still blocks submission and no native bubble appears. Report local/fixture results separately from real authentication, API execution or payment outcomes; apply the [consequential-action boundary](authority.md#sensitive-data-and-consequential-actions).

### Async and streamed regions

- When slow data can resolve independently, render the route shell and stable content first, then stream the user-visible live region through a bounded owner. Keep resolved content usable while each independent read completes.
- Stabilize the known shell, column structure and principal content placeholders at each breakpoint to stabilize the loading-to-content transition. Unknown result counts, long text and expanded details may grow naturally; let placeholders follow known structure and real content determine final height. Use content-shaped placeholders and restrained surface-token shimmer where that surface supports it.
- On surfaces that use entrance motion, mark the whole resolved streamed module for one entrance through the shared surface motion owner. Other surfaces, including standalone Status, may render it directly. Keep ordinary internal updates within the resolved module’s stable presentation.
- Loading regions expose `aria-busy` and one concise status message without announcing decorative skeleton bars. For reduced-motion users, available resolved content appears without an entrance delay and shimmer is static; the preference does not bypass actual data loading.

### Card, panel, list, and table

- Decorative translucent blue/cyan/green backgrounds, borders, and hover/selected fills use neutral light tokens at the existing opacity. Keep semantic status colors, chart colors, brand actions/artwork, inverted ink, and functional dark scrims distinct from decorative fills. Input fields follow their opaque component contract instead.
- Neutral grayscale gradient cards and panels have no outer border; internal content separators and keyboard focus indicators remain. The shared marketing card gradient runs from `#0A0A0A` to `#171717` at 180 degrees, with no blue or green tint.
- Cards, panels, notices, menus, buttons, and comparable controls that previously used square or small-radius corners use `--radius-sm: 8px`; surface tokens alias this shared value. Standalone pages without the global stylesheet provide an equivalent local token or 8px fallback. Joined card groups round only their outer corners, following horizontal or vertical layout; internal separators remain straight. Preserve circular/pill elements and explicitly larger radii. Marketing cards may be large narrative frames; Discovery cards remain evidence-led and Dashboard panels compact.
- Public neutral cards and information panels use `--marketing-surface-subtle`: white at 8% opacity (about `#141414` on black). Map functional cards through their surface owner to preserve the same quiet contrast with solid parent/nested levels; select the surface’s own token for standalone and operational panels. Keep marketing card gradients neutral grayscale; express status meaning through the content and semantic foreground colors.
- Group dense operational lists with surface contrast and row separators; use cards for distinct modules.
- After changing a surface token, inspect nested panels together. An opaque parent and its child using the same fill can erase the child boundary; preserve distinct surface levels. Use padding by role (primary panel, nested card, dense row), with aligned outer content edges rather than one universal padding value.
- Text-only links respond to pointer hover with a restrained text-color change only; retain their text-only geometry on pointer hover. Keep a separate visible `:focus-visible` indicator for keyboard navigation.
- Content must grow vertically. Use local horizontal overflow for tables or structured data; keep document width within the viewport.

### Navigation, menu, dialog, and drawer

- Current-route state is stable and distinct from hover. Preserve destinations and information architecture.
- Shared dropdown appearance does not require identical interaction primitives: option selection, account actions, navigation, and search suggestions retain their own keyboard and accessibility semantics. Reuse surface, border, radius, typography, and state roles before considering a behavioral migration.
- Keep sticky headers keyboard reachable and offset anchored/focused content into the visible area.
- Mobile menus preserve `aria-expanded`, `aria-controls`, close/escape behavior, focus return, and body-scroll policy.
- Dialogs and drawers preserve focus entry/return, background blocking, named close controls, validation, submission, and reachable mobile content.
- Disclosure and accordion indicators use one symmetric line chevron in a stable hit area and rotate the same shape between collapsed and expanded states. Use SVG strokes or an equivalent unfilled two-line CSS chevron and rotate that same geometry between directions.

## Product authority

See [Product authority](authority.md) for data claims and behavior boundaries shared with backend tasks.

## Non-marketing interfaces

Apply the [non-marketing UI contract](non-marketing.md) across functional public pages, account, Dashboard, and error/recovery screens. It owns their reusable layout, hierarchy, surface, density, loading, and detail-interaction rules; surface references retain page-specific behavior and source maps.

## Adoption gate

Before broadening a new token or component rule, apply it to one real owner route, validate the applicable states and desktop/mobile behavior, and obtain acceptance. Only then update this contract or the appropriate surface reference. A prototype comparison is evidence for a decision, not the decision itself.

## Approved semantic status palette

- The accepted shared status colors are ready `#40D475`, danger `#E5484D`, attention `#F4C542`. Keep these in `tokens.css`; route-level status indicators inherit them.
- Derived hover and soft-surface mixtures belong to the current semantic token owner. Acceptance of the three base colors does not independently approve every derived mixture; verify contrast and state distinction where changed.
