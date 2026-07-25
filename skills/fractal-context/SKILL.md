---
name: "fractal-context"
description: "Load when Level 1/2/3 fractal header or folder-manifest semantics are unclear, especially after schema drift, code moves, or inconsistent context headers. Do not load to fill local `AGENTS.md` from code, or for repo placement or lifecycle work"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Context Protocol v2

Act as the guardian of the project's fractal semantic map. Keep file, folder, and root context aligned with the code, but keep each layer focused on current truth rather than historical logs.

## Scope Gate

**Before writing any L3 header, or normalizing an existing L2 manifest for schema semantics, run the project-local scope checker.**

Use the consuming project's local checker:

```bash
node .agents/skills/fractal-scope/scripts/check-scope.js --config .agents/skills/fractal-scope/config.yaml --root . --path <target-path>
```

- **Config missing**: This is not a writable fractal-repo. Only provide schema consulting. Do NOT write file headers or folder manifests.
- **Checker missing**: The project-local runtime is incomplete. Stop and repair it with `fractal-setup`.
- **L3 writes**: proceed only when `l3_file_header.status` is `matched`.
- **L2 manifest normalization**: proceed only when `l2_folder_manifest.status` is `matched`.

L3 (source file headers) and L2 (folder AGENTS.md) are independently configured — one can be on, one off.

This skill does not infer a missing or stale directory contract from code. Use `fractal-agents-fill` for that action, and use this skill only when the Level 2 schema meaning itself is in question.

## Core Contract

- Define the canonical schema for Level 3, Level 2, and Level 1 fractal context.
- Keep current-state documentation separate from history, changelogs, and postmortems.
- Propagate semantic changes upward only when the owning layer's contract actually changes.
- Use language templates only as syntax renderers; they MUST NOT rename fields or alter semantics.

## Boundaries

- This skill defines the semantic meaning of fractal headers and manifests.
- `fractal-agents-fill` owns creating or refreshing local folder `AGENTS.md` content from code and nearby docs.
- `fractal-repo` owns documentation topology, frontmatter, lifecycle, and repository-level doc maintenance.
- If a repository uses both skills, this skill is the canonical source for Level 1/2/3 schema.

For the full authority split across all fractal skills, see `fractal-repo`'s `references/skill-authority-map.md`.

Read these references when needed:
- `references/protocol/level3.md` for file contract rules.
- `references/protocol/level2.md` for folder manifest rules.
- `references/protocol/level1.md` for root context rules.
- `references/templates/{lang}.md` for syntax-specific header rendering.
- `assets/ripple-normalization-checklist.md` for a fast schema-vs-fill triage pass.

## Canonical Schema

The canonical schema lives in `references/protocol/`:

- `level3.md` — file contract fields and header rules
- `level2.md` — folder manifest sections and update policies
- `level1.md` — root context sections and navigation rules

Do not duplicate schema definitions in this root file. If field meaning changes, update the protocol reference first.

## Ripple Check

Whenever you touch code:

1. Update the code.
2. Re-check the file's Level 3 contract if `INPUT`, `OUTPUT`, or `ROLE` changed.
3. If ownership, constraints, or domain boundaries changed, the local contract needs updating — that is local contract capture work, not schema semantics. Only if the manifest's section structure or field meaning is wrong, normalize it here.
4. Do NOT write or update root `AGENTS.md` — coding agents manage their own initialization.
5. Move historical detail into repository docs, not file or folder current-state sections.

## Auto-Correction

- If a file header uses legacy `UPDATE` log lines, convert them into current-state fields and remove the historical log behavior.
- If a folder manifest exists but uses ad hoc sections, normalize it to Level 2 only when the content truth is already clear.
- If a folder lacks `AGENTS.md`, this is a local contract capture task — `fractal-context` is not the right skill for filling missing manifests. Only write if the user explicitly asked for a schema-only skeleton.
- If a language template conflicts with the canonical field names, normalize the template to the canonical schema first.
