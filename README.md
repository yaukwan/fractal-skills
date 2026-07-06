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

Ten single-responsibility skills cover the entire build-and-maintain lifecycle:

1. **Bootstrap** the documentation structure (`fractal-setup`)
2. **Configure** scope gates for downstream writes (`fractal-scope`)
3. **Audit** health — find stale decisions, missing context, lane issues (`fractal-audit`)
4. **Fill** missing or stale folder contracts from code (`fractal-agents-fill`)
5. **Maintain** repo-level placement, naming, and lifecycle (`fractal-repo`)
6. **Normalize** schema semantics when headers drift (`fractal-context`)
7. **Capture** decisions and keep design truth current (`decision-capture`)
8. **Generate** executable task specs from resolved context (`to-task-specs`)
9. **Record** root-cause postmortems for bugs and incidents (`postmortem`)
10. **Guide** skill authoring and validation (`skill-design-guidelines`)

### Core advantages

- **Context stays in sync with code.** The protocol defines when and how to refresh each layer — stale authority won't silently drive wrong implementations.
- **Decision authority is explicit.** `decision-capture` enforces that `.agents/skills/decision-*/SKILL.md` holds current design truth, not an ADR graveyard — and each decision is a discoverable project skill that agents load during implementation.
- **Single responsibility, composable flow.** Each skill does one thing. Skills can be used independently or orchestrated through `FILL → DECIDE → SPEC → BUILD → POSTMORTEM`.
- **AI-native from the ground up.** Headers, manifests, and contracts are designed for machine readability and low-token consumption — not for human wiki browsing.

## Skills

- **[fractal-setup](./skills/fractal-setup/SKILL.md)** — One-time manual bootstrap of the `docs/` directory layout and project-level `.agents/skills/fractal-scope/` output. Run once per project to establish the fractal documentation structure and downstream skill gating.
- **[fractal-scope](./skills/fractal-scope/SKILL.md)** — Project-local scope gate package and deterministic matcher for L2/L3 write permissions. Owns `config.yaml` defaults and `scripts/check-scope.js`.
- **[fractal-audit](./skills/fractal-audit/SKILL.md)** — Report-only fractal health scan. Ranks stale decisions, missing or stale `AGENTS.md` files, and lane-placement issues. Does not fix — produces a ranked repair report.
- **[fractal-agents-fill](./skills/fractal-agents-fill/SKILL.md)** — Fill or refresh a directory's local `AGENTS.md` contract by reading code and nearby docs. Asks focused questions for unresolved local intent before writing.
- **[fractal-repo](./skills/fractal-repo/SKILL.md)** — Repository-level document topology: placement across `engineering / research / postmortem / specs / archive`, naming conventions, frontmatter, indexes, and lifecycle transitions. Decision skills live at `.agents/skills/decision-*/`.
- **[fractal-context](./skills/fractal-context/SKILL.md)** — Guardian of the Level 1/2/3 fractal schema. Normalizes file headers, validates folder manifest semantics, and runs ripple checks after code changes. Only writes within scoped fractal repos.
- **[decision-capture](./skills/decision-capture/SKILL.md)** — Full decision lifecycle for the current task. Checks whether existing decision skills still cover the truth, then creates, updates, supersedes, or merges decision skills so current design authority is unambiguous. Decisions live at `.agents/skills/decision-*/SKILL.md`.
- **[to-task-specs](./skills/to-task-specs/SKILL.md)** — Generate executable task specifications from a PRD, resolved context, or conversation context. Groups tasks by functional domain, inherits decision constraints, and produces verifiable acceptance criteria.
- **[postmortem](./skills/postmortem/SKILL.md)** — Structured root-cause records for bugs, regressions, and incidents. Records symptom, impact, root cause, fix applied, verification, and prevention steps. Required when the primary task nature is defect correction.
- **[skill-design-guidelines](./skills/skill-design-guidelines/SKILL.md)** — Skill authoring and maintenance guidance. Validates routing descriptions, progressive loading, support-file layout, and eval coverage.

## Orchestration Flow

```
FILL → DECIDE → SPEC → BUILD → POSTMORTEM
```

- **SETUP** — `fractal-setup`: one-time manual bootstrap, outside the main flow.
- **FILL** — `fractal-agents-fill`: fill missing local contract context and refresh `AGENTS.md` when needed.
- **DECIDE** — `decision-capture`: check decision coverage and update decision skills until current truth is documented.
- **SPEC** — `to-task-specs`: turn resolved context into a build-ready task document.
- **BUILD** — Execute the approved spec.
- **POSTMORTEM** — `postmortem`: required when the primary task nature is defect correction.
- **AUXILIARY** — `fractal-audit`, `fractal-repo`, and `fractal-context` are helper skills available outside the main delivery flow.

## OpenCode Agents (Optional)

The `opencode-agents/` directory contains reference agent definitions for OpenCode users:

- **`fractal`** — Primary orchestrator that drives the `FILL → DECIDE → SPEC → BUILD → POSTMORTEM` flow.
- **`gstack`** — Integration agent for gstack toolchain compatibility.

`npx github:yaukwan/fractal-skills install` installs `fractal.md` alongside `AGENTS.md` generation. `gstack.md` remains a reference file that can be manually copied into `~/.config/opencode/agents/` if you want that integration.
