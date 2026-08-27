# Real-page visual baselines

Captured 2026-08-27. These images are acceptance aids, not a replacement for current source or a license to copy page content into another product.

| Product | Route/source | Desktop | Mobile |
| --- | --- | --- | --- |
| Homepage | local `http://127.0.0.1:3001/`, commit in `homepage.md` | `assets/baselines/homepage-desktop-1440x1000.png` | `assets/baselines/homepage-mobile-390x844.png` |
| Atlas | canonical `https://atlas.degov.ai/daos`; local source commit in `atlas.md` | `assets/baselines/atlas-desktop-1440x1000.png` | `assets/baselines/atlas-mobile-390x844.png` |
| Square | local `http://127.0.0.1:3002/`, commit in `square.md` | `assets/baselines/square-desktop-1440x1000.png` | `assets/baselines/square-mobile-390x844.png` |

Atlas's local route was not accepted as a visual baseline because it rendered the explicit missing-`ATLAS_API_BASE_URL` error boundary. Re-capture Atlas locally only with a legitimate backend configuration; do not add frontend mock data solely to make a screenshot.

## Comparison method

1. Open the same route and exact viewport.
2. Compare shell, page width, heading wrap, primary action hierarchy, surface levels, control density, row/card transformation, sticky/fixed elements, and visible first-fold content.
3. Treat dynamic DAO counts, dates, images, and copy changes as data differences unless they alter layout.
4. Investigate a visual mismatch in current source before updating the baseline.
5. Update the baseline only after the changed design is accepted, then refresh its SHA-256 in `references/source-manifest.json`.

## Refresh requirements

- Use the current product checkout and record its full commit hash.
- Capture PNG at 1440×1000 and 390×844.
- Hide browser/dev-tool chrome and transient issue badges; do not alter product layout or content for the capture.
- Verify the final file dimensions and visually inspect all six images.
- Run `node scripts/check-drift.mjs --strict-head` after updating product refs, manifest commits, and hashes together.
