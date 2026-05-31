# Skill Anti-Patterns

Use this file during review when a skill feels bloated, vague, or unreliable.

## 1. Documentation cosplay

The skill reads like a README for humans.

Symptoms:

- long background sections
- detailed installation/tutorial prose
- repeated explanations of common tools

Fix:

- remove generic explanations
- keep only behavior-changing guidance

## 2. Command spam

The skill hardcodes exact command sequences the model already knows.

Symptoms:

- numbered shell commands for common tasks
- rigid paths that break when reality differs

Fix:

- rewrite as goals, constraints, and fallback rules

## 3. Feature-summary description

The description says what the skill does, not when to load it.

Symptoms:

- starts with "This skill helps..."
- reads like catalog copy

Fix:

- start with `Load when...`
- phrase triggers in user language

## 4. Missing boundaries

The skill sounds useful for too many requests.

Symptoms:

- overlap with adjacent skills
- frequent false-positive routing

Fix:

- add explicit non-goals and neighbor boundaries
- add negative evals

## 5. Root-file obesity

The main `SKILL.md` carries everything.

Symptoms:

- long walls of examples
- schemas embedded inline
- edge cases mixed into the happy path

Fix:

- move deep material to `references/`
- move templates to `assets/`
- keep root focused on routing and operating rules

## 6. No gotchas

The skill describes the happy path only.

Symptoms:

- no warnings
- no failure branches
- no common mistakes recorded

Fix:

- add negative examples
- add failure handling and boundary rules

## 7. No eval thinking

The skill exists, but there is no proof it routes or improves correctly.

Symptoms:

- no positive test prompts
- no negative routing tests
- no history of known failure cases

Fix:

- add routing evals first
- maintain them as regressions appear
