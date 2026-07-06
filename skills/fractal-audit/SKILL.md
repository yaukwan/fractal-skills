---
name: "fractal-audit"
description: "Load when you want a report-only audit of fractal docs, especially to check for stale decisions, missing or stale `AGENTS.md`, or misplaced docs. Do not load to fix findings directly"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Audit

Run a report-only health scan across fractal docs and return prioritized repair work.

## Purpose

- detect stale or aging decision docs
- detect missing, stale, or incomplete local `AGENTS.md`
- detect likely lane-placement anomalies
- rank the resulting work by severity and assign a `repair_kind` to each item

## Default workflow

1. Confirm `.agents/skills/fractal-scope/config.yaml` exists.
2. Audit decision freshness and overlap risk.
3. Audit `AGENTS.md` coverage against the configured L2 scope.
4. Audit lane anomalies across `engineering / research / postmortem / archive`.
5. Produce a ranked report with `repair_kind` per item.
6. Stop. Do not fix anything in this skill.

## Output contract

Use `assets/audit-report-template.md` as the output skeleton. Fill each section with actual findings.

The report must include:

- decision findings
- `AGENTS.md` findings
- lane findings
- summary counts
- ranked next actions
- `repair_kind` per item (see below)

## Pre-check

Confirm `.agents/skills/fractal-scope/config.yaml` exists. If not found, this project is not a fractal-repo — report and exit.

## What it audits

### 1. Decision freshness

For each decision skill under `skills/decision-*/`:

1. Read the SKILL.md, extract referenced code areas from `metadata.affected_modules`
2. Check recent changes in those areas with `git log --oneline <path>`
3. If the latest code change is newer than the decision skill's last modification → mark `stale`
4. If the decision skill has not been updated in over 90 days → mark `aging`
5. If the decision has no `affected_modules` → mark `untethered`

### 2. AGENTS.md coverage

For each directory within the L2 scope `include` range in `.agents/skills/fractal-scope/config.yaml`:

1. Check whether `AGENTS.md` exists
2. Not found → mark `missing`
3. Exists but last modified before the latest code commit in the directory → mark `stale`
4. Exists but `Scope` / `Constraints` / `Members` has empty sections → mark `incomplete`

### 3. Lane placement

For documents under `docs/engineering/`, `docs/research/`, `docs/postmortem/`, `docs/archive/`:

1. Check for content clearly misplaced in the wrong lane (e.g. postmortem written as engineering notes)
2. Check for `archive/` documents still actively referenced in code

## Audit report format

```
# Fractal Audit Report — {{DATE}}

## Decision Freshness
  STALE   skills/decision-auth-flow/SKILL.md — last code change 2026-04-10 > decision updated 2026-02-01
  AGING   skills/decision-api-versioning/SKILL.md — 120 days since last update
  OK      skills/decision-database-split/SKILL.md — code area unchanged, decision current

## AGENTS.md Coverage
  MISSING   src/services/payment/ — no AGENTS.md
  STALE     src/auth/AGENTS.md — doc 2026-01-15, code last changed 2026-04-20
  OK        src/core/AGENTS.md

## Lane Check
  AMBIGUOUS  docs/engineering/cache-failure.md — reads like postmortem content
  ORPHAN     docs/archive/old-api.md — still referenced in src/api/routes.ts

## Summary
  Decisions: 2 stale, 1 aging, 3 ok
  AGENTS.md: 1 missing, 1 stale, 1 ok
  Lane: 1 ambiguous, 1 orphan
  Priority: [ranked list of actions]
```

## Priority model

1. STALE decisions — affect design authority, fix first
2. STALE AGENTS.md — directory navigation is unreliable
3. MISSING AGENTS.md — new directory needs docs
4. INCOMPLETE AGENTS.md — file exists but contract is unusable
5. AGING decisions — not yet expired but approaching deadline
6. Lane issues — non-urgent but worth tidying

## Repair kinds

Each finding carries one of these `repair_kind` values:

- `local-contract-refresh` — MISSING / STALE / INCOMPLETE local `AGENTS.md` needs contract capture from code
- `decision-freshness-review` — STALE / AGING / overlapping decisions need authority refresh
- `repo-placement-fix` — lane placement issue (move between engineering / research / postmortem / archive)

## Report-only rule

This skill's action is "complete an audit", not "fix all findings on the spot".

When issues are found, report them and specify `repair_kind`; do not directly modify decisions or `AGENTS.md` within the audit.

## Gotchas

- **Untethered decisions need human judgment** — decisions without referenced locatable code areas are automatically marked `untethered`, but staleness judgment requires human review. Do not blindly trust untethered = safe.
- **New repos have shallow git history** — `git log` may return empty or only a few commits. Staleness detection depends on sufficient historical data; audit results for new projects lean conservative.
- **Stale AGENTS.md ≠ broken** — code changes within a directory do not necessarily mean AGENTS.md is stale. Read-only changes (formatting, comment fixes) do not require updates.
- **Lane placement has false positives** — content classification is heuristic. Mark `AMBIGUOUS` rather than moving documents outright.
- **Large repos may timeout** — `git log` performs per-file queries for each decision. For large repos consider a scoped audit first (only check recently changed directories).
