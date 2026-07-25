#!/usr/bin/env python3
import importlib.util
import tempfile
import unittest
from pathlib import Path


VALIDATOR_PATH = Path(__file__).with_name("validate_skill.py")
SPEC = importlib.util.spec_from_file_location("validate_skill", VALIDATOR_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Could not load validate_skill.py")
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


def issue_codes(results, level=None):
    return {
        item["code"]
        for item in results
        if level is None or item["level"] == level
    }


class ValidateSkillTests(unittest.TestCase):
    def validate(self, name, frontmatter, body="# Example\n"):
        with tempfile.TemporaryDirectory() as temporary_directory:
            skill_directory = Path(temporary_directory) / name
            skill_directory.mkdir()
            (skill_directory / "SKILL.md").write_text(
                f"---\n{frontmatter}\n---\n\n{body}",
                encoding="utf-8",
            )
            return VALIDATOR.validate_skill(skill_directory)

    def test_minimal_skill_passes_without_optional_directories(self):
        results = self.validate(
            "example-skill",
            "name: example-skill\ndescription: Reviews example skills when requested.",
        )

        self.assertEqual(issue_codes(results, "error"), set())
        self.assertEqual(issue_codes(results, "warn"), set())

    def test_quoted_scalars_are_parsed(self):
        results = self.validate(
            "example-skill",
            'name: "example-skill"\ndescription: "Reviews examples: use when requested."',
        )

        self.assertEqual(issue_codes(results, "error"), set())

    def test_folded_description_is_parsed(self):
        results = self.validate(
            "example-skill",
            "name: example-skill\ndescription: >-\n  Reviews example skills and their structure.\n  Use when a portable Agent Skill needs review.",
        )

        self.assertEqual(issue_codes(results, "error"), set())
        description_result = next(item for item in results if item["code"] == "description-length")
        self.assertIn("89 characters", description_result["message"])

    def test_invalid_name_is_rejected(self):
        results = self.validate(
            "Example_Skill",
            "name: Example_Skill\ndescription: Reviews example skills.",
        )

        self.assertIn("bad-name-format", issue_codes(results, "error"))

    def test_name_must_match_directory(self):
        results = self.validate(
            "example-skill",
            "name: other-skill\ndescription: Reviews example skills.",
        )

        self.assertIn("name-mismatch", issue_codes(results, "error"))

    def test_description_is_required(self):
        results = self.validate("example-skill", "name: example-skill")

        self.assertIn("missing-description", issue_codes(results, "error"))

    def test_empty_optional_directory_warns(self):
        with tempfile.TemporaryDirectory() as temporary_directory:
            skill_directory = Path(temporary_directory) / "example-skill"
            skill_directory.mkdir()
            (skill_directory / "SKILL.md").write_text(
                "---\nname: example-skill\ndescription: Reviews example skills.\n---\n",
                encoding="utf-8",
            )
            (skill_directory / "references").mkdir()

            results = VALIDATOR.validate_skill(skill_directory)

        self.assertIn("empty-references", issue_codes(results, "warn"))

    def test_overlong_description_is_rejected(self):
        results = self.validate(
            "example-skill",
            f"name: example-skill\ndescription: {'x' * 1025}",
        )

        self.assertIn("description-length", issue_codes(results, "error"))


if __name__ == "__main__":
    unittest.main()
