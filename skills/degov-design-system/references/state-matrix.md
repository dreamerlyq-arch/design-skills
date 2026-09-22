# State coverage by changed pattern

Use applicable rows for new UI or affected behavior. For a narrow visual change, test states that can be affected; for a shared primitive, check all affected rendered variants and callers. This matrix does not require inventing states or adding functionality that the product does not support. A default screenshot is not evidence for another state.

| Pattern | Required states | Acceptance evidence |
| --- | --- | --- |
| Button/action | default, hover, active/pressed, keyboard focus, disabled; loading when async; destructive when that variant is in scope | Label remains stable, focus is visible, disabled cannot fire, loading prevents duplicate submission |
| Text input/textarea | empty, filled, placeholder, hover, focus, disabled, invalid, helper/error text | Persistent accessible name and existing visible form label, semantic error linkage, no layout jump that hides the message |
| Select/menu | closed, open, hover/focus option, selected, disabled trigger/item, long label, viewport edge | Keyboard traversal, Escape close, focus return, selected indicator, portal stays on screen |
| Search | idle, typing/debounce, loading, results, no results, request error, cleared query | Query stays visible, no-results differs from error, result navigation remains product-local |
| Badge/Tag/StatePill | neutral metadata and every semantic status in scope | Status meaning does not rely only on product accent or color |
| Image/avatar | loading, loaded, missing source, remote failure, long accessible name | No broken-image browser UI, size and layout remain stable |
| Tooltip | pointer hover, keyboard focus, leave/blur, disabled/empty content, edge placement | Not the sole label for primary tasks; trigger relationship is announced |
| Table/list | default row, hover, keyboard/link focus, selected/favorited, empty, loading, error, long text, local overflow | Dense desktop hierarchy preserved; mobile transforms intentionally; document has no horizontal overflow |
| Card/Panel | default, interactive hover/focus when actionable, compact/mobile padding, nested list/table | Neutral structure; product-local padding/radius tokens and documented exceptions |
| Dialog/Drawer | closed, opening, open, validation/error, submitting, success/close, Escape, overlay click policy, mobile fit | Focus enters and returns, background is inert/blocked, close is named, content remains reachable |
| Page/data region | initial loading, partial/degraded data, empty, fatal error, retry/recovery, refreshed data | Loading geometry is stable; empty explains absence; error names recovery; existing query/context is retained |
| Navigation | default, hover, current route, keyboard focus, mobile open/close | `aria-current` or equivalent is stable; route destinations and information architecture do not change |
| Motion | normal, interrupted/re-entered, client navigation, reduced motion | Content becomes visible after mount/navigation, cleanup on unmount, reduced-motion path preserves meaning |

## Product-specific state owners

- Homepage: current page client and `SiteHeader` own navigation/menu/motion state; `accordion.tsx`, `LazyImage.tsx`, and route CSS own their respective states.
- Atlas: `DaoSearch`, `AtlasSelect`, `AtlasTooltip`, `StatePill`, `LoadingSkeleton`, `EmptyState`, `ErrorState`, and `EventDetailPanel` are canonical owners.
- Square: Radix UI primitives, Form primitives, `LoadedButton`, `Skeleton`, `Empty`, `ImageWithFallback`, wallet/notification/favorite components, and route clients are canonical owners.

## Do/don't

- Do inspect a caller that already exercises the state before extending a primitive.
- Do use semantic status color and text/icon labels together when ambiguity is possible.
- Report applicable unavailable or unverified states; keep the coverage summary focused on the task.
- Don't invent a disabled, error, or mobile pattern from another DeGov product.
- Don't claim state coverage from static source alone when the interaction can be exercised locally.

## Module scope and adoption

For a change review, distinguish new routes, new modules inside existing routes, shared-owner changes and navigation entries. Report unique root causes separately from affected routes; compare the base before attributing an old host-page defect to a new module. Check real imports, custom/native counterparts and local overrides before calling a shared-component migration complete. Scale this inventory to the affected scope, not automatically to the whole product.
