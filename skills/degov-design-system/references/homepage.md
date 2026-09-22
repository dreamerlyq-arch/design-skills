# Homepage implementation reference

Source snapshot: repository `Degov`, commit `146f940cccd59de5ebf6c5bd80bfbc190bc1687c`, observed 2026-08-27. Inspect the target caller and working-tree diff before reuse; matching HEAD does not establish that the current route matches this snapshot. For suspected drift use `node scripts/check-drift.mjs --product homepage --repo-root /absolute/path/to/checkout` from the skill directory.

## Canonical source map

| Purpose | Source |
| --- | --- |
| Shared marketing tokens and primitives | `src/app/site.css` |
| Global CSS imports and cascade order | `src/app/globals.css` |
| Homepage route styling and overrides | `src/app/home.css` |
| Current homepage composition and state | `src/app/home-client.tsx` |
| Pricing composition, local tokens, and CTA overrides | `src/app/pricing/pricing-client.tsx`, `src/app/pricing.css` |
| Homepage and pricing shell | `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx` |
| Active marketing CTA content | `src/components/layout/motion-button-content.tsx` plus `.btn` and `.motion-btn` in `site.css` |
| Generic UI exports | `src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `accordion.tsx`, `Empty.tsx`, `LazyImage.tsx` |
| Section helpers | `src/components/ui/section-wrapper.tsx`, `section-label.tsx` |

Resolve the actual CTA owner before editing. The homepage and pricing routes use CSS `.btn`, `.btn-primary`, `.btn-ghost`, and `.motion-btn` through the layout and page clients. Inspect the caller and later route CSS before choosing an owner: `globals.css` imports `site.css`, then `home.css`, then `pricing.css`; `.pricing-site .btn` overrides the shared button. A pricing-only adjustment belongs to that route's applicable selector, not the shared base by default.

## Shared token snapshot

These are `site.css` defaults. Route-level tokens and selectors in `home.css` or `pricing.css` may override them; this list is not the computed style of every marketing page.

- Canvas `#1f2228`; surface layers `rgba(255,255,255,0.03)` and `0.05`.
- Primary text and accent are white; secondary text is white at `0.7`; muted/meta text is white at `0.5`.
- Borders are white at `0.1` and `0.05`.
- Type is Instrument Sans. Shared source sizes are 12, 14, 16, 20, 24, 30, 40, and 64px.
- Space is 4, 8, 12, 16, 20, 24, 32, and 48px.
- Section vertical spacing is 96px desktop, 64px tablet, 48px phone.
- Radius tokens are 0px small/medium, 4px large, and pill `9999px`.
- Focus is a 3px blue ring: `rgba(59,130,246,0.5)`.
- Normal motion is 150–200ms with `cubic-bezier(0.2,0,0,1)`.
- Content maximum is 1200px; gutters are 24px desktop, 16px tablet, and 12px phone.

## Component contracts

### Base marketing button

- `.btn` is 52px high, uppercase, letter-spaced, square-cornered, and horizontally padded by 24px.
- Primary is a white fill with dark text. Ghost uses a neutral border. External links add `↗`.
- `.motion-btn` adds the sliding fill and icon treatment. Preserve reduced-motion behavior from the page's GSAP/media-query logic.
- Pricing overrides include non-uppercase labels, 24px horizontal padding, and Square-emphasis outline CTAs using `--pricing-square`. Preserve those route-local choices when changing pricing; they do not set a homepage-wide gold accent.
- Header navigation and mobile menu behavior belong to `SiteHeader`; preserve `aria-expanded`, `aria-controls`, accessible labels, and body scroll locking.

### Legacy generic exports

The generic Button/Card exports are legacy implementation observations, not templates for current HomeClient or pricing routes. Confirm an active consumer before using them; see [legacy exports](legacy-homepage-exports.md) only when maintaining those consumers.

### Badge, accordion, images, empty state

- Badge variants are `default`, `highlight`, and `network`; network colors are Ethereum, Arbitrum, Optimism, Polygon, and Base.
- Accordion must keep button semantics, `aria-expanded`, `aria-controls`, labelled regions, and its current multi-open option.
- `LazyImage` owns loading/placeholder behavior and requires an `alt` value.
- `Empty` is a small illustration-plus-label primitive. It is not a full error or recovery pattern.

## Route baselines

- `/`: editorial homepage; large natural-language hero, media field, Square/Atlas pathway actions, narrative spacing, and sticky navigation.
- `/pricing`: shared shell with pricing-specific tokens, layout, content, and CTA overrides.
- `/deck`: independent fixed-canvas presentation surface; inspect its own route files and source deck when present. Use the presentation's specified canvas (the existing deck review used 1920×1080), not homepage mobile acceptance rules. If the user requires source-faithful text, preserve the supplied deck copy and links.

Use `assets/baselines/homepage-desktop-1440x1000.png` and `homepage-mobile-390x844.png` only for the recorded `/` composition. These images do not cover `/pricing`, `/deck`, or later local edits; see [baselines.md](baselines.md) for provenance and capture scope.

## Composition checks

- Preserve the editorial marketing composition, white emphasis and route-specific square CTA treatment through their actual owners.
- Fit English headings at natural phrase boundaries by adjusting text measure and layout at the target viewport.
- Check normal Hero motion, reduced motion and the fallback path together when changing that owner.
