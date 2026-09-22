# PubFi product authority

Read for all PubFi tasks, including backend-only work. Current source, tests, schemas, and repository task configuration establish runtime behavior; OpenWiki routes to those owners. This reference does not replace them.

## Product authority boundary

Keep these authorities distinct in implementation, presentation, and claims:

1. Checked-in Discovery data is public editorial evidence.
2. The active signed Registry generation owns exact callable paths, methods, schemas, billing mode, and readiness.
3. Status owns observed upstream and PubFi proxy health.
4. A validated provider response proves one actual execution; no universal PubFi envelope may replace route-specific schemas.

Unknown, unavailable, malformed, incomplete, or stale live authority does not become success through presentation. Checked-in editorial data cannot restore runtime availability. UI copy, badges, counts and colors reflect the strongest evidence actually available.

## Behavior boundary

Visual work must preserve real data and links, content negotiation, authentication redirects, OAuth consent, session handling, API-key secrecy, billing/account selection, payment safety, analytics, demand-signal attributes, machine-readable exports, and route semantics. Never add mock availability or placeholder product data solely to make a page look complete.

## Repository routing

For repository work, use `openwiki/quickstart.md` when present to find the narrow relevant source and test map. If generated documentation is absent or stale, navigate directly to the source/test owners in the applicable surface reference and current repository configuration; its absence does not block source review. Use current repository rules and validation-planner results for checks and delivery; keep release procedures with that repository configuration. Pure backend work does not require visual tokens, viewports, or browser QA.

## Sensitive data and consequential actions

- Do not add passwords, OTPs, tokens, or provider secrets to URLs, persistent UI copy, screenshots, logs, analytics, or reports. Preserve protocol-owned OAuth callback handling; authorization codes carried by that existing flow must not be copied into presentation, telemetry, or review evidence.
- Never expose stack traces, raw exceptions, credentials, request payloads or internal authority details in public error copy.
- Preserve existing payment, permission and irreversible-action gates. Do not perform consequential actions merely to test presentation; use authorized test data or record the unverified outcome.
