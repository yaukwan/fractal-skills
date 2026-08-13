# Repository Lifecycle Rules

## Document Lanes

- `docs/engineering/`: implementation notes, benchmarks, debt, migrations, and workarounds
- `docs/research/`: explorations, alternatives, and experiments
- `docs/postmortem/`: defect and incident root-cause records
- `docs/specs/`: AI-generated executable task specifications
- `docs/archive/`: retired documents and tombstones

Design decisions live at `.agents/skills/decision-{slug}/SKILL.md` and are managed by `decision-capture`; they are not a repository document lane.

## Naming

- Use lowercase kebab-case unless a lane requires a date prefix.
- Engineering: `query-perf-benchmark.md`
- Research: `cache-alternatives.md`
- Postmortem: `YYYYMMDD-bug-description-en.md`
- Specs: `YYYY_MM_dd_task-name.md`
- Archive: preserve the original searchable name when possible.

## Archive Rule

归档时保留：
- death date
- reason
- replacement
- last relevant links

When moving a document into `docs/archive/`, update active indexes and leave a tombstone or replacement pointer where callers would otherwise lose the trail.

## AGENTS.md Rule

- `AGENTS.md` 只描述 current state。
- 不往 root 或 local `AGENTS.md` 追加 dated history。
- 没有强约定时，不要新增 `Dependencies` 或 `Review Triggers`。
- 更新 section，不要把整个文件当 append-only 日志。
