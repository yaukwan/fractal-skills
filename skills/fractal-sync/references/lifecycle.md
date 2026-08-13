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

## Event → Doc action

| Event | Action |
|---|---|
| New module / submodule | Update local `AGENTS.md` with ownership + constraints |
| PRD needs task specification | Create spec doc in `docs/specs/` using `to-task-specs` |
| Folder ownership changed | Update local `AGENTS.md` scope, members, docs links |
| New top-level area or global constraint changed | Update repo entrypoint docs; root `AGENTS.md` only if the repo already manages one outside fractal-skill writes |
| Design decision changed | Update `.agents/skills/decision-{slug}/SKILL.md` via `decision-capture` and sync engineering notes if needed |
| Long debugging / durable lesson | Create postmortem using `YYYYMMDD-bug-description-en.md` |
| Feature removed | Move docs to archive + add tombstone |
| Performance optimization | Update benchmarks / debt in engineering |
| Upstream divergence | Create divergence doc + update local `AGENTS.md` |

## Stable Decision Rule

稳定决策保留 current state；变更另写 amendment，不把历史塞进 `AGENTS.md`。

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
