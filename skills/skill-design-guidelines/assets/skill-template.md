---
name: my-skill
description: <What task class this skill owns and when each distinct branch should invoke it>
---

# My Skill

## Purpose

<State the behavior this skill makes more predictable than the base model.>

## Invocation

- Mode: <model-invoked or user-invoked, subject to target harness support>
- Owned branches: <one entry per distinct branch>
- Nearest boundaries: <only plausible competing tasks or skills>

## Process

### 1. <Action>

<Behavior-changing instructions.>

Completion: <checkable stopping condition>.

### 2. <Action>

<Behavior-changing instructions.>

Completion: <checkable stopping condition>.

## Decision rules

- When A, prefer ... because ...
- When B, switch to ...
- If C fails, recover by ...

## Conditional resources

- When <condition>, read `references/<file>.md` for <decision or information>.
- When <condition>, use `assets/<file>` as <input or output template>.
- When <condition>, run `scripts/<file>` to <deterministic result>.

## Output contract

<Include only constraints that materially affect correctness or reviewability.>

## Temporary validation

During creation or review, exercise each invocation branch, its nearest realistic miss, and the highest-risk completion criterion. Convert failures into the contract above; remove temporary artifacts before finishing.
