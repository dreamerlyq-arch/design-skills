# Required state matrix

This matrix is a review contract. Apply only rows relevant to the feature, but never treat the default screenshot as evidence for an untested state. Use the product-local implementation named in the product reference.

| Pattern | Required states | Acceptance evidence |
| --- | --- | --- |
| Button/action | default, hover, active/pressed, keyboard focus, disabled; loading when async; destructive when consequential | Label remains stable, focus is visible, disabled cannot fire, loading prevents duplicate submission |
| Text input/textarea | empty, filled, placeholder, hover, focus, disabled, invalid, helper/error text | Persistent label, semantic error linkage, no layout jump that hides the message |
| Select/menu | closed, open, hover/focus option, selected, disabled trigger/item, long label, viewport edge | Keyboard traversal, Escape close, focus return, selected indicator, portal stays on screen |
| Search | idle, typing/debounce, loading, results, no results, request error, cleared query | Query stays visible, no-results differs from error, result navigation remains product-local |
| Badge/Tag/StatePill | neutral metadata and every semantic status in scope | Status meaning does not rely only on product accent or color |
| Image/avatar | loading, loaded, missing source, remote failure, long accessible name | No broken-image browser UI, size and layout remain stable |
| Tooltip | pointer hover, keyboard focus, leave/blur, disabled/empty content, edge placement | Not the sole label for primary tasks; trigger relationship is announced |
| Table/list | default row, hover, keyboard/link focus, selected/favorited, empty, loading, error, long text, local overflow | Dense desktop hierarchy preserved; mobile transforms intentionally; document has no horizontal overflow |
| Card/Panel | default, interactive hover/focus when actionable, compact/mobile padding, nested list/table | Neutral surface and border; 24px desktop / 16px compact unless product reference records an exception |
| Dialog/Drawer | closed, opening, open, validation/error, submitting, success/close, Escape, overlay click policy, mobile fit | Focus enters and returns, background is inert/blocked, close is named, content remains reachable |
| Page/data region | initial loading, partial/degraded data, empty, fatal error, retry/recovery, refreshed data | Loading geometry is stable; empty explains absence; error names recovery; existing query/context is retained |
| Navigation | default, hover, current route, keyboard focus, mobile open/close | `aria-current` or equivalent is stable; route destinations and information architecture do not change |
| Motion | normal, interrupted/re-entered, reduced motion | No layout shift, cleanup on unmount, reduced-motion path preserves meaning |

## Product-specific state owners

- Homepage: current page client and `SiteHeader` own navigation/menu/motion state; `accordion.tsx`, `LazyImage.tsx`, and route CSS own their respective states.
- Atlas: `DaoSearch`, `AtlasSelect`, `AtlasTooltip`, `StatePill`, `LoadingSkeleton`, `EmptyState`, `ErrorState`, and `EventDetailPanel` are canonical owners.
- Square: Radix UI primitives, Form primitives, `LoadedButton`, `Skeleton`, `Empty`, `ImageWithFallback`, wallet/notification/favorite components, and route clients are canonical owners.

## Do/don't

- Do inspect a caller that already exercises the state before extending a primitive.
- Do use semantic status color and text/icon labels together when ambiguity is possible.
- Do record intentionally unsupported states in the final QA report.
- Don't invent a disabled, error, or mobile pattern from another DeGov product.
- Don't claim state coverage from static source alone when the interaction can be exercised locally.
