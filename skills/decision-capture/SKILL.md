---
name: "decision-capture"
description: "Load when the current task may need fractal decision handling, especially to check whether existing decisions still match current design truth or to update, supersede, or merge them. Do not load for explicit ADR files under `docs/adr/`, repo-wide lane placement, Level 1/2/3 schema semantics, or postmortem writing"
license: "Apache-2.0"
metadata:
  author: "yaukwan"
  version: "2.0"
  github: "https://github.com/yaukwan/fractal-skills"
---

# Decision Capture

Handle the full decision lifecycle for the current task: inspect existing decision coverage,
choose the right action, and when needed write or update the decision skill at
`.agents/skills/decision-{slug}/SKILL.md`.

This skill is for **decision handling**, not a generic documentation policy explainer.

## Purpose

- determine whether the current task is already covered by existing decision skills
- choose the correct decision action for the task
- complete the required decision skill changes when the truth is not yet current
- leave a clear record of the current design truth and any drift found
- generate a project skill so agents discover the constraint automatically during implementation

## Output location

Decisions are **project skills** at `.agents/skills/decision-{slug}/SKILL.md`. There is no
`docs/decisions/` directory. The skill is the source of truth — it contains the
full decision content (Context, Decision, Boundaries, Implications, Non-goals).

## Default workflow

1. Identify the affected code and doc scope.
2. Find overlapping decision skills by topic, directory, module, or contract boundary.
3. **Determine** whether the task touches a **cross-cutting, long-lived, current design truth**.
   Use the admission rule and authority signals to judge, not mere analysis thoroughness.
4. Choose the action from the matrix.
5. **Before any CREATE / UPDATE / SUPERSEDE / MERGE action:**
   - Present the user with a concise summary of:
     - The decision being proposed
     - Why it qualifies as durable system truth (not local task reasoning)
     - Which existing decisions it relates to or replaces
   - If a `grilling` skill is available, use its one-question-at-a-time interview discipline for unresolved decision tradeoffs; otherwise use this inline confirmation flow.
   - **Wait for explicit user confirmation before writing.**
   - If the user rejects or redirects, respect that and do not proceed.
6. Once confirmed, write the decision skill at `.agents/skills/decision-{slug}/SKILL.md`.
7. Return the resulting current truth.
8. **Skill sync** — after writing, generate the routing description using the rules
   in `references/skill-sync-rules.md`. Verify the generated skill passes
   `skill-design-guidelines` routing review (description starts with `Load when...`,
   body is lean, no documentation cosplay).

## Completion criteria

- `CURRENT` — Existing decision skills were checked and still represent the task's current truth.
- `CREATE | UPDATE | SUPERSEDE | MERGE` — The required decision skill changes are finished,
  the skill's description is a valid routing trigger, and the resulting authority state is unambiguous.
- `REJECT` — It is clear this topic should not become a decision skill, and the correct
  alternative is named.

If the resulting truth is not yet current, this skill is **not done**.

## Scope Gate

**This skill applies only when `.agents/skills/fractal-scope/config.yaml` exists.**

If not found, this is not a fractal-repo — do not apply decision capture rules.

## What this skill owns

This skill owns the rules for:

- checking whether existing decision skills already cover the task
- selecting and executing the decision action for the task
- keeping decision skills aligned with current system truth
- resolving stale, overlapping, or superseded decision skills
- preventing local tradeoffs from being promoted into global authority
- proactively flagging touched decisions for review when code changes overlap their scope
- generating valid routing descriptions so agents discover decisions during implementation

## What this skill does not own

Do not use this skill for:

- writing explicit ADR files under `docs/adr/` when the user asks for that repository convention
- choosing which lane a doc belongs to across `engineering / research / postmortem / specs / archive`
- Level 1/2/3 schema semantics or file header structure
- writing implementation notes, benchmarks, migrations, or workaround records
- generating bug-fix postmortems
- task spec generation

For explicit ADR files, follow the repository's ADR convention or adjacent ADR/domain-modeling skill.
For lane placement, use `fractal-repo`.
For schema semantics, use `fractal-context`.
For failure-learning workflow, use `postmortem`.
For task specs, use `to-task-specs`.

## Output contract

Return:

- the primary action: `CURRENT | CREATE | UPDATE | SUPERSEDE | MERGE | REJECT`
- the relevant decision skill path(s)
- one short statement of the resulting current truth
- a short rationale for the action
- the generated skill path: `.agents/skills/decision-{slug}/SKILL.md` (empty if REJECT or no scope)
- skill sync action: `CREATED | UPDATED | SUPERSEDED | MERGED | NONE`

If skill mutation was required, include the written or updated path(s).

## Action matrix

Return exactly one primary action:

- `CURRENT` — existing decision remains accurate and sufficient
- `CREATE` — write a new `.agents/skills/decision-{slug}/SKILL.md`
- `UPDATE` — refresh an existing decision whose core truth still holds
- `SUPERSEDE` — replace a materially changed decision and mark the old one inactive
- `MERGE` — collapse overlapping current-looking decisions into one authority
- `REJECT` — decline content that is not durable system design truth

Use `references/authority-rules.md` for admission and rejection details.
Use `references/freshness-and-supersession.md` when code changes may have invalidated existing authority.
Use `references/skill-sync-rules.md` for generated skill format, routing description, eval fixture, and lifecycle mechanics.

## Gotchas

- "Important" does not automatically mean "decision".
- "We chose A over B" is not enough by itself; the result must become durable system truth.
- If the content mainly helps future debugging or implementation, it likely belongs in `docs/engineering/`.
- If readers could mistake an outdated skill for active authority, fix that before calling
  the task's decision truth confirmed.
- Do NOT escalate a local feature analysis into a decision skill just because the analysis
  was thorough. The admission bar is about **durability and system-wide impact**, not about
  analysis depth.
- Before creating a decision skill, run the review checklist item by item. If any item
  fails, reconsider or confirm with the user.
- The skill's description is a routing trigger — if it's not sharp, agents won't load
  the decision during implementation. Prefer explicit module names and task verbs.

## Escalation reads

Read these only when needed:

- `references/authority-rules.md` for detailed admission and rejection patterns
- `references/freshness-and-supersession.md` for current-state maintenance rules
- `references/boundary-with-adjacent-skills.md` when routing is ambiguous
- `references/skill-sync-rules.md` for description generation and skill lifecycle rules
- `assets/decision-review-checklist.md` for a fast review pass
- `assets/decision-skill-template.md` for the output template
