---
name: hast-design-system
description: Apply Hast UI source ownership, marketing design rules, tokens, themes, responsive behavior, and visual QA when implementing or reviewing hast-mono interfaces. Covers the public Site and routes work to Agent Web, GTM, and AIP local UI owners. Excludes backend-only work.
---

# Hast Design System

Keep Hast interfaces consistent through their actual shared owners while preserving each surface's purpose. This skill records source mappings and reusable decisions; it does not authorize redesign, business changes, or publication.

## Select the scope

Locate the target Hast checkout from the current workspace or the user-provided repository. Resolve the branch/diff, route and imported component before editing. Repository paths in this skill are relative to that checkout; skill reference links are relative to this package. Do not infer the target from a remembered directory or preview port.

| Task | Read |
| --- | --- |
| Any Hast UI task; distinguish marketing from product UI | [Source ownership](references/ownership.md) |
| Site marketing, shared visual tokens, buttons, Hero, cards, themes | [Marketing contract](references/marketing.md) |
| Docs, customer stories, legal, public status | Relevant Site row in [source ownership](references/ownership.md); use marketing guidance only for genuinely shared chrome/components |
| Agent Web console, resource lists, forms, conversation workspace and API docs | [Agent Web contract](references/agent-web.md) |
| Shared style change, responsive behavior, interaction or visual QA | Relevant rows of [verification](references/verification.md) |
| Skill changes, stale pointers, adoption of an accepted design rule | [Maintenance](references/maintenance.md) |

A small local edit needs its owner and affected checks; it does not trigger a whole-site redesign or all-app audit. For product UI, use the target app's imported controls and theme. Detailed marketing defaults do not apply to authenticated workflows merely because the brand is Hast.

## Authority and implementation

- Current user instructions and applicable repository rules govern scope. Source, tests, and effective configuration establish current implementation and behavior. User-confirmed decisions establish visual intent; an existing source value, screenshot, or successful build is not independent visual acceptance.
- Reuse the actual token/component owner. Trace CSS imports, custom-property scope, later overrides, and responsive/theme selectors before adding a fix. TS class maps are consumers of CSS tokens, not a second source of numeric truth.
- Preserve content, destinations, locale routing, booking flows, keyboard behavior, data and permission semantics. A consistency request permits presentation changes, not silent deletion or altered product claims.
- Keep global, surface, component, and route composition separate. Similar action roles should share variants; product windows, terminal demos, diagrams, pricing, and editorial rows may retain deliberate geometry.
- Use Hast-owned colors, typography, geometry and disclosure controls. Keep other products' visual systems separate; no other design skill is required to interpret this contract.

## Product heading and container rules

- Do not add decorative eyebrows, overlines or kickers that repeat the page title or navigation context. Start with the title. Preserve meaningful account, status or scope information in an appropriate inline badge or metadata position rather than an ornamental line above the title.
- Short page, card and dialog subtitles have no trailing sentence period (`.` or `。`). Preserve internal punctuation, abbreviations, ellipses and punctuation in body paragraphs, instructions, code and stored user content. Apply this at the presentation boundary for dynamic subtitles.
- An icon-bearing dialog heading uses an icon on the left and a title/subtitle stack on the right. Do not put an icon, title and subtitle on three separate rows. Use a coherent app icon family and a flat icon container without a drop shadow; keep long headings able to wrap on narrow screens.
- Icon-only buttons have equal width and height, no text-button horizontal padding, and do not shrink in flex layouts. Match neighboring control height and retain an accessible name and visible focus.
- Interior card and dialog dividers are inset to the same horizontal gutters as adjacent content, including responsive gutters. Do not use edge-to-edge header/footer lines inside padded containers. Structural page/sidebar boundaries and table grid lines are distinct roles.

## Standalone error pages

- Full-page not-found presentations start with the main error code or title and its explanation. Omit decorative outer cards, glows, icons and repeated error eyebrows; retain recovery actions and their destinations.
- Center the error code, explanation and recovery actions as one group within the available viewport height. Use balanced padding and allow scrolling on short screens rather than fixed top offsets or clipped content.
- Recovery actions use content-sized buttons centered in a wrapping row, with readable theme-aware foreground/background pairs. Do not stretch them into equal full-width columns by default.
- Embedded unavailable states inside a document or resource section have a different role and may retain a subtle container boundary; do not remove every error notice's surface as a consequence of the full-page rule.

## Deliver and maintain

Use [verification](references/verification.md) for coverage proportional to the changed owner. Report actual changes, checked routes/states, remaining gaps, and implementation, verification and user acceptance separately.

Follow the applicable repository and local instructions for delivery. This skill defines design and verification guidance; it does not define a publication workflow.

Follow [maintenance](references/maintenance.md) when updating this package. Resolve any authoring/install mapping from the current environment; it is not part of the design contract. Do not promote unaccepted experiments into permanent rules.
