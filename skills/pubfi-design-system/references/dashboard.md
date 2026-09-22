# Dashboard surface reference

## Canonical source map

| Purpose | Source |
| --- | --- |
| Authenticated route composition | `apps/web/app/dashboard/page.tsx`, `apps/web/app/dashboard/layout.tsx` |
| Native session boundary | `apps/web/src/lib/native-auth.ts`, `apps/web/src/lib/auth-flow.ts` |
| Console navigation and Playground | `apps/web/src/components/dashboard/ConsoleShell.tsx`, `apps/web/src/components/dashboard/Playground.tsx`, `apps/web/src/components/dashboard/PlaygroundApiPicker.tsx`, `apps/web/src/components/dashboard/PlaygroundFields.tsx`, `apps/web/src/components/dashboard/PlaygroundJsonEditor.tsx`, `apps/web/src/styles/pages/console.css` |
| Dashboard data boundary | `apps/web/src/lib/dashboard*.ts`, `apps/web/app/actions/dashboard.ts` |
| Shared dashboard components | `apps/web/src/components/dashboard/` |
| Surface tokens | `apps/web/src/styles/pages/dashboard-theme.css` |
| Shell and panels | `apps/web/src/styles/pages/dashboard-shell.css`, `apps/web/src/styles/pages/dashboard-overview.css` |
| API-key flow | `apps/web/src/components/dashboard/ApiKeyManager.tsx`, `apps/web/src/styles/pages/dashboard-api-keys.css`, `apps/web/src/styles/pages/dashboard-modal.css` |
| Credits and billing | `apps/web/src/components/dashboard/CreditPurchasePanel.tsx`, `apps/web/src/styles/pages/dashboard-credits.css` |
| Usage and ledger | `apps/web/src/components/dashboard/DashboardUsagePanel.tsx`, `apps/web/src/components/dashboard/DashboardLedger.tsx`, `apps/web/src/styles/pages/dashboard-usage-ledger.css` |
| Responsive behavior | `apps/web/src/styles/pages/dashboard-responsive.css` |
| Shared controls | `apps/web/src/components/ui/TextInput.tsx`, `apps/web/src/components/ui/SelectTrigger.tsx`, `apps/web/src/styles/components/text-input.css`, `apps/web/src/components/ui/Button.tsx`, `apps/web/src/components/ui/PendingSubmitButton.tsx`, `apps/web/src/components/ui/TokenSelect.tsx`, `apps/web/src/components/ui/CopyIconButton.tsx`, `apps/web/src/styles/components/copy-icon-button.css`, `apps/web/src/styles/components/product-utility.css` |

## Visual contract

Decision status: retained design direction, reconciled 2026-09-22. The open-section layout, full Profile navigation and distinct primary/secondary actions supersede the earlier filled-module, focused-Profile-header and equal-emphasis descriptions. This records the existing later direction, not a new claim of full runtime acceptance.

- Dashboard is a compact operational surface. Distinguish the Console sidebar and outer shell from each section's inner working axis; read their dimensions from the current owner instead of imposing one page-wide width. Apply the [non-marketing UI contract](non-marketing.md), shared small-radius tokens, quiet separators, and restrained surface contrast.
- Tables, fields, metrics, metadata, and statuses use operational type roles. Page headings may use the brand display family through a Dashboard-specific role; this does not import marketing hero sizes into dense content.
- Dense lists use row lines and local grouping rather than a card around every fragment.
- Put the page title and page-level actions outside the data panel, including API keys; permission-denied and empty variants retain the same page hierarchy. Preserve the panel’s top content padding when moving the heading out.
- Peer summary metrics share label, value, and helper typography and alignment unless an explicit hierarchy distinguishes them. Keep dates and ratios visually consistent with sibling numeric values.
- Panel padding and row insets are separate roles. Table headers and rows share an inner content axis; leave space inside hover backgrounds for text, actions, and inline-edit focus borders. Check clipping at the horizontal-scroll boundary.
- Reducing separators must rebuild hierarchy, not flatten it: keep clear titled modules, tighter spacing within related groups, restrained grouped-action surfaces, and necessary table row boundaries. Neither a line after every fragment nor blanket line removal solves grouping.
- Dashboard and its preview retain the complete public navigation, with the signed-in user menu replacing public authentication actions. Profile and its preview share the Console header width, full public navigation, Home logo destination, and signed-in account menu. Profile may retain a narrower form content width.
- Use open sections by default for Overview, Playground, API keys, Usage, Billing, and Profile. Separate modules with headings, spacing, aligned content edges, and restrained rules; use a filled surface only where it serves a distinct control or state role. Keep control, menu, dialog, and semantic-state surfaces distinct. Preserve each section's tasks and states.
- The Dashboard avatar is a 32px light rounded square with an 8px radius and a 16px dark initial, inside a 48px interaction target. Size the visible avatar independently from its hit area; retain the compact visible shape within its larger interaction target.
- Ordinary Dashboard fields use the shared TextInput/TextArea appearance contract; selects use the shared SelectTrigger with the appropriate menu owner. Route styles own sizing and layout. Specialized generated-secret displays are not editable inputs and retain their own code/copy composition and focus semantics.
- Preserve clear primary/secondary action hierarchy through the shared Button variants; neutral colors do not make auxiliary and primary actions interchangeable. Destructive actions retain explicit danger semantics.
- Dashboard select menus use the neutral card surface token rather than a blue overlay or a separate literal color. Keep fields and menu items distinguishable through their existing surface/state tokens; selected options have a check marker and a state distinct from hover.
- Status codes, billing states, revoke actions, and error feedback use semantic attention/danger/success tokens. Code highlighting and Console surfaces may have dedicated centrally owned tokens; assign each color to an established semantic role before adding a new token.

## Data and permission contract

- The native session adapter gates `/dashboard`. Preserve its authenticated user/token checks and the route's safe login redirect, including the selected Console section when supported; use `native-auth.ts`, `auth-flow.ts`, and the route owner rather than assuming an external auth SDK.
- Billing-account selection and membership permissions determine which panels and actions exist. Presentation cannot expose owner/admin controls to a viewer.
- Setup-missing, no-billing-account, billing-unavailable, ready, partial/degraded, and load-failure states remain distinct.
- Dashboard data comes through its current server adapters. Represent missing or pending data through the appropriate explicit state.

## API-key and secret contract

- Newly created secret material is one-time-visible. Existing keys never reveal their secret again.
- Completion of a save/copy acknowledgement is gated by the real successful acknowledgement state when the flow requires it.
- Copy success, copy failure, create pending, create failure, delete/revoke confirmation, and permission denial remain explicit.
- Do not add a download or alternate secret escape hatch without an explicit request.

## Billing and consequential actions

- Price, amount, credit capacity, expiry, billing account, payment readiness, and idempotency context remain visible and accurate.
- Pending actions prevent duplicate submission. Failure does not render as success or discard recovery context.
- Destructive or irreversible actions require their existing confirmation and permission checks.

## Responsive contract

- Rows and summaries either transform intentionally or scroll inside their owner; the page does not horizontally overflow.
- Mobile/coarse-pointer controls retain at least 44px interaction targets without inflating all desktop rows. Measure the actual target, not just the visible icon.
- Dialogs fit the viewport, keep their title/close/action reachable, and allow content growth beyond their minimum height.

## Final composition checks

Keep operational sections and explicit permission, billing, unavailable and setup states. Preserve API-key/payment/session behavior through the [authority boundary](authority.md). Report preview fixtures separately from authenticated runtime evidence.

## Chart and shell regression checks

- When a usage chart changes, verify empty, sparse, and dense series. Keep deterministic preview data confined to the preview; it cannot establish live usage.
- Empty or selectively hidden axis labels must reserve the same line box as visible labels so bars retain a common baseline; compare bar bottoms, not just data heights.
- Keep label length from distorting chart spacing. Measure adjacent gaps and first/last label overlap across data densities; choose the layout mechanism in the chart owner. Edge alignment is density-dependent, not a universal rule.
- Inspect final computed geometry at each affected breakpoint. When a focused header removes navigation, remove the unused grid track too; align the dropdown to the corrected grid. Verify avatar hit areas independently of the visible avatar and check late responsive overrides.

## Console and Playground

- Reuse the Console shell and section navigation. Preserve selected section, API, request fields, response, and error context through the supported transitions.
- Quota/help text aligns with the left edge of its fields. Keep response/save feedback separate from action alignment; a footer action group may remain right-aligned. In Playground, cURL is secondary and Send request is primary, with trailing icons per the shared button contract.
- Center an empty response icon and message as one group within the available response body below its heading. Derive this available height from the actual neighboring form and region layout.
- Inline copy affordances use the shared `CopyIconButton` contract; full menu actions and one-time-secret acknowledgements keep their own behavior.
- Request-pending is distinct from unavailable: prevent duplicate Send actions and expose the action's busy state. A busy response region does not replace the action's pending semantics.
- Inspect controls, editor, API picker, empty/error responses, and narrow layouts when those owners change. A preview proves only its rendered state, not authenticated requests, key creation, payment, or session mutations.
