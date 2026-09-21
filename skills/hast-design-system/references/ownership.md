# Hast source ownership

Paths below are relative to the actual `hast-mono` checkout. Resolve the imported implementation and effective cascade before making a change; source pointers are navigation aids, not visual acceptance.

## App boundaries

| Surface | Start here | Boundary |
| --- | --- | --- |
| Public marketing, docs, legal, customer stories, status | `apps/site/src/app/[locale]/(marketing)/` | Public task semantics; `(marketing)` route-group membership does not make a status table or document a campaign Hero |
| Authenticated workspace, Task Agent, account, billing | `apps/agent-web/src/app/`, `apps/agent-web/src/components/ui/`, `apps/agent-web/src/app/globals.css` | Agent Web local primitives; never import Site CTA geometry as the product control system |
| GTM marketing | `apps/site/src/app/[locale]/(marketing)/gtm/page.tsx`, `apps/site/src/app/(marketing)/gtm/` | Public landing page |
| GTM application | `apps/gtm-web/src/app/`, `apps/gtm-web/src/components/`, `apps/gtm-web/src/app/globals.css`, `apps/gtm-web/src/app/tailwind.css` | Operational project UI; inspect its own state and theme ownership |
| AIP FDE workbench | `apps/aip-web/src/app/`, `apps/aip-web/src/components/app-shell.tsx`, `apps/aip-web/src/app/globals.css` | Profile-scoped management UI; do not copy public FDE layouts |

Backend authority stays with the repository owner: Platform API for shared product data/permissions, Backplane for runtime orchestration, matching FDE modules for integration-specific behavior. If a UI issue crosses these boundaries, read applicable AGENTS.md and source contracts; this skill is not backend architecture authority.

## Site source map

| Concern | Owner / inspection entry |
| --- | --- |
| Base Tailwind variables and theme mappings | `apps/site/src/app/tailwind.css` |
| Global imports and `dark:` binding | `apps/site/src/app/globals.css` |
| TS `ds` class maps and `cx` helper | `apps/site/src/theme/design-tokens.ts` |
| Marketing shell, nav, font and common stylesheet imports | `apps/site/src/app/[locale]/(marketing)/layout.tsx` |
| Marketing shell theme overrides, gutters, Hero spacing | `apps/site/src/app/(marketing)/marketing.css` |
| Shared marketing semantic colors and landing-page utility bridge | `apps/site/src/theme/marketing-colors.css` |
| Shared chapter spacing | `apps/site/src/theme/section-spacing.css` |
| Shared feature-card radius, border and shadow roles | `apps/site/src/theme/feature-cards.css` |
| Shared FAQ disclosure states and toggle | `apps/site/src/theme/faq.css`, `apps/site/src/app/(marketing)/_components/faq-toggle.tsx` |
| Homepage-family color aliases and section rules | `apps/site/src/app/(marketing)/home.css` |
| CTA variants and focus ring | `apps/site/src/theme/buttons.css` and `ds.component.button` |
| Explicit marketing H1 normalization | `apps/site/src/theme/hero-typography.css` |
| Homepage composition | `apps/site/src/app/[locale]/(marketing)/page.tsx`, imported files under `apps/site/src/app/(marketing)/_components/` |
| FDE and community composition | Locale routes `fde/page.tsx`, `fde/community/page.tsx`; `apps/site/src/app/(marketing)/fde.css` |
| Industry families | `apps/site/src/app/(marketing)/solutions/industries/`, especially `_industry-section-library.tsx`; locale routes under `solutions/industries/` |
| Enterprise/FDE/Agent FAQ | `apps/site/src/app/(marketing)/_components/enterprise-faq-section.tsx` |
| Theme preference and HTML synchronization | `apps/site/src/lib/theme.ts`, `apps/site/src/components/theme-toggle.tsx`, `apps/site/src/components/theme-synchronizer.tsx`; also inspect root layout initialization |
| Localized navigation and strings | `apps/site/src/i18n/`, `apps/site/src/components/locale-switcher.tsx` |

## Public non-campaign surfaces

- **Docs:** locale routes `docs/page.tsx`, `docs/[slug]/page.tsx`; published content under `apps/site/content/docs/{en,ja,zh-CN}`. Preserve document hierarchy, code blocks, anchors, sidebar and reading width. Shared inline link styling has a `ds.component.link.inline` owner. Do not apply Hero H1 rules to article headings.
- **Customer stories:** locale routes `solutions/customer-stories/page.tsx` and `[slug]/page.tsx`. Preserve list/detail reading hierarchy, dates, imagery and content. A black page in light mode is not explained by a dark illustration alone; check actual page colors and theme selectors.
- **Legal:** locale `privacy/page.tsx` and `terms/page.tsx`; retain readable prose and heading hierarchy.
- **Status:** locale `status/` routes and `apps/site/src/app/(marketing)/status/status.module.css`. Keep status meaning, run evidence, unknown/error/loading states and data layout. Marketing chrome does not justify promotional treatment of operational data.

## Import and cascade pitfalls

`home.css` is explicitly imported by several page families; it is not guaranteed on every marketing route. A token referenced by GTM or another standalone family must be available on direct navigation through a common owner or a deliberate local import. A prior client navigation can leave CSS available and mask a missing import.

`design-tokens.ts` can retain older classes while a later scoped stylesheet controls the rendered result. Check computed styles and the real selector, rather than treating a matching token name as proof of consistency.
