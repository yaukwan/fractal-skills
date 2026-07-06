# Scope Matching

`config.yaml` is the source of truth for scope decisions.

## Decision order

1. `enabled: false` => `disabled`
2. Normalize the checked path against the project root
3. Check `exclude` patterns first
4. Check `include` patterns second
5. No include hit => `no-match`

## Normalization rules

- Paths are compared as project-root-relative POSIX paths.
- Absolute input paths are relativized against the project root.
- `\` becomes `/`.
- Leading `./` is ignored.
- A trailing `/` in a glob is treated as subtree shorthand (`docs/` behaves like `docs/**`).
- The checker evaluates the path you pass. Use a concrete descendant path when you want subtree coverage.

## Pattern rules

- `*` matches within one path segment.
- `**` matches across path segments.
- `?` matches one non-`/` character.
- Excludes win when both include and exclude match.
- Empty `include` means nothing can match while the level is enabled.

## Result labels

- `matched`
- `excluded`
- `disabled`
- `no-match`
