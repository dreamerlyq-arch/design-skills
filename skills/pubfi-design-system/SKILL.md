---
name: pubfi-design-system
description: Apply and maintain PubFi's design system and product authority boundaries. Use for every PubFi task, including pubfi-discovery UI, Figma, visual QA, and backend/API work. Backend-only tasks use the authority reference and repository routing; they do not load UI guidance.
---

# PubFi Design System

Keep PubFi surfaces coherent while preserving their distinct tasks and real product behavior. This skill records reusable rules and source pointers; it does not authorize redesign, business changes, or publication.

## Choose the relevant references

Load only what the task needs. For implementation, identify the target route/service and current working-tree state; for visual work, also identify the intended viewport/state and accepted reference. Resolve repository paths from the target workspace and bundled references from this skill directory.

| Task or surface | Read |
| --- | --- |
| All tasks: data claims, behavior, authority | [Product authority](references/authority.md) |
| UI implementation, design, or review | [Shared design contract](references/design-contract.md), then the applicable surface below |
| Any non-marketing UI, including functional public pages, account, Dashboard and error/recovery screens | [Non-marketing UI contract](references/non-marketing.md), then the applicable surface below |
| Marketing: home, Products, About, Pricing, Partners, editorial | [Marketing](references/marketing.md) |
| Discovery, Status, directory, provider evidence | [Discovery and Status](references/discovery.md) |
| Login, OAuth consent, profile, sessions | [Account](references/account.md) |
| Public 404 and route/global 500 | [Error states](references/error-states.md); authenticated Dashboard errors stay with the Dashboard owner |
| Dashboard, Console/Playground, API keys, usage, billing | [Dashboard](references/dashboard.md) |
| Backend, Registry, API, release, migrations | Product authority only, then the repository's relevant OpenWiki/source/test owners |
| Changed interaction or async states | Relevant rows of [State matrix](references/state-matrix.md) |
| Repository-wide visual audit or global token change | [Shared design contract: repository-wide coverage](references/design-contract.md#repository-wide-coverage) |
| Substantial visual/responsive work, visual QA, or in-page token comparisons | [Baselines and comparison](references/baselines.md) |
| Skill maintenance, stale pointers, source drift | [Maintenance](references/maintenance.md) |

Hybrid routes follow their task: Developers keeps code/access evidence primary; public chrome does not make Discovery a campaign page. The non-marketing contract applies across functional page families; their surface references retain source ownership and task-specific behavior. Read another surface reference only when its owner is affected.

## Resolve conflicts

Current user instructions and applicable repository rules govern the task. Source, tests, schemas, route behavior, and task configuration establish current implementation and runtime authority. Accepted design rules establish the intended presentation; a source snapshot is not visual acceptance.

When source and a design rule differ, inspect the owner and acceptance context. Preserve behavior, distinguish a stale pointer from an implementation gap, and ask only when the unresolved choice changes the requested outcome. Keep experiments marked as candidates and preserve deliberate exceptions until a scoped decision replaces them.

## Apply the system

- Extend the existing PubFi token, primitive, appearance, or surface owner. Keep route geometry local and shared behavior in its shared component; review affected rendered variants.
- Preserve product meaning, destinations, real data, and authority distinctions from the product authority reference.
- Keep marketing expressive, Discovery/Status evidence-led, account flows focused, and Dashboard operational. Preserve natural phrase wrapping and change layout before media or copy collide.
- A localized adjustment needs only the relevant owner and checks. A shared-system or whole-page change needs scope reconciliation across its affected callers. Keep the change within those affected owners.

## Verify the changed risk

Use the repository's current validation planner for code integration. A skill-only edit uses the maintenance checks, not application build/release lanes. Drift checks locate stale evidence; they are not routine prerequisites for every PubFi task and do not prove runtime or visual correctness.

For visible changes, inspect the exact route, applicable states, and risk viewports in a browser available under the current environment rules. Use the state matrix and baseline reference to select coverage. A screenshot, fixture, or successful build cannot establish interaction, authenticated behavior, or live authority.

If no permitted browser is available, continue authorized source-level work and relevant checks; explicitly leave visual and interaction verification open. Report the source-level result and remaining rendered checks separately.

Report actual changes, relevant verification, unverified states, and delivery status. Mention branch/commit, viewport, account/fixture, or route only where they affect interpretation.

## Maintain

The loaded `SKILL.md` locates this package. If the environment identifies separate authoring and installed copies, compare them before editing and synchronize only intended changes. Personal installation paths, browser choices, communication preferences, and artifact locations belong in environment configuration or local collaboration rules, not this package.

Record a reusable user rule or accepted system change in its narrowest reference during the same task; follow [maintenance](references/maintenance.md) for evidence refresh and validation. General collaboration rules remain in the local Codex rules; repository knowledge remains in OpenWiki/source.
