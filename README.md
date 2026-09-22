# Design Skills

Dre's project-specific design skills for Codex. Each skill turns a maintained visual system into executable guidance for implementation and QA while preserving the target product's behavior and local technology.

## Repository structure

```text
skills/
  degov-design-system/
    SKILL.md
    agents/openai.yaml
    assets/baselines/
    references/
    scripts/check-drift.mjs
  hast-design-system/
    SKILL.md
    agents/openai.yaml
    references/
  pubfi-design-system/
    SKILL.md
    agents/openai.yaml
    references/
    scripts/check-drift.mjs
  subscan-design-system/
    SKILL.md
    agents/openai.yaml
    references/
```

Add future projects as independent folders under `skills/`. Keep shared collection documentation at the repository root and project-specific rules inside the relevant skill.

## Available skills

- `degov-design-system`: DeGov Homepage, Atlas, and Square source maps, exact product contracts, state matrix, fixed-viewport baselines, and drift checks.
- `pubfi-design-system`: PubFi marketing, Discovery, account, Dashboard, backend/API authority boundaries, responsive rules, state matrix, and drift checks.

- `hast-design-system`: Hast Site and Agent Web design contracts, app ownership, tokens, controls, responsive behavior, and visual QA.

- `subscan-design-system`: Explorer source maps, module review, amounts and identities, page composition candidates, chain-specific states, and evidence boundaries.

Each package leads with actionable design guidance, scopes product-specific exceptions, and retains explicit safeguards for consequential actions and sensitive data. Subscan visual compositions remain candidates pending design acceptance.

## Install

```sh
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dreamerlyq-arch/design-skills \
  --path skills/degov-design-system \
  --method git

python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dreamerlyq-arch/design-skills \
  --path skills/pubfi-design-system \
  --method git

python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dreamerlyq-arch/design-skills \
  --path skills/hast-design-system \
  --method git

python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dreamerlyq-arch/design-skills \
  --path skills/subscan-design-system \
  --method git
```

Installed skills become available on the next turn.

## Add another project

Create a separate `skills/<project>-design-system/` folder with its own `SKILL.md`, UI metadata, and only the references required by that project. Keep repository paths, token entry points, product exceptions, and validation requirements inside the project skill instead of turning them into collection-wide rules.
