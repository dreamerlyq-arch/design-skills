# Visual comparison evidence

The six stored PNGs were captured on 2026-08-27. They cover the recorded Homepage `/`, Atlas `/daos`, and Square `/` compositions, not whole-product state or behavior acceptance. Keep source observations and image captures separate in `source-manifest.json`.

| Product | Route/source | Desktop | Mobile |
| --- | --- | --- | --- |
| Homepage | local `http://127.0.0.1:3001/` | `assets/baselines/homepage-desktop-1440x1000.png` | `assets/baselines/homepage-mobile-390x844.png` |
| Atlas | production `https://atlas.degov.ai/daos` | `assets/baselines/atlas-desktop-1440x1000.png` | `assets/baselines/atlas-mobile-390x844.png` |
| Square | local `http://127.0.0.1:3002/` | `assets/baselines/square-desktop-1440x1000.png` | `assets/baselines/square-mobile-390x844.png` |

The original Homepage/Square records associate captures with their local source commits but do not record working-tree cleanliness. Atlas's deployed commit is unknown; the `atlas` product's observed local commit does not identify the source that rendered its production screenshots. Detailed theme, account, and interaction-state metadata was not recorded. Do not fill those gaps by inference or by copying today's checkout state.

Historical ports do not identify today's server. Confirm the running process, checkout, target route, data source, and visible state before comparing. Atlas's local capture was blocked by missing `ATLAS_API_BASE_URL`; follow [atlas.md](atlas.md) when the runtime is unavailable. A missing-API error page or fixture capture is not live-data acceptance.

A missing image or incomplete capture metadata does not block an authorized local fix. Inspect the current target before and after the change against the applicable accepted product contract, keeping new captures as comparison evidence. Retain unknown historical metadata and do not claim exact baseline or source fidelity where it cannot be established. Ask for a design decision only when that uncertainty leaves a material choice unresolved; do not recapture unrelated routes to close the gap.

## Comparison method

1. Use the requested viewport; when comparing a stored image, open its route at the exact recorded dimensions. For new responsive review without a specified viewport, 1440×1000 and 390×844 are defaults, not universal acceptance sizes. `/deck` follows the presentation canvas in [homepage.md](homepage.md).
2. Compare shell, page width, heading wrap, primary action hierarchy, surface levels, control density, row/card transformation, sticky/fixed elements, and visible first-fold content.
3. Treat dynamic DAO counts, dates, images, and copy changes as data differences unless they alter layout.
4. Check theme, data, account state, source/diff, and actual CSS/component owners before treating a mismatch as design drift. Inspect the target page even when no stored screenshot covers it.
5. Keep new candidates separate until accepted. Only then replace the affected capture and refresh its hash and provenance; never refresh a baseline just to make a check pass.

## Refresh requirements

- Refresh only the requested/changed route, state, theme, and viewports. Updating one product does not require recapturing all six images.
- Record product, capture date, URL/route, source kind (local/production/fixture), full source/deployed commit if known, working-tree condition, viewport, theme, relevant account/data/state, dimensions, and SHA-256. Use `null` or an explicit unknown note where provenance is unavailable. A source snapshot update does not update image provenance.
- Capture the agreed viewport with content unaltered. Keep temporary candidates under `~/Library/Caches/Codex/degov/` or system temp; `assets/baselines/` holds the accepted retained evidence.
- Verify dimensions and visually inspect each changed image. Exercise relevant interactions separately; a PNG does not verify them.
- Run `node scripts/check-drift.mjs --product <product>`. Add `--strict-head` only when deliberately refreshing the corresponding source observation; a screenshot refresh alone does not justify changing its observed commit.
