# Fractal Skills

[English](./README.md) | [简体中文](./README.zh.md)

[![skills.sh](https://skills.sh/b/yaukwan/fractal-skills)](https://skills.sh/yaukwan/fractal-skills)

AI-native documentation orchestration skills for coding agent projects — a three-layer context protocol (L1 root / L2 folder / L3 file) with full lifecycle management from setup through postmortem.

## Quickstart

### Install skills

```bash
npx skills add yaukwan/fractal-skills
```

### Optional OpenCode setup

```bash
npx github:yaukwan/fractal-skills install
```

`npx skills add` makes all Fractal Skills available to your coding agent. The optional `npx github:yaukwan/fractal-skills install` command generates a personalized `~/.config/opencode/AGENTS.md` and installs the `fractal` orchestrator agent definition.

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

Nine source skills cover the build-and-maintain lifecycle. `fractal-setup` also emits the project-local `fractal-scope` runtime used by downstream gates:

1. **Bootstrap** the documentation structure and scope runtime (`fractal-setup`)
2. **Audit** health — find stale decisions, missing context, lane issues (`fractal-audit`)
3. **Fill** missing or stale folder contracts from code (`fractal-agents-fill`)
4. **Maintain** repo-level placement, naming, and lifecycle (`fractal-repo`)
5. **Normalize** schema semantics when headers drift (`fractal-context`)
6. **Capture** decisions and keep design truth current (`decision-capture`)
7. **Generate** executable task specs from resolved context (`to-task-specs`)
8. **Record** root-cause postmortems for bugs and incidents (`postmortem`)
9. **Guide** skill authoring and validation (`skill-design-guidelines`)

The generated `.agents/skills/fractal-scope/` is owned by the consuming project. It configures L2/L3 write scope and runs its local deterministic checker; it is not distributed as a standalone source skill.

### Core advantages

- **Context stays in sync with code.** The protocol defines when and how to refresh each layer — stale authority won't silently drive wrong implementations.
- **Decision authority is explicit.** `decision-capture` enforces that `.agents/skills/decision-*/SKILL.md` holds current design truth, not an ADR graveyard — and each decision is a discoverable project skill that agents load during implementation.
- **Single responsibility, composable flow.** Each skill does one thing. Skills can be used independently or orchestrated through `FILL → DECIDE → SPEC → BUILD → POSTMORTEM`.
- **AI-native from the ground up.** Headers, manifests, and contracts are designed for machine readability and low-token consumption — not for human wiki browsing.

## Composing with execution-skill ecosystems

Fractal Skills is the **knowledge substrate**: it maintains `AGENTS.md` traversal context, current decision authority, task specs, and postmortems. It does not try to own implementation, TDD, debugging, or review loops.

Execution-skill ecosystems can consume the context Fractal maintains. Use Fractal to refresh local contracts before planning, confirm decision truth before specs, and write postmortems after defect fixes; then use your execution skills for build, test, diagnosis, and review.

The `BUILD` stage has no Fractal-specific skill by design. It is the handoff point where external execution verbs act on the context Fractal made current.

## Source Skills

- **[fractal-setup](./skills/fractal-setup/SKILL.md)** — Bootstrap or repair the `docs/` layout and self-contained project-local `.agents/skills/fractal-scope/` runtime. Existing project-owned scope config is preserved during repair.
- **Generated runtime template:** [fractal-scope](./skills/fractal-setup/assets/fractal-scope/SKILL.template.md) — Project-local scope configuration and deterministic L2/L3 matcher emitted by `fractal-setup`; not installed as a standalone source skill.
- **[fractal-audit](./skills/fractal-audit/SKILL.md)** — Report-only fractal health scan. Ranks stale decisions, missing or stale `AGENTS.md` files, and lane-placement issues. Does not fix — produces a ranked repair report.
- **[fractal-agents-fill](./skills/fractal-agents-fill/SKILL.md)** — Fill or refresh a directory's local `AGENTS.md` contract by reading code and nearby docs. Asks focused questions for unresolved local intent before writing.
- **[fractal-repo](./skills/fractal-repo/SKILL.md)** — Repository-level document topology: placement across `engineering / research / postmortem / specs / archive`, naming conventions, frontmatter, indexes, and lifecycle transitions. Decision skills live at `.agents/skills/decision-*/`.
- **[fractal-context](./skills/fractal-context/SKILL.md)** — Guardian of the Level 1/2/3 fractal schema. Normalizes file headers, validates folder manifest semantics, and runs ripple checks after code changes. Only writes within scoped fractal repos.
- **[decision-capture](./skills/decision-capture/SKILL.md)** — Full decision lifecycle for the current task. Checks whether existing decision skills still cover the truth, then creates, updates, supersedes, or merges decision skills so current design authority is unambiguous. Decisions live at `.agents/skills/decision-*/SKILL.md`.
- **[to-task-specs](./skills/to-task-specs/SKILL.md)** — Generate executable task specifications from a PRD, resolved context, or conversation context. Groups tasks by functional domain, inherits decision constraints, and produces verifiable acceptance criteria.
- **[postmortem](./skills/postmortem/SKILL.md)** — Structured root-cause records for bugs, regressions, and incidents. Records symptom, impact, root cause, fix applied, verification, and prevention steps. Required when the primary task nature is defect correction.
- **[skill-design-guidelines](./skills/skill-design-guidelines/SKILL.md)** — Independent Agent Skills authoring and maintenance guidance. Covers invocation design, predictable execution, completion criteria, progressive disclosure, pruning, temporary prompt validation, and portable structural checks.

## Orchestration Flow

```
FILL → DECIDE → SPEC → BUILD → POSTMORTEM
```

- **SETUP** — `fractal-setup`: bootstrap the docs layout and project-local scope runtime, outside the main flow.
- **FILL** — `fractal-agents-fill`: fill missing local contract context and refresh `AGENTS.md` when needed.
- **DECIDE** — `decision-capture`: check decision coverage and update decision skills until current truth is documented.
- **SPEC** — `to-task-specs`: turn resolved context into a build-ready task document.
- **BUILD** — Execute the approved spec with your normal implementation, TDD, diagnosis, and review skills.
- **POSTMORTEM** — `postmortem`: required when the primary task nature is defect correction.
- **AUXILIARY** — `fractal-audit`, `fractal-repo`, and `fractal-context` are helper skills available outside the main delivery flow.

## OpenCode Agents (Optional)

The `opencode-agents/` directory contains reference agent definitions for OpenCode users:

- **`fractal`** — Primary orchestrator that drives the `FILL → DECIDE → SPEC → BUILD → POSTMORTEM` flow.
- **`gstack`** — Integration agent for gstack toolchain compatibility.

`npx github:yaukwan/fractal-skills install` installs `fractal.md` alongside `AGENTS.md` generation. `gstack.md` remains a reference file that can be manually copied into `~/.config/opencode/agents/` if you want that integration.
