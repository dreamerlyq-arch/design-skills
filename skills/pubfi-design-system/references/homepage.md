# Homepage composition and review rules

Read with [Marketing](marketing.md) when changing homepage composition, entry cards, or agent menus. These are scoped constraints; source changes still need the requested visual review.

## Homepage composition contract

Apply these rules to the homepage families described below; other surfaces use their own composition reference.

- The homepage starting module has one production composition: two equal-height gradient cards, with the API-access card narrower on the left (`0.72fr`) and Discovery wider on the right (`1.28fr`) at desktop widths. Stack the same cards in that order on mobile; keep comparison variants in temporary previews.
- Label the starting module with action-oriented wording such as `Get started`, not selection-oriented `Choose ...` copy.
- The API path's three-step frame uses equal cells with each number-and-label group centered within its cell. Keep the numbering because it communicates a real order.
- At intermediate desktop widths, the hero must switch layout before the data-field artwork collides with the heading, body copy, or buttons.
- On mobile, the hero's paired media/story order is artwork first, then text and actions.
- The homepage Discovery source table has no resting background fill; preserve its outer outline, row dividers, content, and interactive states. Category chips keep a subtle neutral fill without a border in resting or hover states, and retain visible keyboard focus. These choices do not remove borders or backgrounds from unrelated tables or tags.
- Disable the Discovery input-flow node decoration/animation on mobile; the text and real input remain.
- Mobile trust metrics use two equal, left-aligned columns. The partner-logo group is a single row, scaled to fit rather than wrapped.
- A line treatment applied to a multiline CTA must follow each rendered line or the intended phrase; align decoration with the actual line boxes.
- Keep marketing action labels on one line when adding an icon. Grow the control or reflow the surrounding layout to preserve legibility.
- The homepage AI-agent menu opens above its trigger in the entry-path composition and stays scrollable within the viewport.
- Keep the AI-agent menu as a concise action list: no redundant panel heading/subtitle, no extra subtitle under the copy row, and no `One-click` claim before an integration is live. Unavailable install targets use an honest disabled or coming-soon state.
- Marketing menus and search-result panels share the same dark panel, quiet white outline, compact radius, and restrained shadow treatment. Keep their overlay layer above neighboring sections.
- When a menu or result panel is clipped, inspect the nearest ancestor overflow and sibling stacking context as well as the panel z-index; the open owner section must rise above adjacent sections without changing document flow.
- In agent-tool menus, use the real brand mark for named tools and a semantic icon for generic actions such as copy or manual setup. Render the real marks and semantic icons directly, with consistent sizing.
- Within one repeated marketing-card family, source semantic icons from one consistent open-source set. Keep real brand marks, but size them optically rather than forcing identical numeric dimensions when their internal whitespace or silhouette differs.

These are active implementation constraints, not proof that a current working tree is an accepted baseline. Validate them in the actual viewport before refreshing baseline evidence.
