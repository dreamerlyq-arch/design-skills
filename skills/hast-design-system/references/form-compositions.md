# Scoped Agent Web form compositions

Scope: existing Agent Web schedule and account-connection families. Retained patterns, scope clarified 2026-09-22; this is not a new visual acceptance claim. Reuse these compositions when extending the same family, not as requirements for unrelated forms. Shared control, error and theme rules remain in [Agent Web](agent-web.md).

## Schedule settings

- Schedule settings place timing, model and reasoning controls in one wrapping row beneath the prompt. Use consistent outlined triggers with matching height and radius; omit redundant visible group headings while retaining accessible names. Narrow screens wrap controls without horizontal overflow.
- Selectors use shared Select primitives and compound time controls use shared Popover primitives, including nested menus. Match neighboring control height, border and radius; use the shared menu presentation for comparable selectors. Native date/time inputs may retain their platform picker for entry semantics.
- Check popup collision handling, focus return, Escape behavior and nested selection without dismissing the parent dialog. Validate every conditional form branch, including one-time, interval and recurrence settings.

## Account connection popover

- Account connection popovers use an icon/title header with a compact status badge at the trailing edge. Descriptions, feedback and optional account details use the full content width below; footer actions sit beneath an inset divider. Give body text the full content axis. Keep long feedback text wrapping within the content gutters.
- Connection badges use semantic pale backgrounds with matching text: green for connected, red for expired or unavailable, neutral for loading or ordinary disconnected states. Keep the badge label short; account names and detailed errors remain in the body. Action failure updates its own feedback while the badge reflects the actual account connection.

For either family, exercise the actual conditional branches, nested popup dismissal, focus return and narrow layout. Preserve specialized native entry semantics where appropriate.
