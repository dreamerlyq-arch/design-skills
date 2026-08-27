# Homepage implementation reference

Observed from repository `Degov` at commit `146f940cccd59de5ebf6c5bd80bfbc190bc1687c` on 2026-08-27. Re-run the drift check and inspect current source before applying this snapshot to a later commit.

## Canonical source map

| Purpose | Source |
| --- | --- |
| Active marketing tokens and primitives | `src/app/site.css` |
| Global Tailwind/application styles | `src/app/globals.css` |
| Current homepage composition and state | `src/app/home-client.tsx` |
| Homepage and pricing shell | `src/components/layout/site-header.tsx`, `src/components/layout/site-footer.tsx` |
| Active marketing CTA content | `src/components/layout/motion-button-content.tsx` plus `.btn` and `.motion-btn` in `site.css` |
| Generic UI exports | `src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `accordion.tsx`, `Empty.tsx`, `LazyImage.tsx` |
| Section helpers | `src/components/ui/section-wrapper.tsx`, `section-label.tsx` |

Do not assume `src/components/ui/button.tsx` is the homepage hero button. The current homepage and pricing routes primarily use the CSS `.btn`, `.btn-primary`, `.btn-ghost`, and `.motion-btn` contract through the layout and page clients. Inspect the caller before choosing either implementation.

## Exact token snapshot

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

### Marketing button

- `.btn` is 52px high, uppercase, letter-spaced, square-cornered, and horizontally padded by 24px.
- Primary is a white fill with dark text. Ghost uses a neutral border. External links add `↗`.
- `.motion-btn` adds the sliding fill and icon treatment. Preserve reduced-motion behavior from the page's GSAP/media-query logic.
- Header navigation and mobile menu behavior belong to `SiteHeader`; preserve `aria-expanded`, `aria-controls`, accessible labels, and body scroll locking.

### Generic Button export

- Variants: `primary`, `secondary`, `ghost`; sizes: `lg`, `default`, `sm`.
- It is pill-shaped and uses hover scale `1.04` and active scale `0.97`.
- It currently uses the Tailwind brand-blue focus/emphasis path. Use only where the existing caller already establishes that visual language.

### Card

- The current generic Card is a deliberate exception: 20px radius, white border at `0.06`, mobile padding 20px and desktop padding 30px.
- Hover raises by 4px and strengthens the border to `0.12`.
- Do not replace this with the 0/4px token radius without a route-specific design decision.

### Badge, accordion, images, empty state

- Badge variants are `default`, `highlight`, and `network`; network colors are Ethereum, Arbitrum, Optimism, Polygon, and Base.
- Accordion must keep button semantics, `aria-expanded`, `aria-controls`, labelled regions, and its current multi-open option.
- `LazyImage` owns loading/placeholder behavior and requires an `alt` value.
- `Empty` is a small illustration-plus-label primitive. It is not a full error or recovery pattern.

## Route baselines

- `/`: editorial homepage; large natural-language hero, media field, Square/Atlas pathway actions, narrative spacing, and sticky navigation.
- `/pricing`: same shell and CTA language with pricing-specific content.
- `/deck`: independent fixed-canvas presentation surface; do not apply homepage responsive layout rules to it.

Use `assets/baselines/homepage-desktop-1440x1000.png` and `homepage-mobile-390x844.png` for composition comparison. Copy and media can evolve; the current source remains authoritative.

## Do not drift

- Do not turn the homepage into an Atlas/Square app shell or dense card dashboard.
- Do not substitute gold as a homepage-wide product accent.
- Do not create one-word-per-line English headings through excessive font size or narrow width.
- Do not copy the generic pill Button into an established square-cornered marketing CTA group without inspecting the caller.
- Do not remove hero motion without checking the reduced-motion and fallback path.
