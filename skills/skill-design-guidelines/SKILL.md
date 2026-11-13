---
name: skill-design-guidelines
description: Load when creating, editing, reviewing, or validating Agent Skills.
license: Apache-2.0
metadata:
  author: Alma
  version: "2.0.0"
  sources: "Perplexity: Designing, Refining, and Maintaining Agent Skills; Matt Pocock: writing-great-skills (MIT)"
---

# Skill Design Guidelines

Design skills for stable decisions and execution paths. Outputs can vary with the task.

## Authoring process

### 1. Establish the contract

Create or retain a skill when it addresses at least one need:

- Repeated invocation errors or harmful execution differences.
- Domain judgment or team conventions the model lacks.
- Deterministic helpers that prevent repeated implementation.

Otherwise, use project documentation, code, or the base model.

Identify the target harness, task class, invocation branches, competing skills, and expected result.
Choose the invocation mode:

- **Model-invoked**: The description supports agent discovery.
- **User-invoked**: Use only when the harness can exclude the skill from model discovery.

Require `SKILL.md` with valid `name` and `description` frontmatter under the Agent Skills specification.
Verify harness support before using nonstandard controls, such as `disable-model-invocation` or external policy files.

Completion criterion: Each branch has a clear owner. No unresolved ambiguity changes the design.

### 2. Write the description

State the task class first.
Include one trigger per distinct branch.
Add boundaries only for realistic competing tasks.
Keep implementation details in the body.
`Load when...` is a project convention, not a portable syntax requirement.

Completion criterion: The description distinguishes intended requests from realistic near-misses without requiring the body.

### 3. Write the body

Specify consequential decisions, failure recovery, and team conventions.
Give each ordered step a checkable completion criterion.
Require complete coverage where omissions would cause errors.

If an agent finishes steps early, clarify the completion criteria first.
Split the sequence only if clarification fails and visible later steps cause the early exit.
Hiding later steps requires a separate context.
Moving text within one file does not hide it.

Write one action per sentence.
Use the same term for the same concept.
Use literal terms instead of metaphors.

Completion criterion: Every branch includes the decisions and completion criteria needed to reach its expected result.

### 4. Place supporting material

Keep rules that every branch needs in `SKILL.md`.
Move conditional documentation to `references/`.
Move templates to `assets/`.
Move deterministic helpers to `scripts/`.
Create optional files and directories only for real callers.

For each context pointer, state:

- When to read or run the target.
- What it supplies.
- How the current task uses the result.

Use paths relative to the skill root.
Keep each concept's rules, caveats, and examples together.

Completion criterion: Each support file has a caller. Every required rule is available on the path that needs it.

### 5. Validate with temporary prompts

Use temporary prompts during creation or review to cover:

- Each invocation branch.
- Realistic near-misses that belong to the base model or another skill.
- Ambiguous requests observed in use.
- Completion criteria where failure has the greatest impact.

Use an isolated session when practical.
Otherwise, walk through invocation and execution explicitly.
Record which method you used.
Convert failures into corrections to the relevant instructions.

Completion criterion: Each case has an observed result or an explicit walkthrough.

### 6. Prune and finish

Apply the token cost review below.
Remove stale rules.

State the required behavior.
Retain prohibitions for hard guardrails, paired with the required alternative.
Remove temporary prompt artifacts.
Keep deterministic helper tests.
Run the structural validator below.
Check relative references separately.

Completion criterion: Each instruction has a task-specific purpose. No validation failures or temporary prompt artifacts remain.

## Review order

Apply the rules above in this order: invocation, execution, information hierarchy, pruning, behavioral validation, structure.
Include the token cost review during pruning.
Report findings with file locations, impact, and corrections.
Distinguish walkthroughs from observed behavior.

### Token cost review

Measure the description, loaded body, and conditional resources separately.
Record the tokenizer, measured files, and counts.
Compare revisions with the same tokenizer.
If token counts are unavailable, label word or character counts as proxies.
Count conditional resources only on paths that load them.

1. **Redundant wording.** Find repeated rules, overlapping triggers, and explanations that add no task-specific decision.
   Keep one authoritative definition per rule.
   Record whether to keep, merge, remove, or move each candidate.
2. **Model knowledge.** Identify the decision each explanation changes.
   Treat general knowledge as a removal candidate, not proof that an instruction is unnecessary.
   Compare uncertain candidates with and without the text, using the same model and representative prompts.
   Record the model and comparison method.
   If runs are unavailable, record a walkthrough.
   Retain rules whose value remains uncertain.
   Preserve required constraints, failure recovery, exceptions, and team conventions.
3. **ASD-STE100.** Check one action per instruction, consistent terminology, and literal wording.
   For English, limit procedural sentences to 20 words and descriptive sentences to 25 words.
   Use the standard's word-count rules.
   Check dictionary usage and technical terms against the [official standard](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf).
   Report checked rules and verification limits.
   Claim full compliance only after checking all applicable writing rules and dictionary requirements.
   For other languages, apply the principles without claiming formal ASD-STE100 compliance.

Completion criterion: All three checks have findings and evidence, or explicit verification limits.

### Review resources

Use these assets when their format is useful:

- `assets/skill-template.md` for a new draft.
- `assets/review-checklist.md` for a binary review.
- `assets/review-rubric.md` for a scored review.

Read `references/anti-patterns.md` to diagnose excessive length, invocation errors, or inconsistent execution.
Read `references/perplexity-original-article.md` only to check source wording or provenance.
The source article does not define current repository policy.

## Structural validator

After writing or reviewing a skill, run:

```bash
python3 <skill-design-guidelines-root>/scripts/validate_skill.py /path/to/skill
```

Add `--json` for machine-readable output.
The validator checks structure only.
Invocation, execution, and prompt coverage require behavioral validation.
