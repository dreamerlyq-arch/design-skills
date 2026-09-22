# Account surface reference

## Canonical source map

| Purpose | Source |
| --- | --- |
| Login route and state selection | `apps/web/app/login/page.tsx` |
| Focused login layout | `apps/web/app/login/layout.tsx` |
| Native session boundary | `apps/web/src/lib/native-auth.ts` |
| OAuth consent | `apps/web/app/oauth/consent/page.tsx`, `apps/web/src/lib/oauth-consent.ts` |
| Authentication actions | `apps/web/app/actions/auth.ts` |
| Redirect and input safety | `apps/web/src/lib/auth-flow.ts` |
| Email/password/OTP/Google controls | `apps/web/src/components/site/EmailLoginForm.tsx`, `apps/web/src/components/site/EmailOtpForm.tsx`, `apps/web/src/components/site/GoogleSignInForm.tsx` |
| Account presentation | `apps/web/src/styles/pages/auth.css`, `apps/web/src/styles/components/product-utility.css` |
| Profile and sessions | `apps/web/app/profile/page.tsx`, `apps/web/src/components/dashboard/ProfileForm.tsx`, `apps/web/src/components/dashboard/SessionManager.tsx`, `apps/web/src/styles/pages/settings.css` |

## Visual contract

- Account controls and state semantics use the product theme, not expressive marketing composition or compact Dashboard table density. `/login` uses the quiet public canvas while keeping the form account-focused.
- `/login` uses a focused, form-only composition on the quiet canvas; branding belongs within the chosen form composition rather than separate corner chrome. Dashboard retains its own navigation contract and authentication behavior stays intact.
- The primary task is a focused, readable form with persistent context, visible errors, reachable recovery, and a clear next action.
- The login form sits directly on the quiet canvas without a visible outer card border or contrasting panel fill. Keep emphasis on the form, its supporting copy and state feedback.
- Login help and recovery links use plain text without a persistent underline or decorative container. Their keyboard focus remains clearly visible.
- Reuse `product-field`, `product-label`, `product-control`, `Button`, and existing auth composition before adding local lookalikes.
- Focus, invalid, disabled, cooldown, submitting, and success states remain visibly distinct without relying on color alone.
- Profile and its preview share the Console header alignment, navigation, Home logo, and signed-in account menu in [Dashboard](dashboard.md). The form content may retain a narrower width.
- The signed-in Dashboard avatar uses a small light rounded square with a dark initial; see [Dashboard](dashboard.md) for dimensions and scope. Use the Profile-specific contract for its layout.

## Behavior contract

- Google OAuth, email OTP, and password sign-in remain separate supported lanes.
- Email Continue and password Sign in are full-width white primary buttons below their inputs. Google remains a full-width dark secondary button with a quiet border; retain this primary/secondary distinction between methods.
- The primary button remains available with empty fields so a submission attempt can reveal field errors. On attempted submission, show English inline required/format errors with existing product error tokens and accessible field associations; focus the first invalid field after error rendering. Suppress browser-native validation bubbles, whose language follows the browser locale.
- Clear a field's client error when it is edited and clear client errors when switching methods. Preserve server errors, submission-pending protection, resend cooldowns, and six-digit OTP auto-verification.
- When an external screenshot is supplied as an interaction reference, transfer the behavior only. Keep PubFi typography, colors, controls, error styling, and English copy unless the user explicitly requests a visual change.
- `next` values pass through `sanitizeNextPath`; visual refactors cannot bypass same-origin redirect protection.
- Keep credentials within their authorized entry/protocol handling under the [sensitive-data boundary](authority.md#sensitive-data-and-consequential-actions).
- Login errors preserve the relevant email and method when designed to do so, but never preserve the password.
- OAuth consent retains approve/deny meaning, authenticated return flow, client identity, requested scope context, and failure handling.
- Profile/session work preserves current-session distinction, grant-loading failure, revoke/sign-out confirmation, and recovery behavior.

## Responsive contract

- Forms fit the narrow viewport without horizontal scrolling or clipped helper/error text.
- Login buttons keep a 48px minimum height. Email input and Continue remain vertically stacked at desktop and mobile widths.
- The mobile keyboard, focus ring, notice text, and submit action remain simultaneously reachable; let the shell grow or scroll with its content.

## Final composition checks

- Show completion after the relevant server action succeeds and preserve the distinct recovery for OTP, password and OAuth lanes.
- Use the shared opaque input appearance with account-specific sizing and spacing.
- Keep the focused login composition and the [authority boundary](authority.md) for redirects, cookies, sessions, OAuth and credentials.
