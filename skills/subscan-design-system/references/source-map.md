# Source map

All paths below are relative to the subscan-ui-next checkout. Verified against PR #2259 head `700532ecb38e8e2b222060c9cbfda9f55e4a1df8` on 2026-09-23. Re-resolve moved owners on later revisions.

## Surface and composition owners

| Concern | Source | How to use |
|---|---|---|
| Explorer routes and chain theme | `src/pages`, `src/pages/layout.tsx` | Follow route imports and chain gates; a route count is not a count of templates or supported chains |
| Global theme and utility definitions | `src/styles/globals.css`, `tailwind.config.js` | Inspect semantic tokens, fonts, breakpoints and light/dark mappings before local overrides |
| Page gutters / max width | `src/ui/Layout/PageContent.tsx`, `src/ui/Layout/Container.tsx` | Existing composition uses 15px / md 100px side gutters and 2xl max-width 1400px; reuse implementation rather than copying constants |
| Module shell | `src/ui/Box/Boundary.tsx` | Existing 20px radius, semantic surface/border/shadow, 15px / lg 20px inset; group related fields within a logical module |
| Module title | `src/components/ModuleHeader/ModuleHeader.tsx` | Select mini/hideBorder/full variant for the actual hierarchy |
| Text | `src/ui/Text/Text.tsx` | Default 14px and inline; small 12px; use explicit block/stack where separation is intended |
| Amount and entity | `src/components/Balance/Balance.tsx`, `src/components/Identicon/Identicon.tsx` | Inspect actual props, decimals, unit handling, truncation and copy/link behavior |
| Lists and fields | `src/ui/Table`, `src/ui/Table/TableCol.tsx` | Distinguish wide data table from label/value detail layout |
| Selects and menus | `src/ui/Select/Select.tsx`, `src/ui/Menu/Menu.tsx` | Inspect trigger and option typography, selected/hover states, anchoring and viewport collision behavior |
| Popovers and dialogs | `src/ui/Popover`, `src/components/DialogLayout/FilterDialog.tsx` | Reuse shared surface tokens; size and place overlays for their content and available viewport |
| Tabs | `src/ui/index.ts`, `src/ui/Tabs/client/Tab.tsx`, `src/ui/Tabs/index.ts` | Public client exports and server exports differ; resolve the actual public export before reuse |
| Pagination | `src/ui/Pagination/Pagination.tsx` | Match API capabilities, total and URL behavior before replacing a custom pager |
| Controls | `src/ui/Button/Button.tsx`, `src/ui/Input/Input.tsx`, `src/components/DialogLayout/FilterDialog.tsx` | Check composed labeling, states and focus rather than only appearance |

The other surface roots are `src/www-pages` with `src/www-pages/layout.tsx`, and `src/portfolio-pages` with `src/portfolio-pages/layout.tsx`. Verify their current compositions before work on either surface. Explorer evidence does not establish their typography, navigation or card rules. Backend-only work is outside this skill.

## Useful analogue modules

- Account composition: `src/components/Pages/Blockchain/AccountCard/AccountCard.tsx`, `src/components/Pages/Blockchain/AccountTokensList/AccountTokensList.tsx`. Inspect chain-conditional imports; one account never exercises all account modules.
- Data fetching and paging: `src/components/Pages/Staking/ValidatorList/ValidatorListClientWithPagination.tsx`, `src/components/Pages/Staking/NominationPoolMembers/NominationPoolMembersClient.tsx`.
- Governance summary: `src/components/Governance/ReferendaV2Info/ReferendaV2Info.tsx`; long prose: `src/components/Markdown/Markdown.tsx`. They need different content widths and narrow-screen behavior.
- Tool form: `src/pages/tools/format_transform.tsx`. Useful input/output structure, but known feedback and labeling defects make it unsuitable for unqualified copying.
- PR #2259 domain: `src/components/Pages/DappStaking`, `src/pages/dapp_staking`. Its account panel is an addition within an existing route, not a new account page.

Follow re-exports, aliases, shared owners, conditional feature/chain gates, and injected LowCode/OpenSlot content. Inventory tooling may count files or direct imports; state the inventory depth and verify chain support through its actual gates.
