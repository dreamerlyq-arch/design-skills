# Square implementation reference

Source snapshot: repository `degov-square`, commit `f124b5390fcb0e93ade2d01a94dc8ca0f8820b5b`, observed 2026-08-27. Inspect current imports and diff before reuse; for suspected drift run `node scripts/check-drift.mjs --product square` from the skill directory.

This reference maps the Square directory/settings application under `web/`. For a DAO governance site or proposal/draft route, first verify its actual repository and route owner; the name “DeGov” or a link to Square does not establish that these primitives are imported there.

## Canonical source map

| Purpose | Source |
| --- | --- |
| Product tokens and theme aliases | `web/src/app/square-tokens.css` |
| Global application styles | `web/src/app/globals.css` |
| DAO directory route | `web/src/app/page.tsx`, `web/src/app/_components/home-client.tsx` |
| Shell | `web/src/components/layout/header.tsx`, `footer.tsx` |
| Core controls | `web/src/components/ui/button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `switch.tsx` |
| Menus and overlays | `web/src/components/ui/dropdown-menu.tsx`, `dialog.tsx`, `tooltip.tsx`, `confirm-dialog.tsx` |
| Data display | `web/src/components/ui/table.tsx`, `empty.tsx`, `skeleton.tsx`, `tag-group.tsx`, `active-tag.tsx` |
| Forms | `web/src/components/ui/form.tsx`, `label.tsx`, `input-addon.tsx`, `input-select.tsx` |
| Async actions | `web/src/components/ui/loaded-button.tsx` |
| Images and icons | `web/src/components/ui/image-with-fallback.tsx`, `square-icon.tsx` |
| Product actions | `web/src/components/connect-button.tsx`, `notification-button.tsx`, `like-button.tsx`, `theme-button.tsx` |

## Exact token snapshot

- Dark: canvas `#080809`, shell `#101011`, surface `#141415`, raised `#1c1c1e`, hover `#252527`, strong hover `#303033`.
- Dark text: primary `#f5f3f0`, muted `#a29fa1`, faint `#777478`; lines are white at `0.08` and `0.14`.
- Dark accent `#e5b47a`; muted at `0.72`, wash at `0.16`, glow at `0.42`, focus at `0.46`.
- Light: canvas `#f7f6f3`, shell `#f1eee9`, surface white, raised `#ece9e3`, hover `#e8e3da`, accent `#9b6730`.
- Control heights are 40px default and 34px compact. Panel padding is 24px desktop and 16px compact/mobile.
- Content maximum is 1400px; mobile gutter is 12px; radius is 8, 12, 18, and pill 999px.
- Focus is a 3px ring using the product focus color. Panel/popover shadow is `0 16px 48px rgba(0,0,0,0.22)`.
- Status aliases remain semantic: success, warning/pending, active/info, executed/violet, defeated/danger, canceled/neutral.

## Component contracts

### Button and async Button

- Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
- Sizes: 40px default/lg, 34px small, 40px square icon. Text buttons are pill-shaped; icon buttons use the 8px radius.
- Disabled state blocks events and uses 50% opacity. Invalid and destructive states retain semantic danger focus.
- `LoadedButton` is the canonical loading action; it disables while loading and adds the shared spinner without changing the action label.

### Input, Textarea, Select, Form

- Inputs use a raised neutral surface, 8px radius, semantic line, 3px gold focus ring, disabled state, and `aria-invalid` danger treatment.
- Select is the Radix implementation in `select.tsx`; preserve keyboard navigation, trigger size, portal placement, selected indicator, disabled items, and scroll buttons.
- Form primitives wire labels, descriptions, messages, `aria-describedby`, and `aria-invalid`. Do not hand-build error markup that breaks this linkage.
- Reuse the existing input group/addon/select variant and inspect its caller. `InputAddon` and `InputSelect` contain spaced subcontrols; do not merge them into one outline by default. Use a shared outline only for a caller that already establishes a fused input group, and preserve its responsive split/focus treatment.

### Dialog, menu, tooltip

- Dialog uses a black `0.66` overlay, raised popover surface, 12px radius, 24px padding, panel shadow, focus management, Escape/close behavior, and responsive max width.
- Tooltip has zero delay, 8px radius, raised surface, panel shadow, portal placement, and an arrow.
- Dropdown menu and ConfirmDialog are the first sources for menu and confirmation behavior; preserve Radix state selectors and keyboard interaction.

### Table, empty, loading, images

- `Table` owns local horizontal overflow. Rows use neutral separators, lightweight hover, and a neutral selected surface.
- On mobile, the DAO Directory transforms rows into neutral stacked cards; this is a route pattern, not permission to make all desktop rows into cards.
- `Empty` uses the shared folder icon and short centered label. Add recovery actions at the caller when needed.
- `Skeleton` and `LoadedButton` are separate content/action loading patterns.
- `ImageWithFallback` prevents broken remote-image UI, keeps a semantic image label, and fades the real image in after load.

## Route baselines

- `/`: public DAO Directory; header, wallet/notification actions, search, self-host action, sortable rows, favorites, and mobile stacked cards.
- `/setting/[id]/*`: authenticated DAO settings and forms. Preserve route guards, wallet/auth state, validation, and save behavior.
- `/notification/*`: notification subscription flows. Preserve permission and subscription semantics.
- `/add/existing` and `/oauth/authorize`: onboarding/authorization surfaces. Do not infer permission changes from visual work.

Use `assets/baselines/square-desktop-1440x1000.png` and `square-mobile-390x844.png` for the local `/` composition at this observed commit.

## Do not drift

- Do not use gold as a structural Card, Panel, table, or row border.
- Do not replace semantic success/warning/info/danger colors with gold.
- Do not import Atlas React components; map shared semantics through Square's local primitives.
- Do not replace wallet, notification, favorite, settings, or authorization behavior while restyling.
- Do not omit light-theme token behavior when changing a shared Square primitive.
