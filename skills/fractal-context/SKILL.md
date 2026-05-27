---
name: "fractal-context"
description: "Load when Level 1/2/3 fractal header or folder-manifest semantics are unclear, especially after schema drift, code moves, or inconsistent context headers. Do not load to fill local `AGENTS.md` from code, or for repo placement or lifecycle work"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Context Protocol v2

Act as the guardian of the project's fractal semantic map. Keep file, folder, and root context aligned with the code, but keep each layer focused on current truth rather than historical logs.

## Scope Gate

**Before writing any L3 header, or normalizing an existing L2 manifest for schema semantics, check `docs/decisions/fractal-scope.md`.**

- **Not found**: This is not a fractal-repo. Only provide schema consulting. Do NOT write file headers or folder manifests.
- **Found**: Read the `## L3 File Header` and `## L2 Folder Manifest` sections. Write only when:
  - The target file path matches `include:` scope patterns
  - The target file path is NOT matched by `exclude:` patterns
  - The level is `enabled: true`

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

### Level 3: The Cell (File Contract)
**Location**: Top of a source file.
**Purpose**: Describe the file's current contract.

Required fields:
- `INPUT`: Semantic dependencies, upstream types, modules, or contracts.
- `OUTPUT`: Values, side effects, guarantees, or exported behavior.
- `ROLE`: Why this file exists in the architecture.

Optional fields:
- `INVARIANTS`: Non-obvious truths that must remain stable.
- `LOCAL_REVIEW_WHEN`: File-specific triggers that invalidate this header.

Rules:
- Never use file headers as append-only change logs.
- Never record dated history in `LOCAL_REVIEW_WHEN`.
- Shared review triggers belong in this skill's protocol, not in every file or folder artifact.
- Omit optional fields when they add no unique value.

### Level 2: The Organ (Folder Manifest)
**Location**: `AGENTS.md` inside a folder.
**Purpose**: Describe the folder's worldview and local ownership.

Required sections:
- `Scope`
- `Constraints`
- `Members`

Optional sections:
- `Docs`
- `Exceptions`

Rules:
- `Members` entries must stay at folder/domain granularity, not per-file inventory.
- Prefer subfolders, bounded contexts, or capability groups over listing every file.
- Folder manifests describe current ownership and rules, not change history.
- Do not add `Dependencies` unless a repository-specific convention explicitly requires them.
- Review triggers are defined by this skill's protocol; do not scatter `Review Triggers` sections across folder manifests.

### Level 1: The System (Root Context)
**Location**: Project root `AGENTS.md`.
**Purpose**: Describe the global map and active entry points.

Required sections:
- `Project`
- `Topology`
- `Local Maps`
- `Global Constraints`

Optional sections:
- `Active Context`

Rules:
- Keep root `AGENTS.md` short and entry-point oriented.
- Put global review logic in this skill's protocol instead of scattering local trigger sections.
- Do not duplicate detailed implementation notes here.

## Update Policy

Use these policies when updating fractal documents:

- `manual-only`: Human-authored intent or constraints; preserve unless the meaning changes.
- `replace-on-sync`: Rebuild from current code reality.
- `merge-on-sync`: Update incrementally while preserving useful existing entries.
- `append-only`: Use only for explicit exception logs or other sections that are designed for additive history.

Default policy by layer:
- Level 3 header fields: `replace-on-sync`
- Level 2 `Scope` and `Constraints`: `manual-only`
- Level 2 `Members`: `replace-on-sync`
- Level 2 `Docs`: `merge-on-sync`
- Level 2 `Exceptions`: `append-only`
- Level 1 entry-point sections: `merge-on-sync`

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
