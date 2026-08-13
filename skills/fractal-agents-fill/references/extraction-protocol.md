# Module Contract Extraction Protocol

Use this protocol for every Target mode extraction and for each retained Project mode candidate.

## Evidence order

Use evidence in this order. A lower source may clarify a higher source but must not silently override it.

1. Current user-confirmed intent and the existing local `AGENTS.md`
2. Relevant project skills, especially `.agents/skills/decision-*/SKILL.md`
3. Ancestor `AGENTS.md`, module README, design docs, and interface docs
4. Public entry points, exports, build configuration, and tests
5. Call relationships, directory structure, and names
6. Git history, only as a staleness signal

Keep a short evidence ledger while extracting: `claim -> source path -> authority level`. Exclude unsupported claims instead of filling every section.

## Field extraction

### Scope

State the module's long-term ownership, boundary, and material exclusions. Scope is intent: preserve an existing statement unless higher-authority evidence or the user confirms a replacement.

### Constraints

Record durable rules that affect future changes. Require evidence from user intent, existing manifest, project decisions, public contracts, configuration, or tests. Do not promote incidental implementation details into constraints.

When review finds no module-specific rule beyond ancestor manifests, keep the required section explicit with `- No module-specific constraints; inherit ancestor constraints.`

### Members

Describe child bounded contexts, capabilities, public surfaces, or responsibility groups. Code and workspace structure are sufficient evidence. Do not list every file.

When the module has no meaningful child grouping, name its single public capability rather than inventing submodules.

### Docs

Link directly relevant, existing project documents. Prefer project-relative paths and state why each document should be read. Do not retain broken paths.

### Skills

Include only project-local skills whose behavior applies to the module. Each entry must identify both the skill path and its trigger:

```md
- `.agents/skills/decision-payment-flow/SKILL.md`: Read before changing payment orchestration or provider boundaries.
```

Do not list globally installed skills, every project skill, or a skill without a module-specific trigger.

### Language

Record domain terms only when confirmed by the user, an existing manifest, a current decision, or another authoritative project document. Code names may reveal candidates but cannot settle vocabulary alone.

### Exceptions

Record deliberate, current deviations and their reason. Require explicit authority; unusual code alone is not proof that a deviation is intentional.

## Merge policy

- `Scope`: manual-preserve. Replace only with confirmed higher-authority truth.
- `Constraints`: manual-preserve. Add supported rules; flag contradictions.
- `Members`: replace from current module structure at responsibility-group granularity.
- `Docs`: merge relevant links and remove paths proven missing or out of scope.
- `Skills`: replace from current project-local relevance.
- `Language`: manual-preserve. Add only authority-confirmed vocabulary.
- `Exceptions`: append confirmed items; remove only when explicit evidence says the exception ended.

When evidence conflicts:

- resolve observable facts from the repository
- preserve unresolved intent and mark the module blocked
- emit `decision_drift_signal` when a current local contract conflicts with a decision skill
- never resolve decision authority inside this skill

## Confidence

- **High**: ownership has at least one authoritative intent source and current structural evidence; no direction-changing conflict remains.
- **Medium**: current structure and an existing manifest agree, but independent ownership evidence is incomplete.
- **Low**: ownership is inferred mainly from names or layout, or authoritative sources conflict.

Confidence controls Project mode creation. It does not bypass the scope gate or evidence requirements.
