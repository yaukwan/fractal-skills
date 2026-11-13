# Skill Anti-Patterns

Use these signals to diagnose failures against the rules in `SKILL.md`.

## 1. No-op instruction

Signal: General advice such as `be clear` adds no task-specific decision.

Correction: Compare behavior with and without the instruction.
Remove it if behavior is unchanged.
If failures remain, specify a completion criterion or domain rule that prevents them.

## 2. Duplication

Signal: Changing one rule requires edits to several independent definitions.

Correction: Keep one authoritative definition.
Replace other definitions with references to it.

## 3. Stale rules

Signal: Reviews describe deleted files, or historical decisions appear as current instructions.

Correction: Remove obsolete instructions.
Keep required history in a changelog or source archive.

## 4. Feature-summary description

Signal: A description says `helps with project work` or lists implementation details without invocation conditions.

Correction: Replace capabilities with the task class and distinct triggers.
Add boundaries where realistic requests would select the wrong skill.

## 5. Weak context pointer

Signal: `See reference.md for details` does not identify a condition or task use.

Correction: State when to read the file and how its contents affect the task.
If every branch needs the rule, keep it inline.

## 6. Misplaced content

Signal: Conditional examples, schemas, or source articles interrupt the main process.

Correction: Move them to conditional resources.
Keep universal rules inline.

## 7. Vague completion

Signal: `Review the code` permits completion before all affected files have been checked.

Correction: Name the required coverage and observable result.
If early completion continues, apply the sequence rule in `SKILL.md`.

## 8. Prohibition-only steering

Signal: Repeated prohibitions leave the correct action unspecified.

Correction: State the required behavior.
For necessary guardrails, add the required alternative.

## 9. Unused directories

Signal: Templates require empty support directories, or validators reject their absence.

Correction: Create support files only for real callers.
Validate optional content when present.

## 10. Missing behavioral validation

Signal: A structural pass is the only evidence for correct invocation or execution.

Correction: Validate intended requests, realistic near-misses, and consequential completion criteria.
Identify walkthroughs separately from model runs.
Convert failures into corrected instructions.
