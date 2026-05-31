# Skill Review Rubric

Score each category from 1 to 5.

## 1. Routing Precision

### 5
Description is concise, trigger-oriented, grounded in user intent, and has clear boundaries.

### 3
Description is mostly usable but somewhat generic or slightly overlaps neighboring skills.

### 1
Description is a feature summary, vague, or likely to cause false positives.

## 2. Body Signal Density

### 5
Nearly every sentence changes model behavior or preserves quality under ambiguity.

### 3
Useful overall, but includes generic explanation or some obvious content.

### 1
Mostly documentation, background, or redundant instructions.

## 3. Gotchas and Boundaries

### 5
Includes common mistakes, negative examples, and neighboring-skill boundaries.

### 3
Includes some warnings but misses major failure modes.

### 1
Only describes the happy path.

## 4. Progressive Structure

### 5
Root is lean; heavy material is correctly split into support files.

### 3
Some splitting exists, but the root still carries too much.

### 1
Everything is flattened into one large root file.

## 5. Evaluation Readiness

### 5
Positive, negative, and boundary-routing evals exist and clearly test intended behavior.

### 3
Some test prompts exist but do not meaningfully cover failure and confusion cases.

### 1
No clear eval coverage.
