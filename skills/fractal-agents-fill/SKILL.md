---
name: "fractal-agents-fill"
description: "Load when a directory's local `AGENTS.md` must be created or refreshed from code and nearby docs, especially when it is missing, stale, incomplete, or unclear. Do not load for repo-wide audits, decision handling, or repo-level placement work"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Fractal Agents Fill

Fill or repair directory-level operating context from code, nearby docs, and current task evidence.

This skill is for **directory contract capture**, not a generic AGENTS schema explainer.

## Purpose

This step handles:

- inferring the directory's current contract
- directly creating or refreshing local `AGENTS.md` when the information is clear enough
- stopping to ask only when missing facts would distort the manifest
- flagging `decision_drift_signal` in output when an existing decision may conflict with the inferred contract

## Default workflow

1. Explore the relevant directory code paths first.
2. Read the nearest `AGENTS.md` and overlapping decision docs.
3. Infer `Scope / Constraints / Members / Docs / Exceptions` from code and docs.
4. If the directory contract is clear, write or update `AGENTS.md` now.
5. If key facts remain ambiguous, ask one focused question at a time with a recommended answer.
6. Return either a direct-write result or a `Fill Result` with the remaining blockers.

## Scope gate

Apply this skill only when `docs/decisions/fractal-scope.md` exists and the target directory is inside enabled L2 scope.

- If the repo is not a fractal-repo, stop and report that local AGENTS.md fill rules do not apply.
- If the path is out of scope, do not write the manifest just because the directory exists.

## Completion criteria

- `AGENTS.md` is created or updated when the directory contract is clear enough to write safely.
- Or a `Fill Result` records the remaining blockers and the recommended write action.
- Do not stop early just because questioning is possible.

## What this skill owns

- create or refresh a directory-level `AGENTS.md`
- reconcile code reality with local docs for the current task
- surface directory-level constraints that affect current work
- flag when a related decision may be drifting against the inferred contract

## When to write directly

- code and nearby docs already show a stable scope boundary clearly
- the existing `AGENTS.md` is missing, clearly stale, or has obviously incomplete sections
- only need to conservatively converge existing facts into a directory contract, without inventing new constraints

## When to stop and ask

- directory ownership is unclear across adjacent paths
- a constraint may change public behavior or durable boundary
- user terminology conflicts with code/docs; writing directly would produce a misleading manifest

## Direct-write rule

Default: read first, write when you can.

Asking is for filling critical fact gaps — not for offloading obvious synthesis work onto the user.

## Interaction protocol

### 1. Explore before asking

Pull answers from these sources first:

- relevant code paths
- nearest `AGENTS.md`
- overlapping docs under `docs/decisions/`
- already settled context from the current conversation

If these sources already answer the question, do not re-ask the user.

### 2. Ask only one blocking question at a time

Push forward only the one ambiguity point that truly blocks writing.

If the current question already exposes enough directional drift, do a semantic recalibration first before continuing to write the manifest; do not keep asking detail questions under the wrong terminology.

Good questions are specific, like:

> "It looks like this change touches the auth token refresh pipeline. Is the success criterion here to restore the old behavior, or to unify the token contract while we're at it? I'd lean toward just restoring the old behavior first."

### 3. Recommend an answer

Every question should carry a recommended answer. Do not offload all the thinking work onto the user.

### 4. Sharpen fuzzy language

If the user says:

- "optimize it"
- "change the logic"
- "the account"
- "make it compatible"

Proactively ask for more precise meaning and offer candidate interpretations.

Prioritize clarifying these high-risk semantics:

- ownership: who is the long-term owner, who is just a caller / adapter / integration edge
- boundary: which content belongs to this directory, which is only a cross-directory dependency
- contract: which constraints are durable boundary, which are just current implementation details
- term collisions: whether the same word points to different objects in code, decision docs, and user statements

### 5. Cross-check against code and docs

When the user's statement, code reality, and existing docs disagree, call it out immediately:

> "You said this is a local field adjustment, but the existing decision defines it as a cross-module contract. Which one is the current truth?"

### 6. Keep AGENTS edits conservative

- conservatively merge existing content; do not overwrite user-authored information
- only write the current directory contract; do not inject repo-wide rules into local `AGENTS.md`
- do not invent constraints just to fill sections

## Suggested question sequence

Converge in the order below; only ask what remains unresolved.

### Q1. Directory scope

First confirm which responsibility the directory truly owns:

> "I currently assess that this directory truly owns X, while Y looks more like a neighboring directory's responsibility. Does this boundary match your understanding?"

Write into: `Inferred directory scope`

### Q2. Boundary conflicts

If adjacent directory boundaries are unclear:

> "The provider adapter here looks like it's split between `src/auth/` and `src/integration/`. Which one is the long-term owner? I'd lean toward keeping the adapter contract in `src/auth/providers/`."

Write into: `Boundary clarifications`

### Q3. Constraints and non-goals

Ask:

> "Are there any contracts that must be preserved, boundaries that cannot move, or content that explicitly should not go into this directory manifest?"

Write into: `Constraints / Exceptions`

### Q4. Decision drift check

Confirm whether the local contract has tension with existing decisions:

> "This directory contract appears to not fully align with the boundary in existing decision X. I currently assess the decision may have drifted, but this skill does not modify decisions. I'd lean toward recording this signal in the contract output first. Does that match your intent?"

### Q5. Direction confirmation

When you can write the manifest but worry that wrong terminology will steer subsequent spec/implementation work, confirm one sentence:

> "I'm currently prepared to define this directory as X, and not include Y in its owner boundary. This would cause subsequent decisions/specs to converge in that direction. I'd lean toward writing it this way. Do you agree?"

Write into: `Direction confirmation`

## Session commands

The user can control the flow at any time with these commands:

- `skip` — skip the current question
- `done` — stop asking, produce the current `Fill Result` directly
- `next` — skip remaining questions, continue with existing context

## Output contract

At minimum, return at the end:

- target directory
- `AGENTS.md` path or recommended path
- short contract summary
- relevant docs consulted
- decision drift signals (if any)
- direction risks avoided
- open questions (if any)

## Fill Result format

When it is not safe to write directly, at minimum produce:

```markdown
## Fill Result
- Target directory:
- Inferred directory scope:
- Boundary clarifications:
- Contract summary:
- Relevant existing docs:
- Decision drift signals:
- Direction confirmation:
- Open questions:
```

## AGENTS.md update rule

Only write or modify `AGENTS.md` when the task exposes that **the directory contract has drifted, gone missing, or needs clarification**.

When writing:

- preserve Level 2 sections: `Scope` / `Constraints` / `Members` / `Docs` / `Exceptions`
- conservatively merge existing content; do not overwrite user-authored information
- do not list every file; only write groupings meaningful for understanding boundaries
- do not write timestamps
- for specific structure, see `references/output-format.md`

## Semantic confirmation rule

This skill's "questioning" is not just about filling missing facts — it is also about **preventing wrong semantics from being written into the manifest**.

When any of the following holds, perform direction confirmation first before deciding whether to write:

- user terminology conflicts with existing terms in code or decisions
- a directory looks like both owner and integration edge at the same time
- your wording would affect subsequent understanding of system boundaries and design truth

The goal is not to ask more questions — it is to nail down the semantics with the fewest questions at the points that would genuinely steer things wrong.

For ready-made question phrasing templates, read `assets/semantic-confirmation-prompts.md`.

## Gotchas

- **Do not make schema explanation the primary goal** — this skill's primary goal is to fill the directory contract, not to explain the AGENTS spec.
- **Write directly when it's safe** — do not degrade the default mode into a questionnaire.
- **decision drift signal ≠ decision conclusion** — after flagging drift, this skill does not modify the decision; it only carries the affected path and drift signal in its output.
- **If code can answer, don't ask** — this skill's value is in filling genuine context gaps, not interrupting the user over the obvious.
- **Handle one directory at a time** — batch fixes across multiple directories should converge one by one, to avoid blurring boundaries.
