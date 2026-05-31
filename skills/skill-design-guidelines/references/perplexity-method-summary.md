# Perplexity Method Summary

This reference distills the original article into a practical review lens.

## The core shift

Skill writing is not software engineering and not README writing. It is context engineering for a model runtime.

That means several common software instincts become anti-patterns:

- explicit step-by-step command lists can make the skill brittle
- long explanatory prose adds token cost without improving behavior
- broad generic descriptions cause bad routing
- flattening everything into one file hurts retrieval and precision

## Four claims from the article

### 1. A skill is a directory

A mature skill can include:

- `SKILL.md`
- `scripts/`
- `references/`
- `assets/`
- `config.json`

The directory structure is part of the design. It is not just packaging.

### 2. A skill is a format

At minimum, the root file must provide a `name` and a `description`.

The `description` is the routing trigger, so it should describe when to load the skill rather than summarize what the skill contains.

### 3. A skill is invocable

Skills are loaded at runtime. The system does not need to keep all skill content in prompt context all the time.

### 4. A skill is progressive

The article frames skill cost as three layers:

- index layer: global name + description for every skill
- load layer: the root `SKILL.md`
- runtime layer: support files read only when needed

This makes progressive disclosure a first-class design principle.

## Good review questions

Ask these while reviewing any skill:

1. Is this sentence teaching the model something it would otherwise miss?
2. Is this description written as a routing trigger or as documentation?
3. Are the highest-risk failure modes represented as gotchas?
4. Is heavy content staying out of the root file?
5. Are negative routing examples represented in evals?

## Review priorities

When improving a skill, use this order:

1. routing precision
2. off-target activation
3. gotchas and boundaries
4. failure handling
5. wording compression
6. support-file placement

## Useful litmus tests

### Sentence test

"Would the agent get this wrong without this sentence?"

If no, remove it.

### Description test

Could the description be mistaken as product copy or a README summary?

If yes, rewrite it to say when to load.

### Structure test

If a section is long, conditional, or rarely needed, should it live in `references/`, `assets/`, or `scripts/` instead?

Usually yes.
