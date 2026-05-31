#!/usr/bin/env python3
import argparse
import json
import re
import sys
from pathlib import Path


def load_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_frontmatter(text: str):
    if not text.startswith('---\n'):
        return None, text
    parts = text.split('---', 2)
    if len(parts) < 3:
        return None, text
    raw = parts[1]
    body = parts[2].lstrip('\n')
    data = {}
    current_parent = None
    for line in raw.splitlines():
        if not line.strip() or line.strip().startswith('#'):
            continue
        if re.match(r'^\s{2,}[A-Za-z0-9_-]+:\s*', line) and current_parent:
            m = re.match(r'^\s{2,}([A-Za-z0-9_-]+):\s*(.*)$', line)
            if m:
                data.setdefault(current_parent, {})[m.group(1)] = m.group(2).strip().strip('"')
            continue
        m = re.match(r'^([A-Za-z0-9_-]+):\s*(.*)$', line)
        if m:
            key, value = m.group(1), m.group(2).strip()
            if value == '':
                data[key] = {}
                current_parent = key
            else:
                data[key] = value.strip('"')
                current_parent = None
    return data, body


def result(level, code, message):
    return {"level": level, "code": code, "message": message}


def validate_skill(skill_dir: Path):
    results = []
    skill_md = skill_dir / 'SKILL.md'
    if not skill_md.exists():
        results.append(result('error', 'missing-skill-md', 'Missing SKILL.md'))
        return results

    text = load_text(skill_md)
    frontmatter, body = parse_frontmatter(text)
    if frontmatter is None:
        results.append(result('error', 'missing-frontmatter', 'SKILL.md is missing YAML frontmatter'))
        return results

    name = frontmatter.get('name')
    desc = frontmatter.get('description')
    dir_name = skill_dir.name

    if not name:
        results.append(result('error', 'missing-name', 'Frontmatter missing name'))
    else:
        if name != dir_name:
            results.append(result('error', 'name-mismatch', f"Frontmatter name '{name}' does not match directory '{dir_name}'"))
        else:
            results.append(result('ok', 'name-match', 'Frontmatter name matches directory name'))
        if not re.fullmatch(r'[a-z0-9-]+', name):
            results.append(result('error', 'bad-name-format', 'Skill name must be lowercase letters, numbers, and hyphens only'))
        else:
            results.append(result('ok', 'name-format', 'Skill name format is lowercase-hyphenated'))

    if not desc:
        results.append(result('error', 'missing-description', 'Frontmatter missing description'))
    else:
        word_count = len(desc.split())
        if not desc.startswith('Load when'):
            results.append(result('warn', 'description-prefix', 'Description should usually start with "Load when"'))
        else:
            results.append(result('ok', 'description-prefix', 'Description starts with "Load when"'))
        if word_count > 50:
            results.append(result('warn', 'description-length', f'Description is {word_count} words; target is ideally <= 50'))
        else:
            results.append(result('ok', 'description-length', f'Description length looks good ({word_count} words)'))
        lowered = desc.lower()
        if 'do not load' in lowered:
            results.append(result('ok', 'description-boundary', 'Description includes an explicit non-goal / boundary'))
        else:
            results.append(result('warn', 'description-boundary', 'Description has no explicit non-goal; boundary may be too broad'))
        weak_phrases = ['this skill', 'helps with', 'helps ', 'tool for']
        if any(p in lowered for p in weak_phrases):
            results.append(result('warn', 'description-generic', 'Description may read like a feature summary instead of a routing trigger'))

    body_words = len(body.split())
    if body_words > 5000:
        results.append(result('warn', 'body-length', f'Body is very long ({body_words} words); consider moving more into references/assets'))
    else:
        results.append(result('ok', 'body-length', f'Body length is reasonable ({body_words} words)'))

    references_dir = skill_dir / 'references'
    assets_dir = skill_dir / 'assets'
    scripts_dir = skill_dir / 'scripts'
    evals_file = skill_dir / 'evals' / 'evals.json'

    if references_dir.exists() and any(references_dir.iterdir()):
        results.append(result('ok', 'references', 'references/ exists with files'))
    else:
        results.append(result('warn', 'references', 'references/ missing or empty'))

    if assets_dir.exists() and any(assets_dir.iterdir()):
        results.append(result('ok', 'assets', 'assets/ exists with files'))
    else:
        results.append(result('warn', 'assets', 'assets/ missing or empty'))

    if scripts_dir.exists() and any(scripts_dir.iterdir()):
        results.append(result('ok', 'scripts', 'scripts/ exists with files'))
    else:
        results.append(result('warn', 'scripts', 'scripts/ missing or empty; fine unless deterministic helpers are needed'))

    if evals_file.exists():
        results.append(result('ok', 'evals-present', 'evals/evals.json exists'))
        try:
            data = json.loads(load_text(evals_file))
            cases = data.get('cases', [])
            if not isinstance(cases, list) or not cases:
                results.append(result('error', 'evals-empty', 'evals.json has no cases'))
            else:
                results.append(result('ok', 'evals-count', f'evals.json contains {len(cases)} cases'))
                neg = 0
                pos = 0
                for case in cases:
                    exp = str(case.get('expected_output', '')).lower()
                    exps = ' '.join(case.get('expectations', [])).lower()
                    blob = exp + ' ' + exps
                    if 'should not load' in blob or 'should not route' in blob:
                        neg += 1
                    else:
                        pos += 1
                if pos == 0:
                    results.append(result('warn', 'evals-positive', 'No obvious positive routing cases detected'))
                else:
                    results.append(result('ok', 'evals-positive', f'Found {pos} likely positive cases'))
                if neg == 0:
                    results.append(result('warn', 'evals-negative', 'No obvious negative routing cases detected'))
                else:
                    results.append(result('ok', 'evals-negative', f'Found {neg} likely negative cases'))
        except Exception as e:
            results.append(result('error', 'evals-parse', f'Could not parse evals.json: {e}'))
    else:
        results.append(result('warn', 'evals-missing', 'evals/evals.json is missing'))

    # Root-file hints based on support-file references
    body_lower = body.lower()
    if 'references/' in body_lower:
        results.append(result('ok', 'body-support-links', 'Root body points to support files'))
    else:
        results.append(result('warn', 'body-support-links', 'Root body does not reference support files; progressive loading may be weak'))

    return results


def summarize(results):
    counts = {'error': 0, 'warn': 0, 'ok': 0}
    for r in results:
        counts[r['level']] += 1
    return counts


def main():
    parser = argparse.ArgumentParser(description='Validate an Alma skill against practical design-guideline checks.')
    parser.add_argument('skill_dir', nargs='?', default='.', help='Path to skill directory')
    parser.add_argument('--json', action='store_true', help='Output JSON')
    args = parser.parse_args()

    skill_dir = Path(args.skill_dir).resolve()
    results = validate_skill(skill_dir)
    counts = summarize(results)
    status = 'pass'
    if counts['error']:
        status = 'fail'
    elif counts['warn']:
        status = 'pass-with-warnings'

    payload = {
        'skill_dir': str(skill_dir),
        'status': status,
        'summary': counts,
        'results': results,
    }

    if args.json:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(f"Skill: {skill_dir.name}")
        print(f"Status: {status}")
        print(f"Summary: {counts['ok']} ok, {counts['warn']} warnings, {counts['error']} errors")
        print()
        for r in results:
            icon = {'ok': '✅', 'warn': '⚠️', 'error': '❌'}[r['level']]
            print(f"{icon} [{r['code']}] {r['message']}")

    sys.exit(1 if counts['error'] else 0)


if __name__ == '__main__':
    main()
