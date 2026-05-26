# Task Group Structuring & Splitting Guidelines

## 1. Top-Level Grouping Principle

1. **Group by Functional Domain & Code Boundary**
   - A top-level Task Group must represent a self-contained functional module impacting a distinct set of core files.
   - All changes to the same module must be in the same Task Group, even if they address different logical concerns.
   - If two tasks touch the same set of files, merge them into one Task Group to keep context unified.

2. **Purpose of Top-Level Groups**
   - Each group should be independently completable and testable.
   - Groups should be organized to allow parallel execution without excessive cross-group dependencies.

## 2. Sub-Task Splitting Rules

1. **Optimal Size**
   - Each sub-task should be a complete, small unit of work that contributes to delivering the feature.
   - Keep sub-tasks small enough for clear acceptance criteria, but large enough to avoid micro-tasks.
   - Merge similar operations on multiple files into one sub-task to avoid redundant processing.

2. **Operation Batching**
   - Merge similar operations: when multiple files need identical operations, combine them into a single sub-task listing all files.
   - File operation batching rules:
     - If refactoring pattern is identical across files → single sub-task listing all files
     - If each file needs unique logic → separate sub-tasks
     - Specify: "Apply to files: `file1.ts`, `file2.ts`, `file3.ts`"

3. **Deliverable-Focused Naming**
   - Name sub-tasks after the outcome, not the action steps.

4. **Logical Order**
   - If dependencies exist, sequence sub-tasks so earlier tasks unblock later ones (e.g., logic migration → interface update → edge case fix).

## 3. Acceptance Criteria Standard

1. **Integrate Testing & QA Into Each Task**
   - Do not create separate Task Groups for testing or documentation.
   - Add testing, quality, and type safety requirements into each sub-task’s acceptance criteria.

2. **Mandatory Items for Development Tasks**
   - All database access is moved to the service layer
   - API request/response types comply with `shared` module definitions
   - Unit tests for all new/changed service methods
   - Integration tests for all updated routes
   - TypeScript passes strict type checks
   - Test coverage ≥ 80%
   - Passes ESLint architectural rules with no violations

## 4. Naming Conventions

1. **Top-Level Group Names**
   - Use `{Module Name} + {Action}` (avoid phase-based group names).

2. **File & Method Naming**
   - Follow existing codebase conventions (kebab-case for files, PascalCase for service classes, camelCase for methods).

## 5. Prohibited Practices

- Splitting by project phase at top-level
- Having “Testing Only” or “Documentation Only” groups
- Creating micro-tasks with vague outcomes
- Separating related file changes into different Task Groups

