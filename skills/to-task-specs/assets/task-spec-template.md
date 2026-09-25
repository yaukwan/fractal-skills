---
type: specs
status: draft # draft | pending_review | approved | in_progress | blocked | completed
updated: {YYYY-MM-DD}
project: "{project_name}"
taskID: "{unique_task_id}"
related:
  - {relative_path_to_source_or_current_decision} # Use [] when no source document exists.
---

# AI Development Task Specification: {task_title}

> Template instructions: summarize settled intent, not the raw conversation. Omit irrelevant optional sections and remove all placeholders and authoring notes. Add only detail needed for the handoff; generation does not imply human approval.

## 1. Core Intent

**Business Objectives**:
- {business_objective_1}
- {business_objective_2}

**Success Criteria**:
- {success_metric_1}
- {success_metric_2}


## 2. Context & Boundaries

- **Baseline**: {inspected_revision_or_project_state_and_relevant_local_changes}
- **In Scope / Non-goals**: {included_outcomes_and_explicit_exclusions}
- **Unchanged Behavior**: {existing_behavior_and_contracts_to_preserve}

- **Primary Impact Scope**:
  - **Codebase**: {repo_link_or_project_path}
  - **Core Files/Modules**:
    - `{existing_path}::{symbol_or_section}` - {relevant_role_and_observed_behavior}
  - **Reuse / Reference Implementation**:
    - `{existing_path}::{symbol_or_section}` - {what_to_reuse_or_follow}
  - **Planned Additions** (if any): {new_paths_or_interfaces_not_yet_present}

- **Prohibited Modification Scope**:
  - `{path}/**` - (Reason: {reason})

- **Assumptions** (if any): {nonblocking_assumptions_and_their_effects}
- **Current Decisions** (if applicable): {authority_references_and_inherited_constraints}
- **Local Design Choices**: {chosen_approach_and_key_rationale}
- **Executor Freedom**: {private_implementation_details_left_open}

## 3. Behavioral & Interface Contract

- **Inputs / Outputs / Defaults**: {exact_changed_behavior_with_examples}
- **States / Errors / Side Effects**: {trigger_conditions_results_and_failure_effects}
- **Invariants**: {properties_that_must_remain_true}
- **Contract Anchors**: {existing_schema_or_symbol_and_preserved_obligations}
- **New or Changed Definitions** (if any): {minimal_signatures_fields_types_nullability_or_schema_delta}
- **Risk Constraints** (as applicable): {compatibility_migration_permissions_concurrency_retry_or_resource_requirements}

### Logic Model (optional)
{include_a_diagram_or_key_pseudocode_only_if_it_clarifies_a_nontrivial_state_flow_or_invariant}


## 4. Task Decomposition & Implementation Directives

### Task Group 1: {functional_module_name}
**Purpose**: {why this group exists and why it is grouped this way}
**Related Files**: `{file_path1}`, `{file_path2}`
**Requirements**: {brief spec description for this group}

- **[ ] 1.1: {sub_task_title}**
  - **Depends on**: {task_ids_or_none_including_shared_file_sequencing}
  - **Input**: {parameters, data, preconditions}
  - **Change Anchors**: {existing_or_planned_implementation_and_verification_paths_and_symbols}
  - **Instructions**:
    1. {step_1}
    2. {step_2}
    3. {multi_file_note_or_framework_guidance}
  - **Objective**: {desired deliverable state}
  - **Acceptance Criteria**:
    - [ ] {verifiable_criteria_1}
    - [ ] {verifiable_criteria_2}
    - [ ] {multi_file_processed_successfully_if_applicable}
  - **Verification**:
    - **Entry Point / Check**: {existing_or_planned_test_or_user_flow_and_criteria_it_covers}
    - **Run From / Command or Procedure**: {directory_command_or_reproducible_steps_and_environment_prerequisites}
    - **Expected Result**: {observable_success_and_relevant_failure_results_not_claimed_as_executed}

- **[ ] 1.2: {sub_task_title}**
  - **Depends on**: {task_ids_or_none_including_shared_file_sequencing}
  - **Input**: {parameters, data, preconditions}
  - **Change Anchors**: {existing_or_planned_implementation_and_verification_paths_and_symbols}
  - **Instructions**:
    1. {step_1}
    2. {step_2}
  - **Objective**: {desired deliverable state}
  - **Acceptance Criteria**:
    - [ ] {verifiable_criteria_1}
    - [ ] {verifiable_criteria_2}
  - **Verification**: {entry_point_criteria_covered_directory_command_or_procedure_and_expected_result}

### Task Group 2: {functional_module_name}
{continue_with_same_structure}


## 5. Implementation Constraints & Escalation

- **Project Conventions / Quality Gates**: {verified_project_sources_and_task_relevant_checks}
- **Escalate With Evidence When**: {missing_anchors_contract_conflicts_scope_expansion_or_failures_requiring_design_changes}
- **Return To**: {requirement_clarification_decision_review_or_spec_revision_as_applicable}
- **Recovery** (for risky steps): {safe_retry_or_rollback_constraints}


## 6. Review Checklist
> **[Human Review]** Approval requires this review, not merely generation of the spec.

- [ ] **Grounding**: Existing anchors are verified; planned additions and assumptions are labeled.
- [ ] **Contract & Scope**: Required behavior, critical edge cases, non-goals, and current constraints agree.
- [ ] **Execution Order**: Task dependencies and write conflicts are explicit and executable.
- [ ] **Verification Coverage**: Each required outcome has a concrete check through the relevant entry point.
- [ ] **Cold Handoff**: The spec and its references suffice without chat memory; local freedoms and escalation conditions are clear.

## Execution Evidence
{leave_actual_results_empty_until_execution_then_record_task_id_commands_or_procedures_results_and_approved_deviations}
