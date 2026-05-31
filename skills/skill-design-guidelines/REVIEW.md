# Review: skill-design-guidelines

Date: 2026-05-17
Reviewer: Alma
Method: Based on Perplexity's skill review order — routing, body, structure, maintenance/evals.

## Summary verdict

Overall result: **Pass**

This skill is correctly scoped as a design-and-review guide for agent skills. It uses a trigger-oriented description, keeps the root file focused, and pushes detailed supporting material into references/assets. It also includes both positive and negative eval cases.

## 1. Routing review

### Checks

- Directory name matches `name`: **Pass**
- Name lowercase + hyphenated: **Pass**
- Description says when to load: **Pass**
- Description is concise and trigger-oriented: **Pass**
- Description avoids workflow summary: **Pass**
- Description boundary quality: **Mostly pass**

### Notes

Description word count is 38 words, which is within the article's recommended compact range.

Current description:

> Load when creating, reviewing, refining, or maintaining agent skills, especially when the user asks for skill design guidance, SKILL.md best practices, routing descriptions, progressive loading, eval design, or how to structure skill folders, references, templates, and review checklists.

Why it works:

- clearly trigger-oriented
- uses the "Load when" form
- includes common request patterns
- points toward both creation and review use cases

Minor weakness:

- It does not explicitly state a non-goal such as "Do not load for general writing, coding, or unrelated docs review." That is not fatal, but adding one could reduce overlap with generic skill-creation or documentation tasks.

Suggested tightened alternative:

> Load when creating, reviewing, refining, or maintaining agent skills, especially for SKILL.md design, routing descriptions, progressive loading, skill evals, or skill folder structure. Do not load for generic coding, article summarization, or unrelated documentation tasks.

Routing score: **4.5 / 5**

## 2. Body review

### Checks

- Each sentence changes behavior: **Pass**
- Obvious/common knowledge removed: **Pass**
- Gotchas and failure logic included: **Pass**
- Principle-based over command-spam: **Pass**
- Judgment and boundaries explicit: **Pass**

### Notes

The root body is around 972 words, which is lean enough for a guide skill and significantly lighter than the first draft. It focuses on:

- routing-first design
- signal density
- gotchas and failure modes
- progressive structure
- when to create or avoid a skill
- writing workflow
- review workflow

Strong points:

- The root file teaches the core mental model clearly.
- It avoids turning into a README or shell cookbook.
- It repeatedly reinforces the key distinction between routing and documentation.
- It tells the agent where to read deeper material using direct absolute paths.

Minor weakness:

- There is a small amount of conceptual repetition between "What to optimize for," "Writing workflow," and "Review method." This repetition is acceptable because it reinforces central behavior, but if further compression is needed, one more editing pass could merge a few bullets.

Body score: **4.5 / 5**

## 3. Structure review

### Checks

- Heavy content moved to `references/`: **Pass**
- Templates/checklists moved to `assets/`: **Pass**
- Root file remains lean: **Pass**
- Hierarchy helps retrieval rather than harming it: **Pass**

### Notes

Final file set:

- `SKILL.md`
- `references/perplexity-method-summary.md`
- `references/anti-patterns.md`
- `assets/skill-template.md`
- `assets/review-checklist.md`
- `assets/review-rubric.md`
- `evals/evals.json`

This is a good fit for the progressive-disclosure philosophy from the article:

- root file = core operating model
- references = deeper conceptual material
- assets = reusable operational artifacts
- evals = routing and quality guardrails

One possible next step:

- If this skill later grows usage examples or before/after rewrites, add them under `assets/examples/` or `references/examples.md` rather than inflating the root file.

Structure score: **5 / 5**

## 4. Eval / maintenance review

### Checks

- Positive routing cases exist: **Pass**
- Negative routing cases exist: **Pass**
- Neighbor-confusion cases exist: **Pass**
- Known failure style coverage exists: **Partial but good**

### Notes

The eval file includes:

- direct guide request
- direct description-review request
- eval-design request
- negative generic summarization request
- negative scripting request
- overlap case with a dedicated skill-creation task

This is the right shape for an early routing suite.

What is still missing if you want stronger production-grade coverage:

1. More near-miss doc-review prompts
   - e.g. "Review this README" should likely not load this skill unless the README is specifically about a skill.

2. More conflict cases against `write-a-skill` / `skill-creator`
   - Some prompts will legitimately match both. Add cases that distinguish "design principles review" from "build the new skill for me."

3. Regression cases from real usage
   - As soon as real mistakes occur, turn them into eval prompts.

Eval score: **4 / 5**

## Overall scores

- Routing Precision: **4.5 / 5**
- Body Signal Density: **4.5 / 5**
- Gotchas and Boundaries: **4 / 5**
- Progressive Structure: **5 / 5**
- Evaluation Readiness: **4 / 5**

Overall: **4.4 / 5**

## Recommended follow-up improvements

### High priority

1. Tighten the description with one explicit non-goal.
2. Add 3–5 more negative and neighbor-confusion eval cases.

### Medium priority

3. Add a small examples file showing bad vs good descriptions.
4. Add a review output template for consistent audit formatting.

### Low priority

5. Add scripts only if a deterministic validator emerges later. For now, no script is needed.

## Final judgment

This skill is already solid and usable. It follows the original article's method well:

- route by intent
- keep root concise
- move depth into support files
- include negative eval thinking
- review for signal density rather than completeness theater

It is ready to use now.
