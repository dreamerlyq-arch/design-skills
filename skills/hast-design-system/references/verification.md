# Hast UI verification

Choose checks from the changed owner and honor current repository requirements. This is a coverage guide, not a requirement to exercise every row for a one-line edit.

| Changed area | Meaningful checks |
| --- | --- |
| Token, global CSS or import | Direct-load affected route families and navigate between them; inspect computed values, theme and breakpoint overrides; do not rely only on a warmed-up client session |
| CTA or inline action | Native semantics/destination, hover, keyboard focus on light/dark/inverse surfaces, wrapping, disabled/loading behavior where applicable |
| Hero/type/spacing | Accepted reference or comparable page at the same viewport; outer copy spacing versus inner/demo spacing; natural en/zh-CN/ja wrapping when affected; anchor/header overlap |
| Cards | Comparable family inventory; nested boundaries, border/radius/shadow in both themes; preserve demo and editorial exceptions |
| FAQ | Default first-open state, click, Enter/Space, expand/collapse icon, question's accessible name, focus ring, mobile wrapping, both layout families |
| Navigation or locale | Actual navigation, selected route, locale destination, mobile menu open/close, focus return and long labels |
| Booking or other form UI | Required/invalid/pending/success/error states and duplicate submission; preserve API semantics; do not send a real booking merely for visual QA |
| Copy actions | Verify success feedback and denied/unavailable-clipboard recovery; use keyboard Select All to confirm selection covers only the intended content, including configuration and prompt variants |
| Product UI | Applicable empty/loading/error/permission states and app-local controls; use the authorized test account/data and report fixture limits |
| Motion | Existing reduced-motion behavior plus ordinary behavior in affected owner; do not claim site-wide coverage from a single animation |

## Scope reconciliation

For an explicitly global request, inventory routes and their real style owners: common/page CSS, CSS Modules, TSX classes, inline styles, localized content, responsive/theme overrides and relevant state screens. Record each family as changed, already consistent or intentionally excluded, with a reason. Keep temporary coverage notes outside product source unless they are requested deliverables.

Source coverage and rendered coverage are separate. Use representative pages per shared owner, then inspect exceptions; report unrendered routes/locales honestly. Perform a separate review pass over final diffs and coverage before claiming a global result. Use an independent reviewer only when delegation is authorized; otherwise state the self-review boundary.

For responsive work, 390px phone, a relevant tablet breakpoint and a desktop such as 1440px are useful defaults, not fixed design constraints. Compare before/after at identical dimensions. Theme changes need light and dark; fixed inverse surfaces need checks in their parent themes. Screenshots document specific conditions, not all states.

## Component adoption and interaction coverage

- A shared-component fix and a consumer migration are separate coverage claims. Inventory shared imports, native elements, hand-built menus/popovers and local style overrides across the affected page family, including conditional and expanded branches. Do not infer adoption from similar appearance or a component name.
- Diagnose the failing layer before changing a shared owner: compare a working consumer with the failing one, inspect its rendered styles and props, and determine whether the cause is the primitive, missing adoption or a local override. Preserve working shared geometry when only one consumer is wrong.
- Migrations preserve field values, events, validation, pending behavior, model/source identifiers and meaningful metadata. Retain native or specialized controls where their semantics warrant it, such as file, color and date/time pickers; account for these exceptions explicitly.
- For page-family audits, exercise a complete representative flow: navigation, list, detail, action and feedback. Include keyboard focus, nested popup dismissal, collision/scroll boundaries, long content, narrow layouts and relevant loading, empty, failure and pending states. Static primitive searches alone do not establish interaction coverage.
- Reconcile changed, already-consistent, intentionally retained and unverified consumers. State whether evidence comes from source review, a fixture preview or real backend behavior. A mixed preview containing additional local changes is not exact-branch visual evidence.

## Local checks and evidence

- Read current AGENTS.md and package scripts. Use the runtime and package-manager versions required by the target checkout; do not assume the shell default.
- Site commands: `pnpm --filter @hast/site lint`, `pnpm --filter @hast/site test`; build with `pnpm --filter @hast/site build` when required by repository rules or shared import/build risk.
- For product apps, select their own workspace and checks. Site tests cannot establish Agent Web or GTM application behavior.
- Use a browser and inspection tools allowed by the current environment. Confirm that the preview serves the target checkout before testing; a reachable URL alone does not establish the revision. Record the route, viewport, theme and relevant state. If rendering is unavailable, report code-only verification explicitly.
- Do not run a build against a concurrently running dev server's output directory. Stop only task-owned services, preserve inherited ones, and stop services started by the task before final handoff as required by repository rules.
- Store temporary screenshots and reports in the environment's designated artifact or temporary directory. Include enough route, viewport, theme and revision context to interpret them. Task screenshots become design baselines only through explicit acceptance.
- Report local checks, browser observations, deployment and user acceptance distinctly. A 200 response, screenshot, lint or build alone does not prove usability.

## Structural edits and data-dependent UI

- When independent requests or nested operations share a screen, test mixed outcomes: the target list succeeds empty while a background request fails; the target load fails and a dialog is opened then canceled; an operation fails inside its active dialog. Match each visible message and empty state to the request that owns it. A single global success/error fixture does not cover these combinations.
- For a review finding, verify the reported trigger and the adjacent success/recovery path. Existing tests for a data parser or static markup do not prove event-driven state isolation or keyboard selection.
- Treat populated, loading/skeleton, empty and error presentations as one structural change. Trace separately implemented route fallbacks and component skeletons, share layout definitions where practical, and compare loading-to-content alignment at the affected breakpoints before completing the change.

- Removing a decorative node requires tracing its consumers, not just deleting JSX: inspect positional selectors (`nth-child`, `first-child`), grid tracks, gaps, active/hover states, responsive overrides, animation targets and map indices. Keep indices still used to select icons or calculate animation delays.
- Prefer a stable class or direct semantic child selector for a title over its former numbered position. Removing a leading number can leave normal and active title rules targeting a stale `span:nth-child(2)`; lint/build cannot detect the resulting lost typography. Inspect selector-to-DOM correspondence and, where available, computed styles for both states.
- Keep surviving desktop layouts intact: removing a number column from a three-column list should leave the intended title/body columns, not automatically collapse the entire row.
- CSS parsing and lint prove syntax only. Match verification to the failure: styles need selector/cascade and rendered-state checks; TypeScript checks catch deleted indices still referenced in JSX.
- For pricing and other data-dependent UI, distinguish loading, a legitimate empty result, and a request/configuration failure. Verify readable recovery states and environment-derived action destinations without changing API or cache behavior as a visual fix. Route underlying data failures to their implementation owner and tests; mock results do not establish live-service availability.
