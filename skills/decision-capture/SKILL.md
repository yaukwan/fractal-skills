---
name: "decision-capture"
description: "Load when the current task may need decision-doc handling, especially to check whether existing decisions still match current design truth or to update, supersede, or merge them. Do not load for repo-wide lane placement, Level 1/2/3 schema semantics, or postmortem writing"
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

- choosing which lane a doc belongs to across `engineering / research / postmortem / specs / archive`
- Level 1/2/3 schema semantics or file header structure
- writing implementation notes, benchmarks, migrations, or workaround records
- generating bug-fix postmortems
- task spec generation

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

- `CURRENT` — Existing decision skill remains accurate and sufficient.
- `CREATE` — No existing decision covers a durable system truth that now needs authority.
  Writes `.agents/skills/decision-{slug}/SKILL.md`.
- `UPDATE` — Existing decision skill is still fundamentally right but needs refresh.
  Overwrites the skill body; regenerates description unless manually overridden.
- `SUPERSEDE` — Existing decision skill's truth materially changed and should be replaced.
  Old skill gets `[SUPERSEDED]` prefix and status change; new skill gets CREATE.
- `MERGE` — Multiple current-looking decision skills overlap and should become one
  clearer authority. Absorbed skills marked `[SUPERSEDED]`; merged result gets UPDATE.
- `REJECT` — The content is not durable system design truth and should not become
  a decision skill. If an orphan skill exists, it gets `[ORPHANED]` prefix.

## Admission rule

Use this rule as a helper while deciding whether the task deserves a decision skill:

> If a new contributor reads this, will they better understand a stable system-level
> design truth they are expected to follow?

If not, prefer `CURRENT` or `REJECT` unless there is another clear reason the topic
must become authority.

### A strong decision candidate usually satisfies all three

1. **Hard to reverse** — changing your mind later would be meaningfully costly
2. **Surprising without context** — future readers would reasonably ask "why is it this way?"
3. **Result of a real trade-off** — there were genuine alternatives and one was chosen for specific reasons

### Typical good fits

- cross-module design constraints
- system boundaries
- durable architecture choices
- long-lived behavior contracts
- authority splits across documentation lanes
- rules that future implementations are expected to inherit

### Typical non-fits

- a tradeoff inside one feature
- a naming choice inside one PR
- an implementation workaround
- temporary exploration output
- a local decision with no system-wide implications

## Freshness trigger

When code changes touch an area referenced by an existing decision skill's
`metadata.affected_modules`, flag that decision for review:

1. Identify decision skills whose `affected_modules` overlap the changed path or contract.
2. Ask: "Does this task change the design truth documented there?"
3. If no, return `CURRENT` and note the verification.
4. If yes, perform the correct mutating action.

This closes the "stale authority driving wrong implementation" failure mode.

## Freshness rule

A decision skill must represent the **current effective design state**.

Stale authority is worse than missing docs.

When a decision no longer matches reality, prefer one of these actions:

- `UPDATE` when the design is still fundamentally the same
- `SUPERSEDE` when the system truth materially changed
- `MERGE` when multiple skills drifted into the same topic boundary

Do not leave multiple decision skills silently competing to define the same truth.

## Decision skill format

All content goes into `.agents/skills/decision-{slug}/SKILL.md` using the template at
`assets/decision-skill-template.md`. The `description` field is the routing trigger
— it follows `skill-design-guidelines` conventions. See `references/skill-sync-rules.md`
for the auto-generation algorithm.

Decision frontmatter may include an optional `skill_description` field to manually
override the auto-generated routing description.

For cross-module decisions (≥2 modules in `affected_modules`), also generate
`skills/decision-{slug}/evals/evals.json` with positive and negative routing examples.

## Minimal content invariants

This skill does **not** require a single rigid template, but every created or
materially updated decision must make these points clear:

- what the current design truth is
- why it deserves long-lived authority
- which boundaries or constraints it sets for later work
- how it relates to any prior decision skills

## Supersession rule

When the same design topic already exists:

- update the existing skill if the design is still fundamentally the same
- supersede it if the system truth materially changed
- merge if multiple skills now overlap
- reject parallel current-looking skills that split the same authority surface

Avoid append-only decision growth.
The decisions directory is not an ADR graveyard — it is a collection of skills
that shape agent behavior.

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
