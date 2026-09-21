# Agent Web design contract

Applies to the authenticated Agent Web console and its API documentation. AIP, GTM and Site have separate implementation owners. Apply the heading, dialog-heading, icon-button and inset-divider rules in the [skill entrypoint](../SKILL.md).

## Tokens and component ownership

- Colors, borders, radii, spacing and interaction states come from the app's semantic tokens and shared components. Extend the appropriate shared owner when a recurring role needs a variant.
- Reuse Button, Input, Textarea, Dialog, dropdown and confirmation components. Shared styles govern repeated compositions such as resource rows, message bubbles and form controls.
- Define styles at their owning token, component or explicit variant. Prefer updating that definition to appending overrides, conflicting utilities, repeated selectors or `!important`. Keep responsive/theme/state variants intentional and localized; remove superseded declarations instead of layering a second implementation.
- Trace effective imports, theme scope and local overrides. A matching utility name alone does not establish the rendered value.

## Surfaces and borders

- Ordinary white content cards are flat and use the subtle border token; the light-mode baseline is `#E3E4E9`. Dark surfaces use corresponding theme tokens. Dialog elevation, control boundaries and semantic states have distinct roles.
- Read-only embedded code, configuration and prompt panels use the secondary pale-blue surface, primary text and a consistent inset radius, without an outer border. A padded header divider may separate actions from content. Terminals, logs and editors retain styling appropriate to their purpose.
- Adjacent search fields, selectors and outlined actions use the same resting control-border token. Cards use the subtle card-border token. Focus, invalid, selected and disabled states remain meaningful and distinguishable.
- Dividers on secondary pale-blue content surfaces use `--surface-inset-divider`, owned by `apps/agent-web/src/components/task-agents/api-doc-surfaces.module.css`: `color-mix(in srgb, var(--color-border-secondary) 35%, var(--color-surface-secondary))`. Keep the line 1px thick and inset to the content gutters; use this surface token instead of the white-card border token.
- Interior separators align with neighboring content gutters at each breakpoint. Structural page, sidebar and table boundaries retain their own alignment.
- Inspect every card on a page, including below-fold sections and expanded content, for the same surface-role rules.

## Documentation layout

- API documentation uses a single reading column with headings and deliberate section spacing. Avoid redundant outer cards and isolated decorative icons on peer headings; code and configuration keep their own inset surfaces.
- Centered unavailable or empty messages sit in a subtle bordered, padded, flat container so their alignment has a visible boundary. Keep the section heading outside that state container.
- Desktop document navigation occupies a separate sticky right column below the site header. Reserve its width in the layout. Links identify the current reading section and land below the fixed header; account for nested scroll containers, content resizing after expansion and the final section near the page bottom.
- The directory starts with its links without a redundant visible title; retain an accessible navigation name. Narrow screens place it above the document without covering content. Only include sections present in the document.

## Actions and forms

- Filled buttons identify primary actions; outlined or ghost variants identify supporting actions. A tinted parent surface uses existing button variants.
- Theme-aware buttons use paired background and foreground tokens from the same variant, including hover and focus states. Do not combine an adaptive light primary background with a fixed white label or icon.
- Ordinary Input, Textarea, Select and InputGroup controls share editable-surface and control-border tokens without resting shadows. Keep appearance in their shared owner; page wrappers add layout constraints, not a second field skin. Verify scoped token aliases in computed styles, especially outside dashboard layouts and in dark mode.
- Textareas honor explicit row counts and remain stable while typing unless the composition intentionally requires content-based sizing, such as a chat prompt.
- Select triggers keep 12px horizontal padding, including the trailing arrow gutter. Selected items use a stronger background than hover or keyboard highlight; retain a checkmark or equivalent selected-state cue. Compact selectors use an explicit shared variant rather than consumer overrides.
- Native disabled semantics and accessible names apply to controls and switches. A pointer-events wrapper alone does not disable keyboard interaction. When an in-flight operation requires dismissal to be blocked, cover the close button, Escape, backdrop and controlled open-state callbacks consistently.
- Copy controls in tinted content panels use a ghost button with an icon and localized label. Provide hover and keyboard-focus feedback, a check icon and announced label on success, and visible failure feedback.
- Icon-only controls have equal width and height, no text-button horizontal padding, no flex shrink, and an accessible name. Their size fits the neighboring control group.
- Form dialogs separate task content, labeled settings and footer actions. Keep a usable input area without excessive blank height; align labels and controls on desktop and stack them on narrow screens. Supporting destination links have lower emphasis than cancel/submit actions. The form body scrolls independently when needed.
- Selectors use shared Select primitives and compound time controls use shared Popover primitives, including nested menus. Match neighboring control height, border and radius; avoid mixing native select menus with custom dropdowns in the same form. Native date/time inputs may retain their platform picker for entry semantics.
- Check popup collision handling, focus return, Escape behavior and nested selection without dismissing the parent dialog. Validate every conditional form branch, including one-time, interval and recurrence settings.
- Creation and editing forms share fields, spacing and primary/secondary action styles. During submission, controls that could duplicate or conflict with the request are disabled.
- Errors appear in the active form or confirmation surface. Nested dialogs show the relevant error in the active layer; changing or dismissing an operation clears stale operation-specific feedback.
- Destructive actions use semantic error colors consistently across label, icon, hover and focus. Confirmation actions distinguish cancellation from the destructive action and communicate pending work.

## Loading and feedback

- Structure changes include the loading implementation in the same scope. Skeletons share the populated view's layout owner: surface, gutters, radius, icon size, text hierarchy, metadata/status/action columns and responsive behavior. Verify loading and populated views together at the same viewport; also check empty and error states against the new layout.
- Skeletons reserve the space of the content they replace. A centered indicator is appropriate for an indeterminate content region; a list skeleton follows the list geometry.

- Page-content loading states sit centrally in the available content area beneath the page header, with a restrained circular indicator and a supporting label below it. The ring has no decorative central block. Inline and button loading stay within their owning control.
- Loading, empty, error and populated states have deliberate layouts and readable labels. Loading motion respects reduced-motion preferences.
- Error, warning and success notices pair a subtle semantic background with a same-family border and readable foreground. Labels and icons convey meaning alongside color.

## Resource lists

- Resource rows use a subtle secondary-surface background, 16px horizontal and 12px vertical padding, and a shared radius. Titles are 14px semibold; supporting descriptions are 12px with a 20px line height.
- Keep metadata columns, contextual actions and table-oriented structures where they support comparison. Distinguish title, description and metadata by typography and placement.
- Skill rows place a single status label in the trailing column, aligned across rows. Pending work uses a spinner within that status area. Avoid an additional checkmark that repeats the same state beside the label.
- Ready/enabled states use a labeled status with a positive indicator. Inactive/paused states use a readable muted treatment and a pause indicator or equivalent non-color cue. Inactive resources remain viewable.
- Selected, connected, unavailable and failed states preserve their distinct meanings. Missing configuration includes its reason and the appropriate unavailable action state.
- Long titles and descriptions fit the available width without displacing status labels or actions; preserve full content through the resource detail view or an appropriate accessible disclosure.

## Conversation workspace

- Pending user messages and message history share a secondary-surface bubble with `--radius-lg` (12px), 16px horizontal and 12px vertical padding. Leave 8px between text and attachments.
- Attachment chips fit the content width and truncate long filenames. Text and attachments maintain visible inset space from the rounded corners at narrow widths.
- The composer uses shared control-border, surface and radius tokens, with a visible focus treatment. Upload and attachment-removal controls reuse square icon buttons; pending operations communicate availability clearly.
- Tool details and runtime panels reuse semantic surfaces and status treatments while preserving expandable content, code readability and task information.
- File panels retain their desktop sidebar and narrow-screen dialog behavior, with accessible close controls and readable long filenames.

## Source owners

All paths are relative to the target checkout; confirm that they exist before using them.

| Concern | Owner |
| --- | --- |
| Semantic tokens and product primitives | `apps/agent-web/src/app/tailwind.css`, `apps/agent-web/src/app/dashboard-primitives.css` |
| Base controls | `apps/agent-web/src/components/ui/` |
| Shared form and action styles | `apps/agent-web/src/components/ui/dashboard-controls.module.css` |
| Resource surfaces | `apps/agent-web/src/components/task-agents/resource-list.module.css` |
| User-message surface | `apps/agent-web/src/components/task-agents/message-surface.module.css` |
| Short subtitle presentation | `apps/agent-web/src/lib/ui-subtitle.ts` |

## Verification

Check comparable roles across the affected page family, including expanded and nested content. Exercise relevant loading, empty, populated, failure, pending and inactive states. Check long content, narrow widths and both themes when affected. Distinguish source coverage, rendered fixture coverage and real backend behavior; fixture previews establish presentation only. Use the [verification guide](verification.md) for proportional checks and report remaining gaps explicitly.
