# Public and global error-state reference

## Canonical source map

| Purpose | Source |
| --- | --- |
| Shared error copy and recovery links | `apps/web/src/data/site-content.ts` |
| Standalone negotiated public 404 | `apps/web/src/lib/public-not-found-response.ts`, `apps/web/src/lib/public-not-found.test.ts` |
| Shared route/global 500 screen | `apps/web/src/components/site/ServerErrorScreen.tsx`, `apps/web/src/components/site/ServerErrorScreen.module.css` |
| Route and root error boundaries | `apps/web/app/error.tsx`, `apps/web/app/global-error.tsx` |
| Review route | `apps/web/app/500-preview/page.tsx` |
| Shared ownership contract | `apps/web/src/components/site/ServerErrorScreen.contract.test.ts` |

## Visual contract

- Public 404 and route/global 500 states form one restrained recovery family on the marketing black canvas. Map their roles to shared marketing tokens rather than copying a parallel palette.
- Use a logo-only header, then a desktop two-column composition: the status code and its short label on the left, and the explanation, primary recovery action, and verified recovery links on the right.
- Keep the code-label pairs explicit: `404` with `Not found`, and `500` with `Server error`.
- Preserve one clear primary action and quiet row-style recovery links. Focus, hover, pressed, and touch targets remain visible and reachable.
- Focus the composition on the status code, explanation and recovery actions; use spacing and alignment to establish hierarchy.

## Behavior contract

- The standalone unknown-public-path response retains status 404, cache-safe HTML/Markdown negotiation, HEAD behavior, and verified public destinations. Styling cannot replace or bypass that response owner.
- Route and root 500 boundaries render the shared `ServerErrorScreen`. Retry invokes the recovery callback supplied by the boundary; show success only after that recovery completes.
- Write bounded, user-safe error copy under the [sensitive-data boundary](authority.md#sensitive-data-and-consequential-actions); provide only the context needed for recovery.
- Preview routes are review fixtures, not live failure evidence. Keep them out of indexing and validate the owning production boundary separately.

## Responsive contract

- Preserve the two-column hierarchy while it fits, then stack before the code, label, copy, or actions collide. Keep titles wrapped at natural phrase boundaries.
- On narrow screens, keep the code and label readable without creating horizontal document overflow; recovery actions remain touch-safe and in the same semantic order.
- Reduced motion keeps all content immediately visible and preserves direct interaction-state feedback.

## Final composition checks

Use one restrained 404/500 recovery family with its logo-only header and shared error owner across route, root and preview variants. Validate recovery through the actual callback and runtime result; preview captures establish only the rendered state.
