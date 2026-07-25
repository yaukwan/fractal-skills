# Skill Anti-Patterns

Read this reference when a skill is difficult to route, inconsistent in execution, bloated, or expensive to maintain.

## 1. No-op instruction

The skill repeats behavior the model already performs reliably.

Signals:

- generic advice such as `be clear` or `be thorough`
- textbook explanations with no task-specific consequence
- process narration that does not change a decision

Correction:

- delete the instruction
- if behavior still varies, replace it with a checkable completion criterion or a stronger domain rule

## 2. Duplication

The same meaning has multiple authoritative homes.

Signals:

- routing rules repeated in the description, body, checklist, and README
- a triad restated with different wording across several sections
- updates that require synchronized edits to multiple files

Correction:

- choose one source of truth
- replace copies with a compact term or context pointer

## 3. Sediment

Old guidance remains after the skill's contract changes.

Signals:

- dated reviews describe files or behavior that no longer exist
- historical decisions appear as current instructions
- a section survives because nobody can explain whether it is still needed

Correction:

- delete stale current-state material
- retain genuine history only in a changelog or archival source

## 4. Feature-summary description

The description explains capabilities but does not let the agent choose the skill reliably.

Signals:

- catalog copy such as `helps with project work`
- implementation details without user intent
- many synonyms for one branch but no distinct branch coverage

Correction:

- state the owned task class and when it applies
- keep one trigger per branch
- add a nearby boundary only where confusion is plausible

## 5. Weak context pointer

A referenced file exists, but the agent cannot tell when or why to read it.

Signals:

- bare lists of filenames
- `see reference.md for details`
- required behavior hidden behind an optional-sounding pointer

Correction:

- name the condition that activates the pointer
- state what the file contributes to the current task
- inline the rule if every branch needs it

## 6. Root sprawl

`SKILL.md` carries conditional detail needed by only a subset of runs.

Signals:

- long variant-specific examples interrupt the main process
- schemas or source articles dominate the root file
- agents must scan unrelated branches before acting

Correction:

- disclose branch-specific reference behind explicit pointers
- keep universal steps and rules inline
- split by sequence only when premature completion is observed

## 7. Vague completion

An ordered step lacks a checkable stopping rule.

Signals:

- `review the code`, `understand the context`, or `validate the result`
- later steps begin before all affected branches or files are accounted for
- repeated partial completion across runs

Correction:

- define observable completion
- make the bound exhaustive where omissions are costly
- hide later steps only if a clear bound still fails to prevent rushing

## 8. Prohibition-only steering

The skill names an unwanted behavior without making the target behavior salient.

Signals:

- long lists of `do not` rules
- the correct replacement is left implicit
- the prohibited pattern appears more often after the warning

Correction:

- lead with the desired behavior
- retain a prohibition only as a hard guardrail
- pair each retained guardrail with the required alternative

## 9. Optional-directory theater

The skill creates or requires support directories without content that earns them.

Signals:

- empty `scripts/`, `references/`, or `assets/`
- validators warn about absent optional directories
- templates prescribe a full tree for every skill

Correction:

- create support files only for real callers
- validate optional content when present, not directory presence itself

## 10. Validation theater

A structural pass is treated as evidence that the skill routes and executes correctly.

Signals:

- a linter result substitutes for representative prompts
- routing quality is inferred from description syntax
- ambiguous cases are recorded as `may trigger` rather than resolved

Correction:

- separate structural validation from behavioral judgment
- exercise realistic intended and near-miss prompts temporarily
- turn observed failures into durable contract changes
