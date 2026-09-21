# Maintaining the Hast skill

## Locate and update the package

Resolve this package from the loaded `SKILL.md`. If the environment identifies a separate authoring source and installed copy, inspect both and the authoring worktree before editing, update the source, validate, and sync only the changed package files. Verify parity afterward. Otherwise, update the user-designated package in place; do not assume another repository or a second copy exists.

Preserve unrelated changes. A skill-only update does not require changing application source or publishing a repository.

## Keep the skill independent

- Store reusable design rules, relative source ownership and verification methods. Do not store PR numbers, commit snapshots, merge states, historical check results or task progress. Using the skill must not require previous conversations or external history.
- Keep personal paths, browser preferences, artifact-directory mappings and publication workflows in environment configuration or applicable local instructions. Do not duplicate them here.
- State Hast's rules directly rather than referring to another project's conventions or an unnamed reference skill.
- Check source pointers against the target checkout when maintaining them. A moved file requires updating its pointer, not inventing a new design rule.
- Separate accepted design intent from current implementation. Passing checks or a changed reference page do not establish visual acceptance; keep experiments in their task until accepted.
- Generalize lessons by their mechanism and scope. Do not turn one copy edit, viewport adjustment or backend fix into a universal design prescription.
- Keep detailed API, cache and service behavior with the owning code, tests or project documentation. This skill covers their visible UI states and ownership boundary.
- Reference images must have an explicit purpose and acceptance status. A screenshot taken during a task is evidence for that state, not automatically a reusable baseline.

## Validation

The package is Markdown guidance with interface metadata; using it requires no auxiliary executable or third-party Python package.

For an update, verify:

1. `SKILL.md` retains valid YAML frontmatter with a matching name and an accurate description; interface metadata matches its scope.
2. Every relative reference resolves inside the package, and changed repository pointers resolve in the target checkout.
3. There are no personal absolute paths, required external skill/tool references, historical task identifiers or unresolved placeholders.
4. Rules distinguish shared roles from page-specific exceptions and do not rely on reading a previous task.
5. If separately installed, the changed source and installed files match.

An available skill validator can supplement these checks; discover it through the current environment instead of hard-coding its location. It is not a prerequisite for using this skill. Skill-only changes do not need an application build or browser screenshots.

For substantial routing or authority changes, reason through representative scenarios without mutating products: a local FDE spacing fix, a shared Site theme audit, a GTM application input fix, a FAQ implementation that differs from the contract, and a skill-only refresh in a different checkout. Each should select the correct owner, preserve scope and distinguish implementation from acceptance.
