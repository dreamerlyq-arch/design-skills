# Discovery and Status surface reference

Apply the [non-marketing UI contract](non-marketing.md) to both Discovery and Status. Source maps identify implementation owners; inspect the target revision before editing.

## Canonical source map

| Purpose | Source |
| --- | --- |
| Route and authority map | `openwiki/reference/web-route-source-map.md` |
| Shared product tokens | `apps/web/src/styles/tokens.css` |
| Discovery token/shell contract | `apps/web/src/styles/discovery/tokens-shell.css` |
| Discovery stylesheet assembly | `apps/web/src/styles/discovery.css` |
| Overview route and streamed loading owner | `apps/web/app/discovery/page.tsx`, `apps/web/app/discovery/loading.tsx`, `apps/web/src/components/site/pages/discovery/DiscoveryIndexPage.tsx`, `apps/web/src/components/site/discovery/LiveGatewayCatalogPanel.tsx` |
| Interactive directory | `apps/web/app/discovery/sources/page.tsx`, `apps/web/src/components/site/pages/discovery/DiscoverySourceDirectoryPage.tsx`, `apps/web/src/components/site/pages/DiscoveryDirectoryBrowser.tsx` |
| Provider profiles | `apps/web/app/discovery/api/[slug]/page.tsx`, `apps/web/src/components/site/pages/discovery/DiscoveryApiPage.tsx`, `apps/web/src/components/site/pages/discovery/DiscoveryApiPagePresentation.ts` |
| Reusable search | `apps/web/src/components/site/DiscoveryTopbarSearch.tsx` |
| Checked-in public evidence | `apps/web/src/data/discovery-static/`, `apps/web/src/data/discovery.ts` |
| Live Registry projection | `apps/web/src/lib/live-gateway-catalog*.ts`, `apps/web/src/lib/discovery-live-integrations.ts`, `apps/web/src/lib/discovery-gateway-readiness.ts` |
| Status route and independent shell | `apps/web/app/status/page.tsx`, `StatusFrame` in `apps/web/src/components/site/pages/StatusPage.tsx` |
| Status projection | `apps/web/src/lib/pubfi-status.ts`, `apps/web/src/components/site/pages/StatusPage.tsx`, `apps/web/src/styles/pages/status.css` |

Use the OpenWiki route source map when available, then verify the current source owners before changing routes, public data, live projections, search/directory behavior, status presentation, or machine-readable companions.

## Visual contract

- The Discovery overview uses the 1400px public shell with 64px desktop, 32px tablet, and 16px mobile gutters. Dense directory, profile, comparison, and evidence routes may keep their narrower functional axes.
- Functional ownership is not an exemption from public-site alignment. Discovery uses the shared public header and footer. The current Status implementation has an independent `StatusFrame` with its own masthead and actions; preserve that owner rather than adding marketing navigation/footer for consistency. Both share brand font roles, signal color, spacing rhythm, control geometry, and surface hierarchy. Shell geometry belongs to each surface owner; its presence in source does not establish visual acceptance of every state.
- Cards remain evidence-dense and use the shared small-radius geometry. Use the density appropriate for evidence comparison.
- Non-marketing cards, including Discovery and Status panels, use solid-color backgrounds without decorative gradients. Group cards around search, authority, status, tables, and disclosures. Semantic chart patterns and loading shimmer remain distinct from card backgrounds.
- Keep base and nested cards visibly distinct through the applicable surface tokens, following the [non-marketing surface rules](non-marketing.md#surfaces-color-and-status).
- Cyan identifies interactive signal and exact available/selected emphasis. Page-kind accents may distinguish profile, comparison, and hub context but do not override semantic statuses.
- Utility labels and compact evidence metadata use mono roles with natural casing. Body copy remains readable and does not collapse into metadata density.
- Overview count summaries keep one precise label and one standalone value. Put authority-boundary detail in a hover- and keyboard-focusable help tooltip instead of repeating the unit and a third persistent description line.
- Preserve the directory owner's filtering and pagination behavior; crawlable numbered pages remain ordinary routes and links. Page size is product behavior, not a global design rule.

## Provider-card hierarchy

Users locate a provider by its name before reading its metrics. Keep provider names at the primary visual level and place API counts, health labels and navigation actions in supporting roles.

- Preserve the overview's two-column desktop grid when aligning internal hierarchy; let actual provider data determine the number of cards. Sharing hierarchy and status primitives does not imply copying Status's full-width rows or disclosures.
- Group provider name and a quieter API count in the header, put upstream and PubFi proxy health together below, and keep Registry readiness and route counts as supporting information. Preserve each authority and destination.
- Use size, weight, color, and spacing together to separate levels; making every field a similarly sized headline erases the reading order. Keep semantic health colors, including major outage, unknown, and unavailable distinctions, in the shared status primitive.

## Authority presentation

- Editorial profile facts, Registry availability, and Status observations remain visually and verbally distinct.
- `ready`, `blocked`, `not_present`, and `registry_unavailable` are not interchangeable. Unknown or malformed live data cannot render as success or an empty healthy state.
- Checked-in source profiles may remain visible when live authority fails, but they cannot claim callable availability.
- Directory search completeness depends on Registry-only providers even with the Live filter off. Keep pending and unavailable results distinct from a confirmed empty search; retain available editorial matches and the user's query, filters, and page as live evidence resolves.
- Provider health and PubFi proxy observations belong to Status. A green badge cannot imply a successful route execution without an actual validated response.
- Machine-readable exports and Markdown companions use the same factual sources; visual copy changes may not create unsupported claims in them.

## Component and state contracts

- Reuse `DiscoveryTopbarSearch` for provider search. Preserve keyboard navigation, query visibility, no-results/error distinction, result destinations, and viewport-safe panel placement.
- Reuse Discovery hero, breadcrumb, status/claim, card, structured-block, and directory owners named in source. Inspect the caller before extending a class with a similar name.
- Long evidence, capability, and table content scrolls locally or transforms intentionally on mobile; the document cannot overflow horizontally.
- Mobile filtering uses its existing modal/trigger owner and preserves selection, close, focus return, and crawlable navigation.
- Keep JSON-LD, canonical links, pagination, `data-demand-*` attributes, and analytics semantics intact while changing presentation.
- Keep the Discovery shell and checked-in editorial content available while live Registry and Status reads resolve independently. The loading owner shows pending/unavailable values explicitly until their evidence arrives.
- Discovery and Status follow the [async structure contract](design-contract.md#async-and-streamed-regions), use a restrained left-to-right shimmer where applicable, and keep decorative bars hidden from assistive technology. If the owning surface uses entrance motion, reveal the resolved semantic module once through that owner rather than animating each evidence row. Status may show resolved content directly.

## Validation focus

- Test live catalog ready, unavailable, malformed/failed-closed, and provider-not-present states when in scope.
- Test search idle, typing, results, no results, cleared query, keyboard selection, and error behavior.
- Test directory filters, live-only behavior, page navigation, long provider names, missing logos, and mobile filter presentation.
- Test Status unknown/degraded/healthy distinctions and narrow-screen evidence-table overflow.
- Discovery uses the shared route-aware entrance-motion owner: reveal the hero as one semantic group and sections rather than individual evidence rows. The independent Status shell does not require that owner or an added entrance animation. Preserve each surface's motion scope; reduced-motion users see all content immediately.
- For every visible streamed region, compare loading and resolved bounding geometry at the risk viewports, distinguish preventable shifts from genuine content growth, verify shimmer movement and reduced-motion fallback, and exercise unavailable or failed-closed resolution as well as success.

## Final composition checks

Use the [authority boundary](authority.md) for availability claims and data integrity. Keep provider evidence and search interaction prominent while aligning shared primitives. Verify actual data, destinations and route helpers in the resulting composition.
