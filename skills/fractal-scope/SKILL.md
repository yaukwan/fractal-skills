---
name: "fractal-scope"
description: "Load when bootstrapping or refreshing a consuming project's `.agents/skills/fractal-scope/` project skill and adjacent `config.yaml`, or checking scope matches against that config. Do not load for generic YAML inspection, repo-local source maintenance, or general doc placement."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Scope

Manage the scope gate config and packaged checker used by downstream fractal skills.

## Output location

- Runtime marker skill: `<project-root>/.agents/skills/fractal-scope/SKILL.md`
- Config: `<project-root>/.agents/skills/fractal-scope/config.yaml`
- Packaged checker: `<skill-root>/scripts/check-scope.js`

## Configuration model

`config.yaml` stays separate and is the source of truth for:

- `l3_file_header`
- `l2_folder_manifest`
- `spec_output.mode`

Default config is conservative:

- L3 off
- L2 off
- spec output: `ask`

## Quick scope checks

Use `<skill-root>/scripts/check-scope.js` to read a `config.yaml` and report exact matches.

- `node <skill-root>/scripts/check-scope.js`
- `node <skill-root>/scripts/check-scope.js --path docs/guide.md`
- `node <skill-root>/scripts/check-scope.js --path docs/guide.md --path src/lib.rs --json`
- `node <skill-root>/scripts/check-scope.js --config /tmp/project/.agents/skills/fractal-scope/config.yaml --root /tmp/project --path docs/guide.md`

The checker reports, per level:

- `matched`
- `excluded`
- `disabled`
- `no-match`

`<skill-root>` is the directory that contains this `SKILL.md`.

## Support files

- `<skill-root>/scripts/check-scope.js` — config reader and matcher helper.
- `<skill-root>/references/scope-matching.md` — exact matching semantics and edge cases.
- `<skill-root>/assets/quick-checks.md` — command snippets and example outputs.

## Workflow

1. Confirm the target project root.
2. Create `.agents/skills/fractal-scope/` if it does not exist.
3. Write or refresh the minimal runtime `SKILL.md`.
4. Write or refresh `config.yaml` from the packaged defaults.
5. Do not copy `scripts/check-scope.js` into the consuming repository.
6. Leave repo-local source files untouched.

## Gotchas

- Do not conflate the source repo's `skills/fractal-scope/` package with the consuming project's `.agents/skills/fractal-scope/` runtime path.
- Keep the config file independent.
- Behavior lives in the packaged skill; consuming repos own data only.
- Do not write root `AGENTS.md` from this skill.
