# Fractal Skills

[English](./README.md) | [简体中文](./README.zh.md)

[![skills.sh](https://skills.sh/b/yaukwan/fractal-skills)](https://skills.sh/yaukwan/fractal-skills)

AI-native documentation orchestration skills for coding agent projects — a three-layer context protocol (L1 root / L2 folder / L3 file) with full lifecycle management from setup through postmortem.

## Quickstart

```bash
npx skills add yaukwan/fractal-skills
```

`npx skills add` makes all Fractal Skills available to your coding agent.

## Why Fractal Skills

### The problem

Coding agents rely on project-level context — `AGENTS.md`, decision docs, local contracts — to make correct architectural choices. But documentation drifts. Decisions go stale. Folder-level context (`AGENTS.md`) goes missing or becomes outdated. When an agent builds on stale authority, it produces implementations that conflict with current system truth.

Without a structured protocol for keeping context in sync, every task starts with invisible technical debt: the agent doesn't know what it doesn't know.

### The solution

Fractal Skills provides a **three-layer context protocol** that mirrors how software is actually organized:

| Layer | Scope | Contract |
|-------|-------|----------|
| **Level 1** | Project root | Global topology, entry points, cross-cutting constraints |
| **Level 2** | Folder / bounded context | Local ownership, scope boundaries, member modules |
| **Level 3** | Source file | Current contract: inputs, outputs, role, invariants |

Eight source skills cover the build-and-maintain lifecycle:

1. **Bootstrap** the documentation structure (`fractal-setup`)
2. **Extract** module contracts for one target or a whole project into local `AGENTS.md` files (`fractal-agents-fill`)
3. **Synchronize** code and documentation through L3, L2, L1, and repository lifecycle (`fractal-sync`)
4. **Capture** decisions and keep design truth current (`decision-capture`)
5. **Generate** executable task specs from resolved context (`to-task-specs`)
6. **Execute** approved task specs with verified progress and status writeback (`impl-task-spec`)
7. **Record** root-cause postmortems for bugs and incidents (`postmortem`)
8. **Guide** skill authoring and validation (`skill-design-guidelines`)

No project-local runtime or configuration is installed. Write eligibility comes from the project itself: an existing L2 manifest or L3 header is kept in sync, a new one is created only on request, and deleting one stops its maintenance. To keep a path out, add an exclusion rule to the project instructions, such as a root `AGENTS.md` `Global Constraints` entry.

### Core advantages

- **Context stays in sync with code.** The protocol defines when and how to refresh each layer — stale authority won't silently drive wrong implementations.
- **Decision authority is explicit.** `decision-capture` enforces that `.agents/skills/decision-*/SKILL.md` holds current design truth, not an ADR graveyard — and each decision is a discoverable project skill that agents load during implementation.
- **Single responsibility, composable flow.** Each skill does one thing. Skills can be used independently or orchestrated through `FILL → DECIDE → SPEC → BUILD → POSTMORTEM`.
- **AI-native from the ground up.** Headers, manifests, and contracts are designed for machine readability and low-token consumption — not for human wiki browsing.

## Composing with execution-skill ecosystems

Fractal Skills is the **knowledge substrate**: it maintains `AGENTS.md` traversal context, current decision authority, task specs, and postmortems. It does not try to own implementation, TDD, debugging, or review loops.

Execution-skill ecosystems can consume the context Fractal maintains. Use Fractal to refresh local contracts before planning, confirm decision truth before specs, and write postmortems after defect fixes; then use your execution skills for build, test, diagnosis, and review.

The `BUILD` stage can use `impl-task-spec` as a thin execution protocol: it tracks verified task completion, records evidence, and updates spec status while composing with the project's existing implementation, test, diagnosis, and review practices.

## Source Skills

- **[fractal-setup](./skills/fractal-setup/SKILL.md)** — Bootstrap the `docs/` layout and offer the domain-language bridge. Installs no runtime or configuration.
- **[fractal-agents-fill](./skills/fractal-agents-fill/SKILL.md)** — Extract and write module contracts from a supplied project or module path. Supports one target module or project-wide discovery, refreshes existing manifests, creates new ones only for the requested target or after one creation confirmation, and reports ambiguous boundaries without blocking independent modules.
- **[fractal-sync](./skills/fractal-sync/SKILL.md)** — Synchronize code and documentation as two views of current truth. Runs L3 → L2 → L1 ripple checks over existing artifacts, validates documentation back against code, and maintains repository placement, frontmatter, indexes, and lifecycle.
- **[decision-capture](./skills/decision-capture/SKILL.md)** — Full decision lifecycle for the current task. Checks whether existing decision skills still cover the truth, then creates, updates, supersedes, or merges decision skills so current design authority is unambiguous. Decisions live at `.agents/skills/decision-*/SKILL.md`.
- **[to-task-specs](./skills/to-task-specs/SKILL.md)** — Generate executable task specifications from a PRD, resolved context, or conversation context. Groups tasks by functional domain, inherits decision constraints, and produces verifiable acceptance criteria.
- **[impl-task-spec](./skills/impl-task-spec/SKILL.md)** — Implement or resume an approved task spec, verify tasks before checking them off, and write execution evidence and document status back to the spec.
- **[postmortem](./skills/postmortem/SKILL.md)** — Structured root-cause records for bugs, regressions, and incidents. Records symptom, impact, root cause, fix applied, verification, and prevention steps. Required when the primary task nature is defect correction.
- **[skill-design-guidelines](./skills/skill-design-guidelines/SKILL.md)** — Independent Agent Skills authoring and maintenance guidance. Covers invocation design, predictable execution, completion criteria, progressive disclosure, pruning, temporary prompt validation, and portable structural checks.

## Orchestration Flow

```
FILL → DECIDE → SPEC → BUILD → POSTMORTEM
```

- **SETUP** — `fractal-setup`: bootstrap the docs layout, outside the main flow.
- **FILL** — `fractal-agents-fill`: extract target-module or project-wide contracts and write local `AGENTS.md` files.
- **DECIDE** — `decision-capture`: check decision coverage and update decision skills until current truth is documented.
- **SPEC** — `to-task-specs`: turn resolved context into a build-ready task document.
- **BUILD** — `impl-task-spec`: execute the approved spec with your normal implementation, TDD, diagnosis, and review skills, keeping spec progress and status current.
- **POSTMORTEM** — `postmortem`: required when the primary task nature is defect correction.
- **AUXILIARY** — `fractal-sync` closes the code/document loop outside the main delivery stages.
