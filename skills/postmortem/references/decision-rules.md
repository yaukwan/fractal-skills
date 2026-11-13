# Decision Rules

Apply the Core Rule in `SKILL.md` after resolving these boundary cases:

- For mixed feature and fix work, use the primary reason the task exists.
- A failing test qualifies when it exposes a real behavior defect; test maintenance alone does not.
- Refactoring, polish, formatting, and renaming qualify only when the primary goal is restoring expected behavior.
- An incident or near-miss qualifies when caused by incorrect system behavior; new reliability capabilities alone are feature work.
