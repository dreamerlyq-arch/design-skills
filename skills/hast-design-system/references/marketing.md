# Hast marketing contract

## Intent

Unify equivalent marketing roles, adapt Hero spacing to page structure, and keep light/dark behavior consistent. Preserve page content and distinctive product demonstrations.

Use this contract and accepted shared tokens as the design baseline. The homepage can serve as a comparison within a task at the same viewport and theme; changing the homepage does not automatically change the design system.

Use the shared source owners below instead of duplicating values in individual pages. Inspect their effective values and scoped overrides in the target checkout.

## Theme and semantic roles

- `tailwind.css` supplies the base brand and semantic variables; `globals.css` binds Tailwind `dark:` to HTML `data-theme="dark"`. Site theme selection uses stored light/dark preference, otherwise system preference, via `lib/theme.ts`.
- `theme/marketing-colors.css`, imported by the shared marketing layout, owns marketing text, page/card/inset surfaces, borders and inverse color pairs. It bridges these roles to existing utilities inside landing pages and customer stories; docs and legal retain their own roles.
- `marketing.css` owns shell-level theme overrides, gutters and Hero spacing. `home.css` and family styles consume semantic colors through aliases. Marketing dark surfaces use neutral black/gray and light foregrounds; resolve public-site colors through their marketing aliases.
- Prefer existing text, surface, border, action and status roles. Keep inverse sections explicit: a deliberate dark CTA block can remain dark in light mode with matching inverse controls and readable text. A whole customer-story page ignoring the theme is a different defect.
- Hardcoded colors in illustrations, brand artwork, charts and product demos require contextual review, not automatic replacement. Inspect nested surfaces, translucent fills and border contrast together.
- Verify theme switching and direct route loading. A CSS variable declaration alone does not prove that the consuming route imports it or that a later rule does not override it.

## Buttons and links

Use `ds.component.button` with `theme/buttons.css` for Site actions. Preserve native link versus button semantics, destinations, booking dialog triggers and submission behavior.

Shared variants: primary, secondary, inverse, inverse-secondary, text, compact. Main CTA minimum height is 56px; compact is 44px. Both use the shared pill geometry. Defaults include 8px icon gap, 20px CTA icons and 16px compact icons. Let localized labels wrap without clipping rather than forcing a fixed height.

Select emphasis by role and surrounding surface: ordinary primary/secondary variants follow the theme; inverse variants belong to intentionally dark sections. Two comparable secondary actions should not diverge into unrelated solid and outline treatments just because they live on different pages. Assign primary emphasis to the main decision and retain text-link treatment for inline navigation.

Focus cannot rely solely on button `currentColor`: light text on a filled dark button can yield an invisible white ring on a light page. The current shared owner uses a two-tone ring plus forced-colors fallback. Preserve keyboard visibility, disabled semantics and existing reduced-motion handling when extending variants.

## Hero, type and chapter spacing

- Marketing body font is DM Sans with locale-specific CJK fallbacks from the shared layout/CSS. Keep English phrases naturally wrapped; verify Chinese/Japanese line height and narrow layouts.
- `.marketing-hero-heading` explicitly consumes the H1 scale in `hero-typography.css`. It is not a global `h1` rule. Docs, legal, status, demo-window titles and editorial article headings retain their own roles.
- Use the shared Hero spacing variables in `marketing.css`, including `--marketing-hero-padding-top/bottom`, then inspect the consuming page's composition. Shared spacing does not require equal total height: product Heroes with a large demo below need tighter copy-to-demo spacing; text-only solution Heroes need their own spacing judgment. Let each Hero’s content and demo determine its total height.
- `theme/section-spacing.css` owns chapter spacing; `theme/feature-cards.css` owns shared feature-card radius, border and shadow roles. Hero spacing, spacing between full chapters, and spacing inside a card are separate roles. Fix their narrow owner. Preserve intentional adjoining zero edges and anchor offsets.

## Cards, FAQ and exceptions

- Compare like with like: benefit/workflow cards can share surface geometry; product windows, terminal frames, pricing comparisons, diagrams, editorial rows and image compositions can retain different shapes. Keep hover, focus and nested surfaces coherent with the selected role.
- Enterprise FAQ and industry FAQ have separate layout owners. Preserve their layouts, content, initial disclosure state, keyboard behavior and accessible names while sharing controls and visual states where available.
- Use the shared `FaqToggle` plus/minus control for marketing FAQ disclosure. Native details/summary does not need client state merely to draw the icon. Decorative controls should not be announced as part of the question.
- Motion changes are a separate scope. Preserve existing reduced-motion rules for unrelated controls when removing obsolete selectors from grouped CSS.

## Refinement rules

These rules govern comparable marketing elements, not authenticated product UI. Preserve the intentional exceptions described above.

- Remove trailing periods from marketing headings and supporting introductions in en/zh-CN/ja; retain sentence separators within multi-sentence copy, question marks, and ordinary body/FAQ text.
- Keep Chinese, English and Japanese copy naturally wrapped at phrase boundaries. When an orphaned character or very short final line harms readability, check the text measure and layout first; use a concise, meaning-preserving rewrite where appropriate. Preserve meaning and type hierarchy; let the revised copy fit naturally across affected widths. Verify affected viewports.
- Equivalent illustrated cards and inset closing CTA panels consume the shared card-radius token. Check clipping on the actual colored/image surface, not only its parent. Keep text cards content-driven rather than using a large minimum height that leaves unused space.
- Where card fill already contrasts with its immediate surrounding surface, remove the redundant exterior outline. Keep a boundary when the surfaces match. Evaluate light and dark separately; preserve internal comparison dividers, product-demo controls, and functional focus/error borders.
- Remove purely decorative lines between marketing sections. Blend Hero color washes back into the page surface and localize contrast in cards/panels when suitable. Preserve space below decorative artwork so it does not touch the section edge.
- Remove decorative 01/02/03 labels from parallel benefits and navigation tabs. Retain genuine process order, hierarchy, data, or reference numbering.
- An expanded FAQ question and answer should read as one continuous surface with consistent horizontal alignment and deliberate vertical spacing.

## Existing artwork families

These are retained family-specific directions, scope clarified 2026-09-22. They do not prohibit outlined circles, tilted windows or dark artwork in a separately chosen composition. Compare against accepted artwork within the family before extending it; record approval separately for a newly chosen illustration.

- In the existing layered-circle artwork family, decorative concentric circles use subtle filled layers fading outward rather than stroked rings. Parallel workflow cards may use distinct muted colors tied to their meaning; pair purposeful color choices with non-color meaning cues.
- Product-window illustrations should be upright with consistent insets across a card family. Use light surfaces, dark typography and restrained accents for the product-window artwork family, while checking legibility in its surrounding theme. Preserve the feature's meaning and compare replacements with the accepted artwork in that family.
