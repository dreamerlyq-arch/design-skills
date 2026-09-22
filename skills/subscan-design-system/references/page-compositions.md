# Explorer composition candidates

Status: proposed composition guidance, reviewed 2026-09-22; not a set of newly approved visual templates. Use only relevant rows. Resolve components through [source map](source-map.md) and inspect the current counterpart before implementation. www and portfolio have separate layouts; use their own surface guidance.

| Task | Starting composition | Decisions and exceptions |
|---|---|---|
| Overview with metrics and lists | PageContent → Container → logical metric/summary groups and table modules; use Boundary where a separate surface is useful, ModuleHeader for peer headings | Choose primary metrics before assigning equal emphasis. Match Balance value/unit typography; group related metrics and give dense tables the width their columns need |
| Filterable entity list | Page/module heading and count → search/filter controls and active labels → Table with shared identity/amount cells → compatible Pagination | Heading reflects filters; distinguish no matches, empty source and request failure. API capability determines total/page-size controls. Limit horizontal scroll to table owner |
| Entity or transaction detail | Entity identity/summary → TableCol field rows → routable tabs for shareable subordinate content | Full identity remains reachable/copyable; child lists reuse list contracts. Summary, long prose and data tables need different measures |
| New account module | Existing account page → chain/feature gate → matching module header/body within the host composition | Audit only the added/changed module and affected shared owners. Preserve neighboring account content and conditional behavior; one account does not cover every branch |
| Governance or long-form detail | Summary and status → relevant action/vote region → readable prose and separate wide data modules | Prose reading width is a scoped design proposal; give data tables their own appropriate width. Zero/unknown vote data must remain truthful |
| Tool form | Associated labels/inputs → primary action → result or actionable feedback → relevant help | Invalid/pending/success are distinct; preserve help content. Result proximity on mobile is a proposal to inspect, not permission to delete explanation |

For a new page, select the closest composition and explicitly identify the few choices it does not determine. Reuse the actual imported components; a similar class or filename is not adoption. When an existing shared owner needs fixing, distinguish fixing it from migrating remaining custom consumers.

For visual alternatives, compare actual consumers with equivalent data, viewport, theme and state. Apply the candidate at the intended owner, then remove temporary overrides and verify the selected implementation. Label fixture and live-data evidence separately and retain only the accepted alternative as a design decision.
