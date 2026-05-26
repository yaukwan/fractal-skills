# Decision Rules

Use these rules after the skill is selected to decide whether a postmortem is required for the current task.

A postmortem is required when the primary nature of the task is defect correction.

## Trigger if any of these are true
- restores expected behavior
- fixes a regression
- fixes broken logic
- repairs failing behavior in production or staging
- addresses reliability or correctness defects
- resolves user-visible malfunction
- resolves an incident or near-miss caused by incorrect system behavior

## Usually does not trigger
- net-new feature development
- visual polish with no defect
- code cleanup only
- renaming, formatting, or restructuring without behavior change

## Mixed Cases
Ask:

> What is the primary reason this task exists?

If the main reason is defect correction, create a postmortem.
