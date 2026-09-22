# PubFi visual baselines

Registered assets in `source-manifest.json` identify stored baselines; an empty baseline list means no stored comparison is available. Current source establishes implementation; explicitly accepted frames and route-specific acceptance establish intended visual direction. Review screenshots and working-tree experiments are not automatically canonical.

A missing baseline does not block an authorized local fix. Use the applicable accepted contract and inspect the current target before and after the change; label those captures as comparison evidence, not accepted baselines. Ask for a design decision only when the missing reference leaves a material choice unresolved. Limit baseline updates to evidence affected by the task.

## Comparison viewports

Use the smallest set that covers the changed risk:

| Viewport | Use |
| --- | --- |
| 1440×1000 | wide desktop composition and density |
| 1280×900 | intermediate desktop collision and hero/media behavior |
| 768×1024 | tablet navigation, grid transition, and content growth |
| 390×844 | mobile order, touch targets, menu/dialog fit, and wrapping |

For a localized component change, the target viewport plus one adjacent responsive state may be sufficient. For a whole-page or shared-system change, cover desktop, intermediate desktop when relevant, and mobile.

## Comparison method

1. Open the exact target route and state at the exact viewport.
2. Compare shell width, heading wrap, primary-action hierarchy, media/text separation, surface levels, control density, sticky/fixed behavior, first-fold content, and document overflow.
3. When aligning sibling marketing routes, compare computed typography for the same semantic roles at the same viewport. Hero, section, body, and closing-title roles must resolve to the same tokens and numeric values; different line wrapping is acceptable when the text or available measure differs.
4. Treat changing counts, dates, account data, Registry data, and Status data as state differences unless they expose a layout defect.
5. Compare interactions as well as still frames: hover in/out, focus, menu open/close, search results, dialog, loading, empty, error, and reduced motion when relevant.
6. For a streamed or asynchronous module, capture loading and resolved geometry at the same viewport. Compare the module and adjacent section bounds, placeholder structure, shimmer, one-time resolved entrance when the surface uses it, and reduced-motion state; apply the [async geometry contract](design-contract.md#async-and-streamed-regions): stabilize known structure while permitting genuine content growth.
7. Investigate source and state before updating a baseline.

## Button-audit coverage

- For a broad button audit, reconcile route/component families and opened states against an explicit coverage ledger. Include the smallest supported width and both sides of relevant breakpoints; checking only 390px and a wide desktop does not cover intermediate card compression.
- Confirm hydrated controls and resolved streamed content are present before measuring. A successful click or a loading shell is not evidence that a menu, dialog, or final action rendered.
- Bind the preview to the audited checkout. Recheck branch and serving directory when another task changes the shared workspace; isolate concurrent work before continuing acceptance checks.
- Follow geometry flags with visual inspection: distinguish accidental clipping from intentional ellipsis, screen-reader-only content, and reachable local scrolling. Report fixture, authentication, pending/error, and data-dependent gaps instead of claiming exhaustive acceptance.

## Typography and preview freshness

- Check computed font size and weight on the visible text element itself, including nested links, rather than assuming the heading container's styles reach its children. Scope inheritance fixes to the component so unrelated links retain their roles.
- If the user sees an older hierarchy, verify the exact URL, serving checkout/process, and rendered computed styles before making another design change. Refresh or recover a confirmed stale preview, then measure again; distinguish stale-preview evidence from a design disagreement.
- Keep preview recovery separate from product acceptance. The browser rendering the new CSS proves freshness, while the user's hierarchy decision and the actual layout checks establish the relevant design result.

## In-page token comparisons

Use this method when the task calls for visual alternatives, not as a prerequisite for an ordinary token change.

- Compare actual consumers on the same page with equivalent data, viewport, geometry and state. Change the real shared token and inspect a consumer's computed style; a swatch alone is insufficient.
- Clearly label each option, exact values and the current baseline. Choose controls and placement for the user's request; an in-page panel is an optional presentation, not a permanent requirement.
- Keep comparison overrides reversible and local to the preview. Preserve a way to restore the baseline; exclude experimental controls from product changes.
- After selection, update the token owner and verify the consumer again without preview overrides. Record only the accepted choice; unselected alternatives remain task evidence.

## Adding a canonical baseline

Only add an asset after the user accepts the surface at the target state and viewport.

- Store it under `assets/baselines/` with route, state, and viewport in the filename.
- Record route, capture date, state/fixture, theme, viewport, source kind, source/deployed commit if known, working-tree condition, dimensions, and SHA-256 in `references/source-manifest.json`. Keep unknown provenance explicit; a local HEAD does not identify a production capture, and source observations do not establish capture provenance.
- Hide browser chrome and transient comment/debug badges without altering product layout or data.
- Visually inspect the stored image, then run `node scripts/check-drift.mjs --workspace-root /absolute/path/to/pubfi-discovery` against the intended checkout. Asset integrity does not establish that the current checkout matches the capture or that its visual result is accepted.
- Replace a baseline only when its superseding acceptance and the asset being replaced are clear. Preserve approved comparison sets and review evidence.

## Module scope and adoption

For a change review, distinguish new routes, new modules inside existing routes, shared-owner changes and navigation entries. Report unique root causes separately from affected routes; compare the base before attributing an old host-page defect to a new module. Check real imports, custom/native counterparts and local overrides before calling a shared-component migration complete. Scale this inventory to the affected scope, not automatically to the whole product.
