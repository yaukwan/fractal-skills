---
name: "fractal-agents-fill"
description: "Load when a directory's local `AGENTS.md` must be created or refreshed from code and nearby docs, especially when it is missing, stale, incomplete, or unclear. Do not load for repo-wide audits, decision handling, or repo-level placement work"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "1.1"
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

<what-to-do>
Explore the target directory's code, nearest AGENTS.md, and overlapping decision docs.
Then interview the user about each key L2 manifest section, asking one question at a
time with a recommended answer. Wait for the user's response before asking the next question.

After all sections are clarified (or the user says `done`), write the directory contract
into the local AGENTS.md. Do NOT create additional files — all captured intent goes into
the existing L2 AGENTS.md sections (Scope / Constraints / Members / Docs / Language /
Exceptions).

The user may respond with `skip` to skip a single question, or `done` to stop asking and
write immediately with whatever has been gathered so far.
</what-to-do>

## Default workflow

1. Explore the directory's code paths, nearest `AGENTS.md`, and overlapping decision docs.
2. Assess which L2 sections (`Scope`, `Constraints`, `Members`, `Docs`, `Language`, `Exceptions`) need clarification.
3. Ask the user one question at a time about each unresolved section, with a recommended answer.
   - The user may respond with `skip` to skip a single question or `done` to write immediately.
4. After all key sections are clarified, write or update the local `AGENTS.md`.
5. If a root `AGENTS.md` exists, update only the corresponding `Local Maps` entry for this L2 manifest.
6. Return a summary of what was written and any remaining open questions.

## Scope gate

Before writing a local `AGENTS.md`, run the consuming project's local `fractal-scope` checker:

```bash
node .agents/skills/fractal-scope/scripts/check-scope.js --config .agents/skills/fractal-scope/config.yaml --root . --path <target-directory>
```

- If the config is missing, stop and report that local AGENTS.md fill rules do not apply.
- If the checker is missing, stop and repair the project-local runtime with `fractal-setup`.
- If `l2_folder_manifest.status` is not `matched`, do not write the manifest just because the directory exists.

## Completion criteria

- `AGENTS.md` is created or updated after the user has clarified the key L2 sections (or said `done`).
- Or a `Fill Result` records the remaining blockers and the recommended write action.
- Do not skip questioning just because the code alone seems clear — the user's intent may differ.

## What this skill owns

- create or refresh a directory-level `AGENTS.md`
- reconcile code reality with local docs for the current task
- surface directory-level constraints that affect current work
- flag when a related decision may be drifting against the inferred contract

## When to skip questioning

Skip a single question only when code and nearby docs already clearly settle the
section without user input. When the user says `skip`, skip the current question.
When the user says `done`, stop asking entirely and write immediately with whatever
has been gathered.

The default is to ask. Code exploration reduces what you need to ask — it does not
replace asking. The user's intent often differs from what code alone suggests.

## Interaction protocol

Explore code, nearby docs, existing `AGENTS.md`, overlapping decision skills, and current conversation context before asking. Ask only for intent that evidence cannot settle.

Ask one focused question at a time, always with a recommended answer. If a `grilling` skill is available, run the interview as a grilling session using this skill's question sequence and output contract. Otherwise, use the fallback protocol below. The user may respond with `skip`, `done`, or `next`.

Read `references/interaction-protocol.md` for the required question sequence, Fill Result format, and semantic confirmation examples.
## Output contract

At minimum, return at the end:

- target directory
- `AGENTS.md` path or recommended path
- short contract summary
- relevant docs consulted
- decision drift signals (if any)
- direction risks avoided
- open questions (if any)

## AGENTS.md update rule

Only write or modify `AGENTS.md` when the task exposes that **the directory contract has drifted, gone missing, or needs clarification**.

When writing:

- preserve Level 2 sections: `Scope` / `Constraints` / `Members` / `Docs` / `Language` / `Exceptions`
- conservatively merge existing content; do not overwrite user-authored information
- do not list every file; only write groupings meaningful for understanding boundaries
- do not write timestamps
- write resolved vocabulary into the nearest L2 `AGENTS.md > Language`; do not create `CONTEXT.md` or sync one bidirectionally
- when root `AGENTS.md` exists, sync only this manifest's `Local Maps` line; do not regenerate the whole map
- for specific structure, see `references/output-format.md`

## Gotchas

- **Do not make schema explanation the primary goal** — this skill's primary goal is to fill the directory contract, not to explain the AGENTS spec.
- **The default is to ask, not to write silently** — this skill's primary value is capturing user intent that cannot be inferred from code. Do not skip questioning just because code exists — the user's intent often differs from what code alone suggests.
- **decision drift signal ≠ decision conclusion** — after flagging drift, this skill does not modify the decision; it only carries the affected path and drift signal in its output.
- **If code can answer the fact, don't ask** — avoid asking about file layout, naming conventions, or other observable facts that exploration can settle. But do ask about intent: ownership boundaries, constraints, and direction are rarely inferable from code alone.
- **Handle one directory at a time** — batch fixes across multiple directories should converge one by one, to avoid blurring boundaries.
- **Local Maps sync is local** — update the affected root entry after writing one L2 manifest; leave whole-repo map drift detection to `fractal-audit`.
