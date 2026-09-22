# Error presentations

Use for Hast error UI only. Full-page and embedded errors have different scope; retain the owning app’s recovery behavior and controls.

## Standalone and embedded errors

- Full-page not-found presentations start with the main error code or title and its explanation. Omit decorative outer cards, glows, icons and repeated error eyebrows; retain recovery actions and their destinations.
- Center the error code, explanation and recovery actions as one group within the available viewport height. Use balanced padding and allow scrolling on short screens rather than fixed top offsets or clipped content.
- Recovery actions use content-sized buttons centered in a wrapping row, with readable theme-aware foreground/background pairs.
- Embedded unavailable states inside a document or resource section have a different role and may retain a subtle container boundary; select its boundary according to the embedded context.
