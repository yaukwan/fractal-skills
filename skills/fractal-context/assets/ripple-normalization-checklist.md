# Ripple Normalization Checklist

Use this when you are unsure whether the task belongs in `fractal-context` or should be handled by `fractal-agents-fill`.

## Use `fractal-context`

- The file header fields themselves are wrong, legacy, or semantically inconsistent.
- An existing folder manifest uses the wrong Level 2 section structure.
- The task is about what `INPUT`, `OUTPUT`, `ROLE`, `Scope`, `Constraints`, or `Members` mean.
- You are verifying ripple semantics after code changes.

## Not `fractal-context` — use `fractal-agents-fill`

- `AGENTS.md` is missing.
- The local contract must be inferred from code and nearby docs.
- The main uncertainty is owner boundary, directory scope, or local constraint truth.
- The manifest content is stale or incomplete, but the schema meaning itself is fine.

## Fast pass

1. Did the code change alter contract meaning or just local ownership reality?
2. Is the missing piece schema semantics or directory truth?
3. Will the next agent need a canonical schema answer, or a clarified local boundary?

If the answer is mostly "directory truth", this is not a schema task — `fractal-context` is not the right skill.
