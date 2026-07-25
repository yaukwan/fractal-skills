# Skill Review Checklist

Use this as a binary pass before shipping or merging a skill.

## Contract

- [ ] The skill changes behavior the base model does not handle reliably enough
- [ ] The target harness and any nonstandard invocation controls are known
- [ ] The invocation mode is deliberate
- [ ] Each distinct branch has one clear owner

## Description

- [ ] It states what task class the skill owns
- [ ] It states when each distinct branch should activate
- [ ] Synonyms do not masquerade as separate branches
- [ ] Boundaries cover only realistic neighboring cases

## Execution

- [ ] Every ordered step has a checkable completion criterion
- [ ] Exhaustive criteria cover omissions that would be costly
- [ ] Decision rules and failure recovery are explicit where inference is unsafe
- [ ] Instructions prefer the target behavior over prohibition-only steering

## Information hierarchy

- [ ] Universal rules remain in `SKILL.md`
- [ ] Conditional material is behind a precise context pointer
- [ ] Each pointer says when to use the target and what it contributes
- [ ] Supporting paths are relative to the skill root
- [ ] Optional directories and files have real callers

## Pruning

- [ ] Every remaining sentence changes behavior
- [ ] Each meaning has one source of truth
- [ ] Stale reviews, historical policy, and dead branches are removed or archived
- [ ] The root file contains no branch-specific sprawl

## Temporary validation

- [ ] Every invocation branch has a representative prompt
- [ ] Realistic near-misses have been checked
- [ ] High-risk completion criteria have been exercised or walked through
- [ ] Failures were converted into durable contract changes
- [ ] Temporary validation artifacts were removed

## Structure

- [ ] `SKILL.md` frontmatter passes the portable structural validator
- [ ] Relative links resolve
- [ ] Scripts or generated assets have focused deterministic tests when warranted
