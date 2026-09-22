# PubFi required state matrix

This is a review contract. Apply the relevant rows and record evidence for each state actually exercised. Use the route-local owner named in the target surface reference.

| Pattern | Required states | Acceptance evidence |
| --- | --- | --- |
| Button/action | default, hover, pressed, keyboard focus, disabled; loading when async; destructive when consequential | Stable label and icon order, visible focus, no duplicate submit, disabled cannot fire, semantic action hierarchy |
| Text input/textarea | empty, filled, placeholder, hover, focus, disabled, invalid, helper/error text, autofill where relevant | Persistent context, semantic error linkage, no hidden message or responsive collision |
| Form validation | empty/format-invalid submit by click and Enter, repeated attempt, multiple errors, edit a later field, method/operation switch, required agreement unchecked | Follow the [form validation contract](design-contract.md#form-validation); English inline feedback, constraints still block submission, first invalid field focused, editing does not steal focus, help/server errors preserved |
| Select/menu | closed, open, option hover/focus, selected, disabled, long label, viewport edge | Keyboard traversal, Escape close, focus return, selected indicator, panel remains on screen |
| Search | idle, typing/debounce, loading, results, no results, request error, cleared query, keyboard selection | Query stays visible; no-results differs from error; result links and analytics stay correct |
| Navigation | default, hover, current route, keyboard focus, mobile open/close, sticky scroll | Stable current state, correct destinations, `aria-current`, no hidden focus under header, focus/body-scroll behavior preserved |
| Marketing motion | initial, playing, interrupted/re-entered, offscreen, reduced motion, mobile fallback | No layout shift, cyan state is consistent in/out, cleanup works, fallback preserves meaning |
| Async/streamed region | initial shell, loading, partial/late resolution, success, unavailable/error, revalidation, reduced motion, desktop/mobile | Follow the [async structure contract](design-contract.md#async-and-streamed-regions); verify known geometry, natural content growth, motion scope and truthful data states |
| Image/artwork | loading, loaded, missing/failure, intermediate desktop, mobile order | No copy collision, stable geometry, useful alt/fallback, accepted image/text order |
| Card/panel | default, interactive hover/focus when actionable, long copy, compact/mobile padding | Content grows vertically; hierarchy uses owner tokens; no fixed-height text collision |
| Directory/filter | default, filter selected, live-only, zero results, pagination, mobile filter modal, cleared filters | Checked-in and live evidence remain distinct; selected filters persist; ordinary crawlable links remain |
| Live authority region | ready, blocked, not present, Registry unavailable, malformed/failed-closed, stale/unknown | No success from unknown data; owner and recovery/evidence context remain explicit |
| Status region | healthy, degraded, unknown, unverified, unavailable versus zero, partial/future history, long evidence table | Health is not availability; missing is not zero or success; future is not evidence |
| Auth form | Google, email OTP request, cooldown, OTP verify, password, submitting, lane-specific error, callback error | Safe redirect preserved, no credential leakage, relevant recovery stays visible |
| OAuth consent | unauthenticated redirect, loaded request, approve pending/failure, deny pending/failure, invalid/expired request | Client/scope/decision meaning stays intact; no false completion |
| Public/global error | HTML 404, Markdown/HEAD 404, route 500, global 500, retry, recovery links, intermediate/mobile layout, reduced motion | Correct status and representation; shared owner and copy; no raw error details; safe recovery; visible focus and touch-safe targets |
| API key | list loading/empty/error, permission denial, create pending/success/failure, one-time secret, copy success/failure, acknowledgement, revoke/delete | Secret never reappears or leaks; completion gate follows real acknowledgement; duplicate actions blocked |
| Billing/payment | account unavailable, offers loading/error, amount invalid, pending, success, recovery/incomplete, permission denied | Price/account/capacity remain accurate; idempotency and recovery context preserved |
| Dialog/drawer | closed, opening, open, validation/error, submitting, success/close, Escape, overlay policy, mobile fit | Focus enters and returns, background is blocked, close is named, all content/actions reachable |
| Table/list | default row, hover/focus, empty, loading, error, long text, local overflow, mobile transform | Dense hierarchy remains readable; document has no horizontal overflow |

## Review rules

- For functional interfaces, apply the [non-marketing checks](non-marketing.md#responsive-checks-and-common-failure-mechanisms) to the affected patterns across page families.
- Inspect a caller that already exercises the state before extending a primitive.
- Report relevant unverified or intentionally unsupported states; omit states unrelated to the change.
- Label fixture/source evidence separately from actual live outcomes.
- Verify the actual layout at the risk viewport for responsive acceptance.
