---
name: "fractal-scope"
description: "Load when checking or changing this project's fractal scope config, or explaining which L2/L3 writes are enabled. Do not load for generic YAML inspection, first-time fractal setup, or repo-local source maintenance."
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Scope

Manage this project's scope gate configuration and deterministic matcher. This skill is project-local and is initialized by `fractal-setup` at `.agents/skills/fractal-scope/`.

## Configuration model

`config.yaml` is the source of truth for:

- `l3_file_header`
- `l2_folder_manifest`
- `spec_output.mode`

Default configuration is conservative: L3 and L2 are disabled, and spec output uses `ask` mode.

## Workflow

1. Confirm `<skill-root>/config.yaml` exists. If the runtime package is incomplete, stop and ask the user to repair it with `fractal-setup`.
2. Read the config before making scope decisions or edits.
3. Run the local checker for every affected path:

   ```bash
   node .agents/skills/fractal-scope/scripts/check-scope.js --config .agents/skills/fractal-scope/config.yaml --root . --path <target-path>
   ```

4. When changing scope, preserve unrelated configuration and verify representative included and excluded paths.
5. Report each result as `matched`, `excluded`, `disabled`, or `no-match`.

## Support files

- `scripts/check-scope.js` — config reader and matcher
- `scripts/check-scope.test.js` — minimal matcher self-test
- `references/scope-matching.md` — exact matching semantics and edge cases
- `assets/quick-checks.md` — command snippets and example outputs

## Gotchas

- Excludes win when include and exclude patterns both match.
- Keep `config.yaml` independent from `SKILL.md`; it is project-owned data.
- Do not reimplement matching rules in downstream skills.
- Do not write root `AGENTS.md` from this skill.
