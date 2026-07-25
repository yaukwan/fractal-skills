---
name: skill-design-guidelines
description: Load when creating, reviewing, refining, or maintaining Agent Skills, especially for invocation design, SKILL.md structure, progressive disclosure, completion criteria, validation, or pruning. Do not load for unrelated documentation or coding tasks.
license: Apache-2.0
metadata:
  author: Alma
  version: "2.0.0"
  sources: "Perplexity: Designing, Refining, and Maintaining Agent Skills; Matt Pocock: writing-great-skills (MIT)"
---

# Skill Design Guidelines

Design skills to make an agent follow a **predictable process**. Predictability means stable decisions and execution paths, not identical outputs.

For every instruction, ask:

> Would the agent behave differently without this?

Remove instructions that fail that test.

## Authority

Use the Agent Skills specification as the portable baseline:

- a skill directory contains `SKILL.md`
- `SKILL.md` has valid `name` and `description` frontmatter
- the body contains instructions loaded when the skill activates
- supporting files are optional and loaded or executed only when needed

Invocation controls beyond this baseline are harness-specific. Verify the target harness before using fields such as `disable-model-invocation` or external policy files.

## Design dimensions

### Invocation

Choose the invocation mode before writing the body:

- **Model-invoked**: the agent must discover the skill from the request. The description needs precise routing branches.
- **User-invoked**: the user deliberately selects the skill. Use this only when the target harness supports hiding it from model discovery.

A model-facing description has two jobs:

1. identify what class of work the skill owns
2. state when each distinct branch should activate

Use one trigger per real branch. Collapse synonyms that describe the same branch. Add a nearby boundary only where another skill or ordinary model behavior could plausibly win the request.

`Load when...` is a useful project convention, not a portable syntax requirement.

### Information hierarchy

Arrange content by when the agent needs it:

1. **Steps in `SKILL.md`**: ordered actions needed on every relevant run
2. **Reference in `SKILL.md`**: rules and facts every branch needs
3. **Referenced files**: conditional or branch-specific material

Move material behind a context pointer when only some branches need it. Keep universally required rules inline even when they are long enough to be inconvenient.

A context pointer must say:

- when to read or run the target
- what the target contains or produces
- how it affects the current task

Use paths relative to the skill root. Keep a concept's rules, caveats, and examples together.

### Runtime files

Only `SKILL.md` is required. Add other directories when they carry real content:

```text
skill-name/
├── SKILL.md
├── references/   # conditional documentation
├── assets/       # templates or output resources
└── scripts/      # deterministic or repeated operations
```

An absent optional directory is not a defect. Empty scaffolding adds maintenance without changing behavior.

### Steps and completion

Every ordered step needs a completion criterion. Prefer criteria that are:

- **checkable**: the agent can distinguish done from not done
- **exhaustive where needed**: all affected branches, files, or constraints are accounted for

Completion criteria control legwork. A vague instruction such as `review the skill` permits early exit; `account for every invocation branch and adjacent near-miss` sets a useful bound.

If an agent repeatedly rushes a step, sharpen its completion criterion first. Split the sequence only when the bound cannot be made clear and visible later steps are demonstrably pulling attention forward.

### Pruning

Keep each meaning in one authoritative place.

During every revision, remove:

- **No-ops**: instructions the model already follows reliably
- **Duplication**: the same rule expressed in multiple places
- **Sediment**: stale guidance preserved only because deletion feels risky
- **Sprawl**: live content placed too high in the hierarchy
- **Prohibition-only steering**: a banned behavior named without a positive replacement

Reserve prohibitions for hard guardrails. Pair them with the behavior the agent should perform instead.

## When a skill is warranted

Create or retain a skill when at least one condition holds:

- the task is repeatedly misrouted
- execution varies in a harmful way
- durable domain judgment is missing from the base model
- team-specific conventions materially affect the result
- deterministic helper logic avoids repeated reinvention

Prefer ordinary project documentation, code, or the base model when none of these conditions holds.

## Authoring process

### 1. Establish the contract

Identify:

- target harness and compatibility constraints
- owned task class
- invocation mode
- distinct invocation branches
- nearest non-goals or competing skills
- expected output or state change

Complete this step when every branch has a clear owner and the remaining ambiguity would not change the skill's design.

### 2. Write the description

Front-load the owned task class, then cover each branch once. Remove synonym lists and implementation details.

Complete this step when a reader can distinguish every intended trigger from its nearest plausible miss without opening the body.

### 3. Write the body

Include only behavior-changing material:

- ordered steps and completion criteria
- decisions the model cannot safely infer
- failure recovery
- organization-specific judgment
- conditional context pointers

Complete this step when every branch has enough instruction to finish and every ordered step has a stopping rule.

### 4. Place supporting material

Move branch-specific reference, templates, and deterministic helpers into optional support files. Keep paths relative and pointers explicit.

Complete this step when each support file has a real caller and no required rule is hidden behind an unreliable pointer.

### 5. Validate with temporary prompts

Construct representative prompts during creation or review. Keep them temporary and remove them when validation is complete.

Cover, in proportion to routing risk:

- at least one intended invocation per branch
- realistic near-misses that should remain with the base model or another skill
- ambiguous wording observed in real use
- behavior cases for the highest-risk completion criteria

Use an isolated session when the harness makes that practical. Otherwise, perform an explicit routing and behavior walkthrough. Convert failures into sharper descriptions, completion criteria, context pointers, or gotchas.

Complete this step when every branch and high-risk near-miss has been exercised or explicitly reasoned through.

### 6. Prune and finish

Run the no-op, duplication, sediment, and portability checks. Remove test scaffolding and temporary artifacts.

Complete this step when each remaining sentence changes behavior, each meaning has one source of truth, and the skill passes structural validation.

## Review order

Review in this order so later polish does not hide an earlier contract failure:

1. **Invocation**: ownership, branches, description, boundaries, harness compatibility
2. **Execution**: ordered steps, decisions, failure recovery, completion criteria
3. **Hierarchy**: inline rules, context pointers, optional support files, co-location
4. **Pruning**: no-ops, duplication, sediment, sprawl, positive steering
5. **Validation**: temporary positive, negative, near-miss, and high-risk behavior prompts
6. **Structure**: portable frontmatter and file references

Use these assets when their format is useful:

- `assets/skill-template.md` for a new draft
- `assets/review-checklist.md` for a binary review pass
- `assets/review-rubric.md` for a scored review

Read `references/anti-patterns.md` when a skill is bloated, unreliable, or difficult to route. Read `references/perplexity-original-article.md` only for source provenance or exact source nuance; it is not the current repository policy.

## Structural validator

Run the bundled linter after writing or reviewing a skill:

```bash
python3 <skill-design-guidelines-root>/scripts/validate_skill.py /path/to/skill
```

JSON output:

```bash
python3 <skill-design-guidelines-root>/scripts/validate_skill.py --json /path/to/skill
```

The validator checks portable structural requirements. It does not prove routing quality, execution quality, or prompt coverage; those require the review and temporary validation steps above.
