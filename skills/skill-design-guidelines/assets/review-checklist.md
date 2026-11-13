# Skill Review Checklist

Apply the rules in `SKILL.md` before shipping or merging a skill.

## Contract

- [ ] The skill addresses a behavior, knowledge, or helper need.
- [ ] The harness supports the invocation mode and nonstandard controls.
- [ ] Each branch has one owner and an expected result.

## Description

- [ ] The description states the task class and one trigger per branch.
- [ ] Boundaries distinguish realistic near-misses.

## Execution

- [ ] Each ordered step has a checkable completion criterion.
- [ ] Completion criteria cover all items where omissions cause errors.
- [ ] Consequential decisions and failure recovery are explicit.
- [ ] Instructions use consistent terms and one action per sentence.

## Information hierarchy

- [ ] Universal rules remain in `SKILL.md`.
- [ ] Conditional resources have callers and relative paths.
- [ ] Each pointer states its condition, contribution, and use.

## Pruning

- [ ] Each instruction has a task-specific purpose and one authoritative definition.
- [ ] Stale rules and duplicate instructions are removed.
- [ ] Guardrails state the required alternative.

## Token cost

- [ ] Counts identify the tokenizer and loaded scope, or explicitly use proxy measurements.
- [ ] Redundant wording has keep, merge, remove, or move decisions.
- [ ] Model-knowledge claims have comparison evidence or explicit verification limits.
- [ ] Required constraints survive pruning.
- [ ] ASD-STE100 checks cover sentences, terminology, and dictionary requirements.
- [ ] The report distinguishes checked rules from full compliance.

## Temporary validation

- [ ] Cases cover all branches, realistic near-misses, and consequential completion criteria.
- [ ] Observed ambiguous requests have cases.
- [ ] Results distinguish model runs from walkthroughs.
- [ ] Failures have corrections in the instructions.
- [ ] Temporary prompt artifacts are removed.

## Structure

- [ ] The structural validator passes.
- [ ] Relative references resolve.
- [ ] Deterministic helper tests pass where applicable.
