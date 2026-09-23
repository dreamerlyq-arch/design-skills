# Review workflow

## Scope first

For PR review, verify base/head and classify changed files into new routes, existing-route modules, shared UI, navigation, data and locale support. Map conditional visibility and aliases. Count route patterns separately from runtime IDs. List unaffected host-page modules explicitly when attribution could be confused.

For whole-site review, inventory route families before selecting representatives. Exclude retired routes, aliases, API endpoints, framework/layout files and error routes from ordinary page counts or report them separately. A representative family audit is not exhaustive page acceptance.

For a new page, identify surface, chain availability, main user task, data contract and closest module analogues. Read their source and inspect their rendered states before choosing a baseline. Ask only for missing decisions that materially change the result.

## Evidence and attribution

1. Record revision, route, chain, locale, theme, viewport, authentication/data state and any fixture use.
2. Compare shared owners and actual composed UI. Attribute a discrepancy to the PR only after checking the base or changed ownership; otherwise label it uncertain or pre-existing.
3. Deduplicate shared root causes; maintain a second mapping from each route/module to findings.
4. Use meaningful viewport sizes around relevant breakpoints. Prior representative checks used 1440×1000 and 390×844 CSS px; these are test samples, not exclusive supported sizes. Verify innerWidth rather than screenshot pixel count.
5. Cover relevant light/dark, locale, zero/long/populated, loading/error, focus and selected states. Report what was actually exercised; source-only reasoning is not live interaction verification.
6. For responsive findings, measure document and local container overflow separately. For type hierarchy, inspect computed styles of final values and units.
7. Confirm direct URL and refresh when claiming state restoration. Check actual invalid/valid outcomes when claiming form feedback works.

When one control or visual pattern is reported, trace its shared owner and inspect the other consumers and variants that use it. Record the shared root cause separately from each affected page/module, then verify representative consumers at their relevant breakpoints. For selects and overlays, inspect both closed and open states, computed trigger/menu typography, focus/selection feedback, and placement against viewport edges.

## Finding format

`Priority · Route / chain / module / state → impact → owner → evidence → proposed correction → verification / missing coverage`

Set priority from user impact, exposure and recovery. Incorrect amounts may be high priority when they materially mislead; functional or composition issues depend on the affected task. A category alone does not fix the severity, and an arbitrary overall score is not evidence.

Separate confirmed defects from design preferences. Label each suggestion by its evidence and impact. Positive findings matter: preserve correct shared shells, semantics and behaviors.

## Deliverable boundary

Report changed modules, root-cause count and affected-route count separately. Include exact verification and outstanding checks. Keep existing issues separate from introduced issues. Count introduced root causes in the PR total and list historical issues separately. For implementation, verify affected analogous controls/modules within scope; base a full-site completion claim on reconciled coverage and independent QA.

Audit screenshots and logs are task evidence, not mandatory dependencies of the skill. Do not perform chain transactions, modify business semantics or publish external updates simply to validate visual consistency.
