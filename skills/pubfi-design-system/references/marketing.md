# Marketing surface reference

## Canonical source map

| Purpose | Source |
| --- | --- |
| Shared and marketing tokens | `apps/web/src/styles/tokens.css` |
| Marketing theme, header, button, search, footer | `apps/web/src/styles/components/marketing-system.css` |
| Marketing page composition | `apps/web/src/components/site/SiteFrame.tsx` |
| Section shell and heading primitives | `apps/web/src/components/site/MarketingSection.tsx` |
| Reusable actions | `apps/web/src/components/ui/Button.tsx` |
| Header and mobile navigation | `apps/web/src/components/site/Header.tsx`, `apps/web/src/components/site/MobileNav.tsx`, `apps/web/src/components/site/PublicCompanyMenu.tsx` |
| Homepage composition | `apps/web/src/components/site/pages/LandingPage.tsx` and `apps/web/src/components/site/sections/` |
| Products composition | `apps/web/src/components/site/pages/ProductsOverviewPage.tsx` |
| Shared narrative-route geometry | `apps/web/src/styles/pages/public-marketing.css` |
| Homepage and Products geometry | `apps/web/src/styles/pages/home-figma.css`, `apps/web/src/styles/pages/products-marketing.css` |
| Navigation, CTA, and editorial content | `apps/web/src/data/public-site-content.ts` |
| Motion ownership | `apps/web/src/components/site/MarketingMotion.tsx` and focused visual components |

Use `SiteFrame appearance="marketing"`, `MarketingSection`, `MarketingSectionShell`, `MarketingSectionHeading`, and `Button appearance="marketing"` or `"marketing-inverse"` before creating page-local equivalents.

## Token roles

- Canvas `#000000`; heading `#fefefe`; text `#f5f5f5`; copy `#bcc6d0`; muted `#8a99ad`.
- Signal cyan `#05d6c7` is reserved for interaction and state feedback. Structural lines use equal-opacity white through the 8/16/24/32% marketing line tokens.
- Display font Instrument Sans; body IBM Plex Sans; mono IBM Plex Mono.
- Shell max 1400px; gutters 64px desktop, 32px tablet, 16px mobile.
- Read current topbar and section-title dimensions from their shared tokens and responsive owner; route styles consume those shared scales.
- Marketing hero titles use the shared `--marketing-hero-title-*` role; closing CTA titles use `--marketing-closing-title-*`. Responsive overrides belong to `marketing-system.css`, not route styles.
- Marketing action height 48px, horizontal padding 28px, label/icon gap 10px, shared small-radius token (8px).
- Shared marketing spacing is 4, 8, 12, 16, 20, 24, 32, 40, and 64px.

Normalize imported Figma values into these tokens when their difference is not visually meaningful. Keep reusable opacity, spacing and radius values in their token owners.

## Composition contracts

### Header and navigation

- The marketing topbar is sticky at the viewport top with a stable black canvas and appropriate stacking context.
- Desktop navigation, company menu, API-key action, mobile toggle, and mobile menu remain owned by `Header` and `MobileNav`.
- Mobile navigation should read as a lightweight full-width navigation layer, with a compact hierarchy and reachable primary action. Adapt its grouping and density to the mobile layer.

### Buttons

- Primary is light fill/dark ink; secondary is transparent with a quiet white line. Hover and focus transition to the signal cyan.
- Icons follow the label with the shared 10px gap, except explicit back actions, which place a left arrow before the label. Verify rendered order through shared CSS.
- In a paired row, give the primary action the stronger width/emphasis. Let the secondary action size to its label when equal widths falsely imply equal priority.
- Public hero action groups share the same action gap and copy-to-actions offset; at mobile widths they use the same stacked, full-width control composition unless a functional route requires a denser control bar.
- Keep labels specific to intent instead of forcing one site-wide synonym: the topbar acquisition action uses `Get API key`; homepage and developer onboarding use `Get API access`; `My APIs` denotes owned API inventory; `Ask for data` leads to Discovery. Preserve the content owner, destination, signed-in/out behavior, and demand-signal target; keep each action’s task-specific label.

### Search and entry fields

- Reuse `DiscoveryTopbarSearch` with its marketing placement/appearance when a marketing section needs provider search or prompt-like entry behavior.
- A decorative quote or prompt that is meant to behave like entry should inherit the real search field geometry rather than imitate it with plain text.
- When a prompt is guidance-only, render it with non-interactive semantics and remove search icons, focus borders, editable cursors, and other input affordances. Keep the real action as a separate CTA.
- On the homepage, the Discovery rail owns the single real WebMCP search form and its `search_pubfi_discovery` identity. Guidance-only prompts and entry-card examples remain quotes; register tool identities only on their actual executable forms.

### Section and card layout

- Marketing hero, section, intro/body, and closing CTA typography are shared roles. The same role across the homepage, Products, and narrative public routes must resolve to the same token and computed family, size, weight, line-height, and letter-spacing at a given viewport. Route styles may control measure and natural wrapping, not redefine the type role.
- Treat headings and compact supporting subtitles as display labels: omit decorative terminal periods. Preserve punctuation when it carries grammatical or editorial meaning in body copy, quotations, legal text, code, or data.
- Repeated card families share title/body roles, surface contrast, internal spacing, and link treatment. Card text links use natural casing, no underline, and the shared right-arrow icon after the label.
- Start sections with their meaningful title. Use supporting labels and numbers when they add distinct information, such as time axes, dates, prices, counts or actual process order.
- Separate major page modules with spacing, composition, surface, or background changes instead of full-width divider lines. Dividers remain valid inside functional structures such as tables, menus, accordions, code panels, and dense data rows.
- Narrative cards use `min-height` when copy length can grow. Fixed heights may not push copy against the lower edge at smaller widths.
- Repeated process rows align to one common left axis unless a deliberate accepted composition says otherwise.
- Blog article heroes and article bodies share one readable text axis and measure. An accepted media-led composition may establish a wider Hero as a scoped exception.
- Interactive marketing cards keep their resting surface on hover and move emphasis to the action label and icon by changing both to the signal cyan. Buttons, menus and dense data rows retain their own control-specific states.

### Public route classification and footer

- Apply the approved homepage and Products visual language to narrative public routes such as About, Partners, Contact, Blog, and Pricing.
- Alignment across narrative routes means shared chrome, type roles, surface hierarchy, controls, motion, and interaction states; it does not require copying the homepage's section count or card composition.
- Keep Discovery and Status as functional directory and operational-data surfaces. Developers may use a hybrid presentation, but code, contract, access, and runtime evidence must remain visually and semantically primary; adapt shared typography and framing to these evidence-led tasks.
- "Keep functional" defines composition and behavior, not a visual freeze. Functional public routes still align brand typography, color, spacing, controls, and restrained surface treatment with the approved public system. Shell and chrome follow each surface reference; this does not add shared navigation or a footer to standalone Status or focused flows.
- Public routes that render the shared `Footer` use the same footer information architecture: Product, Company, Resources, and Legal groups, followed by copyright and Email, X, and Telegram actions. Density and appearance may adapt while the shared content set stays consistent. Standalone recovery screens and focused flows follow their surface reference; this rule does not add a footer to them.

## Shared route motion

- Every public marketing route uses the shared route-aware entrance-motion owner: reveal the hero on load, reveal sections and cards as they enter the viewport, replay after client-side navigation, and show content immediately when reduced motion is requested. Implement route-specific needs through that shared owner’s supported variants.

## Marketing QA

- For a whole-page or shared-system change, compare the homepage and Products at the same required viewports, then compare every changed narrative route against those two owners. Record computed hero, section, body, and closing-title values; matching roles must match numerically even when their text wraps differently.
- Inspect the fully scrolled page as well as the first fold. Check document overflow, broken images, unrevealed motion content, sticky navigation, menus at viewport edges, and mobile 44px targets.
- Enumerate rendered anchors from every changed public route and verify internal, external, and `mailto:` destinations. Separately exercise client-only entry controls such as mobile navigation, menus, copy actions, and demos; an HTTP response alone does not prove the interaction or destination semantics.

## Homepage-specific work

Read [Homepage composition](homepage.md) for accepted entry-card geometry, mobile media order, trust metrics, and agent-menu details. These rules do not apply to unrelated product screens.

## Final composition checks

- Preserve the marketing shell’s narrative density and the functional composition of Discovery, Status and Developers through their scoped owners.
- Keep the cyan action treatment consistent through hover entry/exit and bind search visuals to the real accessible interaction owner.
- Keep artwork and copy legible at target widths; an intentionally overlapping composition needs scoped acceptance.
- Apply mobile motion fallbacks to the affected decorative owner and retain normal/reduced-motion behavior elsewhere. Promote a chosen composition after acceptance.
