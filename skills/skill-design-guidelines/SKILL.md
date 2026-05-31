---
name: skill-design-guidelines
description: Load when creating, reviewing, refining, or maintaining agent skills, especially for SKILL.md design, routing descriptions, progressive loading, skill evals, or skill folder structure. Do not load for generic coding, article summarization, or unrelated documentation tasks.
metadata:
  author: Alma
  version: "1.0.1"
  source: "Perplexity article: Designing, Refining, and Maintaining Agent Skills at Perplexity"
---

# Skill Design Guidelines

Design skills as **model-facing context engineering**, not human-facing documentation.

A good skill should change behavior in places where the base model would otherwise:

- misroute
- be inconsistent
- miss domain judgment
- forget gotchas
- follow a brittle default path

For every sentence, ask:

> Would the agent get this wrong without this instruction?

If not, delete it.

## What a skill is

A skill is:

1. a directory
2. a routing entry (`name` + `description`)
3. an invocable module
4. a progressively loaded context bundle

## What to optimize for

### 1. Routing precision first

The `description` is a routing trigger. It says **when to load**, not **what the skill does**.

Good:

- `Load when the user wants PR babysitting, CI watching, or help ensuring a PR lands cleanly.`

Bad:

- `This skill monitors pull requests and CI workflows.`

Checklist:

- start with `Load when...`
- prefer real user phrasing
- keep it short
- describe intent, not implementation
- mention nearby boundary if confusion risk is high

### 2. High signal per token

Skip what the model already knows.

Do **not** waste body text on obvious command sequences, generic workflows, or textbook explanations.

Bad:

- `git log; git checkout main; git checkout -b clean-branch; git cherry-pick ...`

Better:

- `Cherry-pick onto a clean branch. Resolve conflicts preserving intent. If it cannot land cleanly, explain why.`

### 3. Put rare value in the skill

The most valuable content is usually:

- gotchas
- negative examples
- boundary rules with adjacent skills
- failure handling
- judgment calls, taste, or organization-specific preferences

### 4. Keep root light, expand progressively

Heavy or conditional material belongs in support files, not in the root body.

## Recommended layout

```text
skill-name/
├── SKILL.md
├── references/
│   └── deep docs, edge cases, domain notes
├── assets/
│   └── templates, schemas, review checklists
├── scripts/
│   └── deterministic helpers
└── evals/
    └── evals.json
```

Use each part like this:

- `SKILL.md` — routing + core operating rules
- `references/` — long documents read only when relevant
- `assets/` — templates, scorecards, schemas, examples
- `scripts/` — logic the agent should run instead of recreating
- `evals/` — positive and negative test prompts

## Context budget model

Think in three cost tiers:

### Index tier

`name + description`

- paid in every session
- must be concise and sharply routed

### Load tier

root `SKILL.md`

- paid once loaded
- every paragraph must matter

### Runtime tier

`references/`, `assets/`, `scripts/`, nested materials

- paid only when used
- best place for long references, templates, and edge-case logic

## When a skill is warranted

Create a skill when at least one is true:

- the task is regularly wrong without domain context
- quality is too inconsistent run to run
- the needed knowledge is durable but not in training
- the workflow depends on team-specific conventions
- output quality depends on taste or judgment the model lacks

## When a skill is not warranted

Do not create a skill when:

- the base model already handles it reliably
- you are repeating system-prompt rules
- the material changes too fast to maintain safely
- the content is general documentation rather than behavior-shaping guidance

## Writing workflow

### Step 0 — Define evals first

Collect:

- positive routing prompts
- negative routing prompts
- known failure cases
- neighbor-confusion prompts

Negative examples are extremely valuable.

### Step 1 — Write the description

Template:

```md
Load when the user wants to <intent>, especially when they ask to <trigger-1>, <trigger-2>, or <trigger-3>. Do not load for <neighbor-case>.
```

Target:

- ideally under 50 words
- grounded in real user language
- precise enough not to steal adjacent requests

### Step 2 — Write the body

Include only:

- purpose
- default approach
- decision rules
- gotchas
- failure handling
- conditional reads into support files

Avoid writing a rigid step-by-step shell script for tasks the model already knows how to execute.

### Step 3 — Split heavy content

Move content out of `SKILL.md` when it is:

- long
- conditional
- infrequent
- better as a template or schema
- deterministic enough to encode in a script

### Step 4 — Iterate with evals

Refine in this order:

1. routing precision
2. off-target activation
3. gotchas and failure handling
4. wording compression
5. file structure and progressive reads

Usually the best revision is not adding more text. It is making the text sharper.

## Review method

Review skills in this order.

### Routing review

Check whether:

- directory name exactly matches `name`
- name is lowercase and hyphenated
- description says when to load
- description is short and trigger-oriented
- description avoids workflow summary
- description avoids stealing adjacent requests

### Body review

Check whether:

- each sentence changes behavior
- obvious knowledge has been removed
- gotchas are present
- failure cases are covered
- judgments and preferences are explicit where needed
- the instructions are principle-based, not brittle command spam

### Structure review

Check whether:

- heavy content moved into `references/`
- templates and checklists live in `assets/`
- deterministic helpers belong in `scripts/`
- hierarchy helps retrieval rather than causing indirection

### Maintenance review

Check whether:

- evals include both positive and negative cases
- new failures are turned into gotchas
- fast-changing content is kept out
- the skill is getting shorter and sharper over time

## Use the support files

For deeper material, read these directly:

- `/Users/cyouguang/.agents/skills/skill-design-guidelines/references/perplexity-method-summary.md`
- `/Users/cyouguang/.agents/skills/skill-design-guidelines/references/anti-patterns.md`
- `/Users/cyouguang/.agents/skills/skill-design-guidelines/references/perplexity-original-article.md` — full original markdown source; read only when exact wording or raw-source nuance matters
- `/Users/cyouguang/.agents/skills/skill-design-guidelines/assets/skill-template.md`
- `/Users/cyouguang/.agents/skills/skill-design-guidelines/assets/review-checklist.md`
- `/Users/cyouguang/.agents/skills/skill-design-guidelines/assets/review-rubric.md`

## Validator

Use the validator when you want a quick structural and routing sanity check for any skill.

Run:

```bash
python3 /Users/cyouguang/.agents/skills/skill-design-guidelines/scripts/validate_skill.py /path/to/skill
```

JSON mode:

```bash
python3 /Users/cyouguang/.agents/skills/skill-design-guidelines/scripts/validate_skill.py --json /path/to/skill
```

The validator checks:

- directory name vs frontmatter `name`
- lowercase-hyphenated naming
- whether description starts with `Load when`
- description length and explicit boundary hints
- presence of `references/`, `assets/`, `scripts/`, and `evals/evals.json`
- whether evals include both likely positive and likely negative routing cases
- whether the root file points to support files

## Fast heuristics

- If it is easy to explain, the model probably already knows it.
- If it is where the model gets confused, inconsistent, or sloppy, it probably belongs in the skill.
- If the skill feels long, it is probably under-edited.
