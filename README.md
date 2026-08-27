# Design Skills

Dre's project-specific design skills for Codex. Each skill turns a maintained visual system into executable guidance for implementation and QA while preserving the target product's behavior and local technology.

## Repository structure

```text
skills/
  degov-design-system/
    SKILL.md
    agents/openai.yaml
    references/
```

Add future projects as independent folders under `skills/`. Keep shared collection documentation at the repository root and project-specific rules inside the relevant skill.

## Available skills

- `degov-design-system`: DeGov Homepage, Atlas, and Square design contract and implementation routing.

## Install

```sh
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo dreamerlyq-arch/design-skills \
  --path skills/degov-design-system \
  --method git
```

Installed skills become available on the next turn.

## Add another project

Create a separate `skills/<project>-design-system/` folder with its own `SKILL.md`, UI metadata, and only the references required by that project. Keep repository paths, token entry points, product exceptions, and validation requirements inside the project skill instead of turning them into collection-wide rules.
