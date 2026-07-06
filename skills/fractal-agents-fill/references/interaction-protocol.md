# Interaction Protocol

Use this when filling a directory manifest requires user intent that code and nearby docs cannot settle.

## Explore before asking

Pull answers from these sources first:

- relevant code paths
- nearest `AGENTS.md`
- overlapping decision skills under `.agents/skills/decision-*/`
- already settled context from the current conversation

If these sources already answer the question, do not re-ask the user.

## Ask one question at a time

Walk through `Scope`, `Constraints`, `Members`, `Docs`, `Language`, and `Exceptions` one section at a time. Ask only for sections that code and docs do not already clearly settle. Each question must be focused and include a recommended answer.

The user may respond with:

- `skip` — skip the current question
- `done` — stop asking and write immediately with gathered context
- `next` — skip remaining questions and continue with existing context

## Required question sequence

### Q1. Directory scope

Confirm which responsibility the directory truly owns.

> I currently assess that this directory truly owns X, while Y looks more like a neighboring directory's responsibility. Does this boundary match your understanding?

Write into: `Inferred directory scope`.

### Q2. Boundary conflicts

If adjacent directory boundaries are unclear, ask which directory is the long-term owner and recommend the most likely boundary.

Write into: `Boundary clarifications`.

### Q3. Constraints and non-goals

Ask whether any contracts must be preserved, boundaries cannot move, or content should explicitly stay out of this manifest.

Write into: `Constraints / Exceptions`.

### Q3a. Domain language

If the conversation resolves domain-specific vocabulary, ask for confirmation before adding it to `Language`. Do not create `CONTEXT.md`; fractal-managed vocabulary belongs in the nearest L2 `AGENTS.md`.

Write into: `Language`.

### Q4. Decision drift check

If the local contract conflicts with an existing decision, ask whether to record a drift signal. Do not modify the decision from this skill.

### Q5. Direction confirmation

When wording would steer later decisions/specs, confirm the owner boundary in one sentence before writing.

Write into: `Direction confirmation`.

## Fill Result format

When the user says `done` before all sections are clarified, or when the directory contract remains partially unresolved, return:

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

## Semantic confirmation

Perform direction confirmation before writing when:

- user terminology conflicts with code or decisions
- a directory looks like both owner and integration edge
- your wording would affect later understanding of system boundaries

Use `../assets/semantic-confirmation-prompts.md` for ready-made question phrasing.
