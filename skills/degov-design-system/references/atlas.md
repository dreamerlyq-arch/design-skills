# Atlas implementation reference

Source snapshot: repository `degov-agent-api`, commit `90b14f26d3e94ac8350bf2da93505568af1a8b33`, observed 2026-08-27. Inspect current imports and diff before reuse; for suspected drift run `node scripts/check-drift.mjs --product atlas --repo-root /absolute/path/to/checkout` from the skill directory. The stored `/daos` images came from production; its deployed commit was not recorded, so these images are not proof of this local commit's rendering.

## Canonical source map

| Purpose | Source |
| --- | --- |
| Product tokens | `apps/atlas/app/atlas-tokens.css` |
| Shared application styles | `apps/atlas/app/globals.css` |
| Backend/data semantics and local runtime guidance | `docs/atlas.md`, `apps/atlas/lib/backend-api.ts` |
| Overview-specific composition | `apps/atlas/app/page.tsx`, `overview.css` |
| DAO directory | `apps/atlas/app/daos/page.tsx` and adjacent directory components |
| Governance feed | `apps/atlas/app/governance/page.tsx`, `governance/governance-feed.css` |
| DAO detail | `apps/atlas/app/daos/[daoId]/page.tsx`, `dao-detail.css` |
| Shared data UI | `apps/atlas/components/ui.tsx` |
| Select | `apps/atlas/components/atlas-select.tsx` |
| Tooltip | `apps/atlas/components/atlas-tooltip.tsx` |
| Status | `apps/atlas/components/state-pill.tsx` |
| Side panel/drawer | `apps/atlas/components/event-detail-panel.tsx` |
| Navigation/search | `apps/atlas/app/primary-nav.tsx`, `dao-search.tsx` |

## Exact token snapshot

- Canvas `#080809`; sidebar `#101011`; surface `#141415`; raised `#1c1c1e`; hover `#252527`; strong hover `#303033`.
- Primary text `#f5f3f0`; muted `#a29fa1`; faint `#777478`.
- Primary control `#f0efec`, hover white, control text `#161617`; accent is white.
- Lines are white at `0.08` and `0.14`. Focus is white at `0.46` in a 3px ring.
- Status: success `#b8d856`, warning `#efbc61`, info `#93bdf8`, danger `#f19a9a`, violet `#a78bfa`.
- Font sizes are 0.68, 0.78, 0.92, 1.16, and 1.45rem; page title is `clamp(2rem,3vw,3.25rem)`.
- Space is 4, 8, 12, 16, 20, 24, 28, 32, 40, and 48px.
- Radius is 8, 12, and 18px; pill is 999px.
- Default/compact controls are 40/34px. Panel padding is 24px desktop and 16px compact. Content maximum is 1400px; mobile gutter is 12px.
- Normal feedback is 100–280ms. Route motion may extend to 420–460ms; reduced motion is 1ms.

## Component contracts

### Shared data UI

`components/ui.tsx` is the first source for MetricCard, EmptyState, CaveatBox, FilterForm, DaoCard, ProposalCard, VoteDistribution, EvidenceList, PageIntro, GlossaryTerm, LoadingSkeleton, and ErrorState. Reuse these instead of creating generic lookalikes.

- `LoadingSkeleton` variants are `card`, `text`, `metric`, and `table-row` and expose status labels.
- `EmptyState` uses `role="status"` and explains the absence.
- `ErrorState` uses `role="alert"` and supports a Retry action.
- VoteDistribution must keep accessible distribution labels and its explicit no-data fallback.

### Select and search

- `AtlasSelect` is a custom listbox, not a native select. Preserve listbox/option roles, `aria-expanded`, `aria-selected`, ArrowUp/Down wrapping, Home/End, Escape-close, outside-click close, and focus restoration.
- `DaoSearch` has `idle`, `loading`, `ready`, and `error` states with a 200ms debounce. Preserve its product-local result and navigation behavior.

### Tooltip and status

- `AtlasTooltip` is cursor-anchored, portal-rendered, focus-accessible, and intentionally replaces native `title` bubbles.
- `StatePill` accepts backend coverage/status values and converts them to stable `state-*` classes. Use that mapping consistently across consumers.

### Navigation and event panel

- `SidebarNav` and `MobileTabBar` share the route list and use `aria-current="page"` for the active destination.
- `EventDetailPanel` owns detail/proposal-list modes, trigger focus restoration, safe quick links, AI analysis states, filters, and side-panel behavior. Extend it rather than introducing an unrelated drawer.

## Route baselines

- `/`: Overview dashboard, summary metrics, trend visualization, active DAO shortcuts, and latest signals.
- `/daos`: canonical DAO Directory with search, status metadata, grouped filters, sortable data rows, and compact mobile row transformation.
- `/governance`: Governance Feed with priority signals, live/degraded states, filters, feed rows, and side details.
- `/daos/[daoId]`, `/proposals/[proposalId]`, `/participants/[participantId]`: entity detail routes; preserve source provenance and semantic data labels.

Use `assets/baselines/atlas-desktop-1440x1000.png` and `atlas-mobile-390x844.png` for the `/daos` composition. The images were captured from `https://atlas.degov.ai/daos` because the local route could not render without its required backend environment.

## Composition checks

- Use Atlas neutral surfaces, white action/selection/focus emphasis and neutral structural borders.
- Keep dense data in aligned rows and use the canonical search, select, tooltip, StatePill, async-state and event-panel owners.
- Record the rendered data state accurately: a missing-API boundary verifies that error presentation, while a populated route is needed for data-layout acceptance.

## Runtime and navigation evidence

- Check `docs/atlas.md` and the current backend adapter when data cannot render. The inspected source requires `ATLAS_API_BASE_URL` and server-side authentication; an old `ATLAS_USE_MOCK_DATA` recipe or leftover local fixture does not prove the current runtime supports mocks. Use the supported data/auth setup or report the runtime check as unavailable; fixture evidence remains explicitly separate.
- If an explicitly authorized fixture path exists in the actual checkout, identify it as fixture-based visual evidence. It cannot verify live backend integration.
- For route/motion changes inspect `apps/atlas/app/atlas-route-motion.tsx` and its actual callers. Verify content visibility after client navigation and re-entry as well as hard refresh; a layout-level animation may run before streamed route content mounts.
