# Skill Review Rubric

Use `SKILL.md` as the rule source.
Score each category from 1 to 5 using the anchors below.
Record evidence for each score.
Require a structural validation pass before scoring.

## 1. Invocation Predictability

### 5
The task class, invocation mode, branches, and boundaries distinguish intended requests from realistic near-misses.

### 3
The main intent is clear, but branches overlap or depend on unverified harness support.

### 1
The description lists capabilities without usable invocation conditions.

## 2. Execution Predictability

### 5
The body specifies consequential decisions and failure recovery across varied inputs.

### 3
Normal execution is clear, but decisions or failure recovery remain implicit.

### 1
The body gives general advice without instructions for required decisions.

## 3. Completion Quality

### 5
Each ordered step has a checkable completion criterion that covers costly omissions.

### 3
Some completion criteria permit early or partial completion.

### 1
Steps use vague goals such as `review` without checkable completion criteria.

## 4. Information Hierarchy

### 5
Universal rules remain inline. Each conditional resource has a precise pointer and a caller.

### 3
Some pointers are vague, files have no callers, or conditional details interrupt the main process.

### 1
Required rules are inaccessible or unrelated details obscure the process.

## 5. Maintenance Discipline

### 5
Rules have single authoritative definitions. Instructions state required behavior. Representative validation covers invocation and execution.

### 3
Some instructions are duplicated or unnecessary, or realistic near-misses remain unchecked.

### 1
Structural checks replace behavioral validation, or stale rules conflict with current requirements.

## 6. Token Cost Review

### 5
Measurements identify the loaded scope.
All three token cost checks have evidence or explicit verification limits.
Required behavior is preserved.

### 3
Measurements exist, but redundancy, model-knowledge assumptions, or ASD-STE100 checks lack evidence or explicit verification limits.

### 1
Token savings override required behavior, or model familiarity is treated as proof that instructions are unnecessary.
