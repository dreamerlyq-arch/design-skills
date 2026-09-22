# Non-marketing UI contract

Apply to all PubFi functional interfaces: Discovery, directories, Status, account and consent, Dashboard, settings, billing, and functional error/recovery screens. Marketing pages keep their own composition. Read this with the shared design and product authority contracts, then use the relevant surface reference for source owners and task-specific behavior.

These rules generalize the reusable lessons from the interface refinement work. They do not impose one page's module count, exact column percentages, type sizes, viewport breakpoints, or business vocabulary on every interface. Preserve deliberate differences between public shells, compact working areas, and focused forms.

## Layout and information hierarchy

- Align a page with the shell it belongs to. Keep sibling sections on a consistent content axis; use a shared alignment axis for header, headings, cards and tables. Use a narrower form or working area only where the task benefits from it.
- Use a clear spacing scale for major sections, heading-to-content gaps, and related groups. Keep primary-panel padding consistent, nested cards more compact, and dense rows appropriate to their content. Consistency is by role, not identical padding on every element.
- Align content edges across a panel's heading, toolbar, results, and first/last table cells. Interior cells may use tighter spacing without shifting the outer baseline.
- Short explanations and notices inside functional cards use the full available content width and wrap naturally with the container. Constrain reading width for genuine long-form content or an explicit task-specific reason.
- Keep labels close to the values they describe. Metrics should give the value greater visual emphasis than its label; use typography and grouping before adding decoration. Missing-value placeholders retain alignment with real values but have lower emphasis.
- Place titles and their short status/action partners on a coherent row with intentional vertical alignment. Allow wrapping or stacking before text becomes cramped. Repeated cards use the same hierarchy even when their data differs.
- Put an exceptional long explanation in an associated notice or detail area rather than stretching every peer card. Preserve its relationship to the affected item. A divider belongs after the complete group, including its explanation, not between an item and its own note.
- Use separators where groups change meaning. Choose spacing, surface levels, headings and separators according to the group’s meaning.
- Change the grid at the point where content stops fitting. Prefer fewer columns or stacking over shrinking essential text, one-word-per-line wrapping, or fixed heights that clip content. Account for both single-item and multi-item layouts.

## Surfaces, color, and status

- When a functional module needs a card, it uses a solid surface with clear parent/child levels, without decorative marketing gradients. Keep the theme's canvas, base panel, and nested/elevated panel visibly distinct. Map backgrounds through the applicable theme surface owner rather than copying a page-specific token or literal color into other products. Preserve the chosen light/dark theme and deliberate surface exceptions.
- Inspect nested panels together after changing a token. Assigning the same opaque fill to parent and child can make separate cards visually disappear even when their spacing and DOM structure are unchanged.
- Use the shared 8px small-radius token for applicable rectangular panels and controls. Preserve circles, pills, joined-group outer corners, chart geometry, and explicitly larger radii as defined by the shared contract.
- Inherit the [approved semantic palette](design-contract.md#approved-semantic-status-palette). Cyan identifies interaction; green, red, yellow, and neutral states retain their meanings. Choose status styling from the evidence and severity of its semantic role.
- Keep identity separate from status. Use the explicit status field and its labeled indicator to convey health; keep the identity presentation neutral.
- When asked to compare token options, preview actual consumers and label exact values clearly. After selection, update the token owner and remove any temporary comparison controls and overrides. A comparison UI or persistence layer is optional, not a prerequisite for token work.

## Dense lists and progressive detail

- Allocate column width according to content. Give the main identifier/path enough room to read naturally instead of leaving large empty secondary columns. Choose proportions for the actual table; keep table-specific proportions local.
- Keep long identifiers, source metadata, and diagnostic context reachable in secondary details without dominating every default row. Reorganizing presentation does not authorize deleting evidence, changing destinations, or hiding required decisions.
- Bound large expanded data regions with an explicit maximum height and internal scrolling. Select the height for the available viewport and task, honoring any user-specified limit. Keep the scrollbar visibly discoverable before scrolling and the header available while reading rows. A stable gutter alone may not make an operating system's overlay scrollbar visible; verify the rendered affordance.
- A summary link to details should reveal and position the actual target in one action. Open a collapsed ancestor as needed, account for fixed headers, and preserve anchors and keyboard focus. Complete that reveal and positioning in the initial action.
- Keep loading, request error/retry, no data, and no filter matches distinct. Preserve the query, show the result count, and make clearing filters straightforward.
- Filtering and displayed summary values must use the same representative item/state. Preserve related child records when presenting a filtered group, unless the product explicitly defines different behavior.
- On narrow screens, use reachable local table scrolling or intentional labeled-row layouts. Keep document width within the viewport.

## Drawers, disclosures, and contextual help

- Keep concise decision-relevant summaries in the page. Use a drawer or disclosure for longer secondary explanations when it improves scanning; keep essential task content directly visible.
- Drawers need an opaque theme surface and a visible boundary from the underlying page. Keep content scrollable, groups compact, and all actions reachable on mobile. Preserve focus entry/return, Escape, named close controls, and the appropriate background-blocking behavior.
- Reuse the shared disclosure indicator. Check whether `summary::after` or the primitive already supplies a chevron before adding an icon; there should be one stable indicator.
- Test navigation into details from the initially collapsed state. Opening motion can leave a target temporarily unmeasurable. Wait until the target can be positioned before scrolling and focusing it; choose the mechanism in the disclosure owner without disabling ordinary motion globally.
- Help content must work with hover and keyboard focus, stay within the viewport, and be dismissible. Let users cross the trigger-to-tooltip gap and scroll long help content; keep help open while users scroll within it.

## Loading, unavailable data, and truthful presentation

- Follow the [async structure contract](design-contract.md#async-and-streamed-regions). Functional placeholders account for row borders and touch-target height; use neutral placeholders until counts and states are known.
- Preserve genuine zero. Use an unavailable presentation such as `—` with an accessible label for missing measurements; render placeholder values explicitly as unavailable. One missing source should not suppress valid independent data elsewhere.
- Keep unknown, unverified, unavailable, empty, and healthy states distinct where the product defines them. State success at the level supported by evidence and mark future periods as unobserved.
- Explain errors using verified product vocabulary. Preserve useful technical context in details and label the cause as unknown when evidence is insufficient. Missing incident evidence uses an unknown state.
- For segmented visualizations, encode parts within a common height and outer clip. A failed part should not create a red frame around the whole mark. Check border, padding, and corner geometry before adding optical offsets. Preserve meaningful distinctions between unknown, future, and partial data; preserve the legend’s meaningful distinctions through visual changes.

## Responsive checks and common failure mechanisms

- Check intermediate widths as well as wide desktop and mobile. Larger titles or longer values often break a grid before its existing breakpoint. Test the content-driven transition rather than relying on one fixed viewport list.
- Give grid children containing wide tables `min-width: 0` and shrinkable tracks such as `minmax(0, 1fr)` where needed. Keep the table's minimum width inside its scroll owner, not propagated to the document.
- Fixed secondary columns can crush long IDs into narrow text columns. Use intrinsic sizing or stack groups before this happens; allow natural phrase wrapping for ordinary text.
- Measure loading and resolved outer bounds, including borders and hit areas. A visually small mark may sit in a larger touch target, and its placeholder must reserve that real geometry.
- Verify the affected open, focused, scrolled, loading, empty, error, and unavailable states. Test initial entry rather than only interactions after the component is already open. Use behavior/render checks for grouping and data distinctions; source-string checks do not prove visual or interaction quality.
