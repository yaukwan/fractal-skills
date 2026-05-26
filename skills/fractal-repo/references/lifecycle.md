# Lifecycle Rules

## Event → Doc action

| Event | Action |
|---|---|
| New module / submodule | Update local `AGENTS.md` with ownership + constraints |
| PRD needs task specification | Create spec doc in `docs/specs/` using `to-task-specs` |
| Folder ownership changed | Update local `AGENTS.md` scope, members, docs links |
| New top-level area or global constraint changed | Update repo entrypoint docs; root `AGENTS.md` only if the repo already manages one outside fractal-skill writes |
| Design decision changed | Update `docs/decisions/` and sync engineering notes if needed |
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

## AGENTS.md Rule

- `AGENTS.md` 只描述 current state。
- 不往 root 或 local `AGENTS.md` 追加 dated history。
- 没有强约定时，不要新增 `Dependencies` 或 `Review Triggers`。
- 更新 section，不要把整个文件当 append-only 日志。
