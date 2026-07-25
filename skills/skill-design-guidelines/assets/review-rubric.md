# Skill Review Rubric

Score each category from 1 to 5. A structural lint pass is a prerequisite, not a scored category.

## 1. Invocation Predictability

### 5
The owned task class, invocation mode, distinct branches, and realistic boundaries let the agent select the skill consistently.

### 3
The main intent is recognizable, but some branches overlap, duplicate synonyms, or rely on harness assumptions.

### 1
The description is generic capability copy or the skill has no coherent invocation contract.

## 2. Execution Predictability

### 5
The body makes consequential decisions explicit, handles failure, and drives the same process across varied inputs.

### 3
The happy path is usable, but important decisions or recovery behavior remain implicit.

### 1
The body is mostly exposition, generic advice, or brittle command narration.

## 3. Completion Quality

### 5
Every ordered step has a checkable stopping rule, with exhaustive bounds where omissions are costly.

### 3
Most steps are bounded, but some allow early or partial completion.

### 1
The process relies on vague goals such as `review`, `understand`, or `validate` without observable completion.

## 4. Information Hierarchy

### 5
Universal rules are inline, conditional material is disclosed through precise pointers, and every support file has a real caller.

### 3
The layout is usable but contains weak pointers, unnecessary scaffolding, or misplaced branch detail.

### 1
Required behavior is hidden, the root sprawls across unrelated branches, or support files are decorative.

## 5. Maintenance Discipline

### 5
The skill has one source of truth per meaning, no stale sediment, strong positive steering, and representative temporary validation.

### 3
The skill is mostly current but carries some duplication, no-ops, or untested near-misses.

### 1
Static validation substitutes for behavior review, or stale and duplicated guidance makes the contract unreliable.
