# Module patterns

Evidence classification, reviewed 2026-09-22: Text default display, Balance child styling, shared exports and layout tokens are source-verified implementation facts at the source-map revision. Amount correctness, truthful states and intact destinations are correctness constraints. Choosing a particular heading variant, card grouping, prose width or mobile ordering is a visual composition candidate until accepted. Permission to maintain this skill does not approve candidate visuals.

Representative families were home, block list, extrinsic detail, account, assets, governance and the address converter. They supply partial evidence, not whole-site approval.

## 1. Page and module hierarchy

Choose PageContent/Container for the explorer shell, Boundary where a distinct module needs a surface, and ModuleHeader for comparable headings and actions. Match title variant, title-to-body spacing and separators across peers. Overview metrics, wide tables and prose are different content types; use grouping suited to each content type and give prose an appropriate reading measure.

## 2. Labels, amounts and identities

Use explicit stacks or field rows to distinguish labels from values. Inspect the rendered children: parent text-lg does not necessarily resize Balance; consecutive default Text elements can concatenate.

Confirm whether an API amount is a base-unit integer or already normalized. Use the project amount renderer with correct chain/token decimals and unit; derive precision from the data contract and perform the base-unit conversion exactly once when needed. Test zero, a large value and fractional values relevant to the chain. Keep same-level metric values visually consistent while allowing subordinate units.

Lists should keep main columns visible using established short entity display with access to the full identity. Detail views should expose the full identity and copying through wrapping or a bounded presentation. Check actual flex/table shrink behavior. Keep full content reachable by fixing the layout or providing bounded local scrolling.

## 3. Tables and responsive layout

Reuse Table for tabular comparisons and TableCol for label/value details when their actual behavior fits. Order columns by the user's scan and decision sequence, with identity and ranking close to the leading edge. Give independent dimensions distinct labels and columns, and keep related fields adjacent so their relationship stays easy to read. A combined cell works when its shared unit or relationship adds meaning at a glance. Match same-role body text across a row, including links, numeric values and status tags, while preserving meaningful hierarchy for labels and supporting units.

Local horizontal scrolling of a genuinely wide table can be appropriate; entire-document overflow is a different issue. Record both document width and table/container width before diagnosing. Test long addresses, numeric extremes, extra status text and narrow layouts. At narrow widths, preserve logo/icon dimensions, let text labels adapt, and keep menus within viewport bounds through suitable anchoring and collision handling.

## 4. Tabs, filters and pagination

For shareable page content, use stable tab values and the existing routable pattern; verify direct URL, refresh and back navigation. Preserve other relevant query parameters. Ephemeral local controls may retain local state.

Keep filter labels, heading and result counts consistent with active selection. Reuse Pagination where the backend supplies its needed capabilities; preserve truthful totals and the supported page-size behavior. Keep known loading and pagination structure stable during requests while allowing real result counts and text to grow naturally. Selected options/tabs remain distinguishable from transient hover or keyboard highlight with a persistent visual cue.

Expose a single high-value filter beside the data as a labeled Select so its current state stays visible and directly adjustable. Use FilterDialog for several related criteria that benefit from a grouped apply action. Keep the shared Select trigger, option list and selected item on a consistent typography and state scale; inspect the actual open menu as well as the closed control.

## 5. Forms and asynchronous states

Give every control an accessible label and connect error text to the control. Distinguish untouched input, invalid input, pending, empty results, failure and success. Show empty only after a successful request with zero results; show failure with its recovery path. Preserve entered values and offer an appropriate recovery action when supported. Each request owns its result and failure; a background failure leaves independent valid results intact. Preserve zero versus unknown/unavailable, including chart inputs.

Keep results discoverable after the main action on mobile while preserving explanatory content. Specific help/result reordering and prose max-width are design proposals, not approved global constants.

Charts with zero total use a clear zero/empty state; proportional segments require actual nonzero data.

## 6. Theme, status and localization

Use semantic surface, border, text and chain tokens from current source. Chain identity color is distinct from global link or status semantics; resolve the active chain’s palette independently from link and status roles.

Define a consistent domain status mapping across list, detail and account modules. A StatusTag borrowed from AssetConversion is a component reuse decision, not a global semantic authority. Retain text labels so status is not color-only.

Use link styling for actual destinations or established interactive semantics. Use ordinary text styling for values that have no supported destination. Keep display labels localized through existing authored locale ownership; format enum labels without altering API values or user content.

Choose shared Button variants for prominent module/header actions, and inline link treatment for secondary navigation such as contextual "view all" destinations. Keep menu and dialog surfaces aligned to the shared radius, border, shadow, spacing and typography tokens, then verify their selected, focus and viewport-edge states in the composed page.
