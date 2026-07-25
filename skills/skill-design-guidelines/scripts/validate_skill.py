#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path


NAME_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
FIELD_PATTERN = re.compile(r"^([A-Za-z0-9_-]+):(?:\s*(.*))?$")
BLOCK_SCALAR_PATTERN = re.compile(r"^([>|])[-+]?$")
OPTIONAL_DIRECTORIES = ("references", "assets", "scripts")


def load_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_scalar(value: str) -> str:
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] == "'":
        return value[1:-1].replace("''", "'")
    if len(value) >= 2 and value[0] == value[-1] == '"':
        try:
            parsed = json.loads(value)
            return parsed if isinstance(parsed, str) else value
        except json.JSONDecodeError:
            return value[1:-1]
    return re.sub(r"\s+#.*$", "", value).strip()


def parse_block_scalar(lines: list[str], start: int, style: str) -> tuple[str, int]:
    block: list[str] = []
    index = start

    while index < len(lines):
        line = lines[index]
        if line and not line[0].isspace():
            break
        block.append(line)
        index += 1

    non_empty = [line for line in block if line.strip()]
    indent = min((len(line) - len(line.lstrip()) for line in non_empty), default=0)
    normalized = [line[indent:] if line.strip() else "" for line in block]

    if style == "|":
        value = "\n".join(normalized).strip()
    else:
        paragraphs: list[str] = []
        current: list[str] = []
        for line in normalized:
            if line.strip():
                current.append(line.strip())
            elif current:
                paragraphs.append(" ".join(current))
                current = []
        if current:
            paragraphs.append(" ".join(current))
        value = "\n\n".join(paragraphs).strip()

    return value, index


def parse_frontmatter(text: str) -> tuple[dict[str, str] | None, str]:
    lines = text.lstrip("\ufeff").splitlines()
    if not lines or lines[0].strip() != "---":
        return None, text

    try:
        end = next(index for index in range(1, len(lines)) if lines[index].strip() == "---")
    except StopIteration:
        return None, text

    frontmatter_lines = lines[1:end]
    data: dict[str, str] = {}
    index = 0

    while index < len(frontmatter_lines):
        line = frontmatter_lines[index]
        if not line or line[0].isspace() or line.lstrip().startswith("#"):
            index += 1
            continue

        match = FIELD_PATTERN.match(line)
        if not match:
            index += 1
            continue

        key = match.group(1)
        raw_value = (match.group(2) or "").strip()
        block_match = BLOCK_SCALAR_PATTERN.match(raw_value)
        if block_match:
            value, index = parse_block_scalar(frontmatter_lines, index + 1, block_match.group(1))
            data[key] = value
            continue

        data[key] = parse_scalar(raw_value)
        index += 1

    body = "\n".join(lines[end + 1 :]).lstrip("\n")
    return data, body


def result(level: str, code: str, message: str) -> dict[str, str]:
    return {"level": level, "code": code, "message": message}


def validate_skill(skill_dir: Path) -> list[dict[str, str]]:
    results: list[dict[str, str]] = []
    skill_md = skill_dir / "SKILL.md"
    if not skill_md.exists():
        return [result("error", "missing-skill-md", "Missing SKILL.md")]
    if not skill_md.is_file():
        return [result("error", "invalid-skill-md", "SKILL.md is not a regular file")]

    try:
        text = load_text(skill_md)
    except (OSError, UnicodeError) as error:
        return [result("error", "unreadable-skill-md", f"Could not read SKILL.md: {error}")]

    frontmatter, body = parse_frontmatter(text)
    if frontmatter is None:
        return [result("error", "missing-frontmatter", "SKILL.md is missing closed YAML frontmatter")]

    name = frontmatter.get("name", "").strip()
    description = frontmatter.get("description", "").strip()
    directory_name = skill_dir.name

    if not name:
        results.append(result("error", "missing-name", "Frontmatter is missing a non-empty name"))
    else:
        if NAME_PATTERN.fullmatch(name):
            results.append(result("ok", "name-format", "Name follows the Agent Skills format"))
        else:
            results.append(
                result(
                    "error",
                    "bad-name-format",
                    "Name must contain lowercase letters or numbers separated by single hyphens",
                )
            )

        if name == directory_name:
            results.append(result("ok", "name-match", "Name matches the parent directory"))
        else:
            results.append(
                result(
                    "error",
                    "name-mismatch",
                    f"Frontmatter name '{name}' does not match directory '{directory_name}'",
                )
            )

    if not description:
        results.append(result("error", "missing-description", "Frontmatter is missing a non-empty description"))
    elif len(description) > 1024:
        results.append(
            result(
                "error",
                "description-length",
                f"Description is {len(description)} characters; the maximum is 1024",
            )
        )
    else:
        results.append(
            result(
                "ok",
                "description-length",
                f"Description length is valid ({len(description)} characters)",
            )
        )

    body_lines = body.splitlines()
    if len(body_lines) > 500:
        results.append(
            result(
                "warn",
                "body-length",
                f"SKILL.md body is {len(body_lines)} lines; consider disclosing conditional material",
            )
        )
    else:
        results.append(result("ok", "body-length", f"SKILL.md body is {len(body_lines)} lines"))

    for directory_name in OPTIONAL_DIRECTORIES:
        directory = skill_dir / directory_name
        if not directory.exists():
            continue
        if not directory.is_dir():
            results.append(
                result(
                    "error",
                    f"invalid-{directory_name}",
                    f"{directory_name}/ exists but is not a directory",
                )
            )
            continue
        if not any(path.is_file() for path in directory.rglob("*")):
            results.append(
                result(
                    "warn",
                    f"empty-{directory_name}",
                    f"{directory_name}/ exists but contains no files",
                )
            )

    return results


def summarize(results: list[dict[str, str]]) -> dict[str, int]:
    counts = {"error": 0, "warn": 0, "ok": 0}
    for item in results:
        counts[item["level"]] += 1
    return counts


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Validate portable Agent Skills structure without judging semantic quality."
    )
    parser.add_argument("skill_dir", nargs="?", default=".", help="Path to a skill directory")
    parser.add_argument("--json", action="store_true", help="Output JSON")
    args = parser.parse_args()

    skill_dir = Path(args.skill_dir).resolve()
    results = validate_skill(skill_dir)
    counts = summarize(results)
    status = "fail" if counts["error"] else "pass-with-warnings" if counts["warn"] else "pass"

    payload = {
        "skill_dir": str(skill_dir),
        "status": status,
        "summary": counts,
        "results": results,
    }

    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(f"Skill: {skill_dir.name}")
        print(f"Status: {status}")
        print(f"Summary: {counts['ok']} ok, {counts['warn']} warnings, {counts['error']} errors")
        print()
        labels = {"ok": "OK", "warn": "WARN", "error": "ERROR"}
        for item in results:
            print(f"[{labels[item['level']]}] [{item['code']}] {item['message']}")

    sys.exit(1 if counts["error"] else 0)


if __name__ == "__main__":
    main()
