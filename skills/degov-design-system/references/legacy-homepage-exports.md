# Legacy Homepage exports

Status: historical implementation reference; current route adoption is not established by these exports. Reclassified 2026-09-22. Read only when a target imports these components. Values below explain older consumers, not approved defaults or mandatory drift invariants for current marketing routes.

### Generic Button export

- Variants: `primary`, `secondary`, `ghost`; sizes: `lg`, `default`, `sm`.
- It is pill-shaped and uses hover scale `1.04` and active scale `0.97`.
- It currently uses the Tailwind brand-blue focus/emphasis path. Use only where the existing caller already establishes that visual language.

### Generic Card export

- The historical generic Card implementation has 20px radius, white border at `0.06`, mobile padding 20px and desktop padding 30px. This does not establish that a current marketing route imports it.
- Hover raises by 4px and strengthens the border to `0.12`.
- Preserve an active consumer’s intended geometry until its relevant design decision is established; neither this snapshot nor the 0/4px marketing tokens automatically override it.
