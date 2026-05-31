---
name: "fractal-repo"
description: "Load when repository-level fractal docs need placement, naming, frontmatter, indexing, or archive/lifecycle handling. Do not load to fill local `AGENTS.md` from code, define Level 1/2/3 schema semantics, or set postmortem quality rules"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Repo

Keep repo documentation AI-readable, low-token, and sustainably maintainable.

`fractal-context` defines Level 1/2/3 semantics; this skill only owns repo-level topology, frontmatter, indexes, and lifecycle.

## Scope Gate

**This skill applies only when `skills/fractal-scope/config.yaml` exists.**

If not found, this is not a fractal-repo — do not apply placement, naming, or lifecycle rules.

## Authority

This skill owns **placement authority** only: where docs live, how they are named, how they are indexed, and when they are archived.

- Level 1/2/3 schema semantics → `fractal-context`
- Local folder `AGENTS.md` content fill / refresh from code → `fractal-agents-fill`
- Postmortem trigger / root-cause depth / quality bar → `postmortem`
- Decision freshness and current-task decision doc handling → `decision-capture`
- Full authority split → `references/skill-authority-map.md`

## Decision Rules

Prioritize getting the judgment right before touching docs:

- First determine whether this is a schema semantics problem or a repo topology / lifecycle problem.
- This skill only leads when document placement, naming, indexing, or archive state changes.
- If it's only about Level 1/2/3 field meaning or header structure, delegate to `fractal-context`.
- If it's only about a local directory `AGENTS.md` being missing, stale, or needing contract inference from code, delegate to `fractal-agents-fill`.
- If it's only about whether postmortem content should be written and at what quality, delegate to `postmortem`.
- When unsure which lane a document belongs to (`decisions / engineering / research / postmortem / specs / archive`), check `references/lifecycle.md` first; do not categorize by intuition.

## Workflow

1. Confirm `skills/fractal-scope/config.yaml` exists
2. Read the target directory's local `AGENTS.md` (if present)
3. Read `../fractal-context/references/protocol/*.md` when Level 1/2/3 semantics need clarification
4. Identify the affected lanes: `decisions / engineering / research / postmortem / specs / archive`
5. Fix indexes, frontmatter, and cross-references first, then fill in content
6. After changes, only write back entry links that are still useful

Do NOT write or modify root `AGENTS.md` — coding agents manage their own initialization.

## Document Lane Assignments

- `docs/engineering/`: implementation notes, benchmarks, debt, workarounds
- `docs/research/`: explorations, alternatives, experiments
- `docs/postmortem/`: postmortems and failure knowledge
- `docs/specs/`: AI-generated task specification docs (PRD → executable task groups)
- `docs/archive/`: archived docs and tombstones

## Folder AGENTS.md Principles

- Local `AGENTS.md` only keeps the current directory's boundary, constraints, members, and related docs
- Do not repeat implementation details in `AGENTS.md`
- Do not maintain append-only history in `AGENTS.md`
- Do not add `Dependencies` or `Review Triggers` unless the repo already has strong conventions for them

## Postmortem

This skill owns postmortem placement, naming, indexing, and lifecycle.

Trigger conditions, root cause methodology, and writing quality standards are owned by the `postmortem` skill.

## When To Use

- Unsure which lane a document belongs to: `decisions / engineering / research / postmortem / specs / archive`
- Need to organize repo-level frontmatter, naming, indexes, or archive lifecycle
- Feature removed → move to `docs/archive/` and add tombstone
- Upstream fork divergence → write divergence doc and update local index

Not for:
- Filling a directory's `AGENTS.md` content from code
- Batch-fixing missing/stale/incomplete local `AGENTS.md` reported by audit
- Explaining or modifying Level 1/2/3 schema field semantics

Decisions are managed as project skills at `.agents/skills/decision-{slug}/SKILL.md` by `decision-capture`.

## Naming

- Lowercase kebab-case
- decisions: `auth-flow.md`
- engineering: `query-perf-benchmark.md`
- postmortem: `YYYYMMDD-bug-description-en.md`
- specs: `{YYYY_MM_dd}_{task_name}.md`

## Support Files

- `references/frontmatter.md`
- `references/lifecycle.md`
- `references/skill-authority-map.md`
- `../fractal-context/references/protocol/level1.md`
- `../fractal-context/references/protocol/level2.md`
- `../postmortem/templates/postmortem-template.md` (read only when you need the content template, not for placement decisions)
