#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const DEFAULT_CONFIG_CANDIDATES = [
  path.join(process.cwd(), ".agents", "skills", "fractal-scope", "config.yaml"),
  path.join(process.cwd(), "skills", "fractal-scope", "config.yaml"),
  path.join(__dirname, "..", "config.yaml"),
];

const regexCache = new Map();

function helpText() {
  return `fractal-scope scope checker

Usage:
  node scripts/check-scope.js [--config <path>] [--root <project-root>] [--path <path> ...] [--json]

Options:
  --config <path>  Path to config.yaml. Defaults to the current project's config if present, then the package config.
  --root <path>    Project root used to relativize checked paths.
  --path <path>    Path to check. Repeat or pass positional paths.
  --json           Emit machine-readable JSON.
  -h, --help       Show this help.
`;
}

function parseArgs(argv) {
  const result = {
    configPath: null,
    rootPath: null,
    json: false,
    help: false,
    paths: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "-h" || arg === "--help") {
      result.help = true;
      continue;
    }

    if (arg === "--json") {
      result.json = true;
      continue;
    }

    if (arg === "--config") {
      result.configPath = argv[++index] ?? null;
      continue;
    }

    if (arg.startsWith("--config=")) {
      result.configPath = arg.slice("--config=".length);
      continue;
    }

    if (arg === "--root") {
      result.rootPath = argv[++index] ?? null;
      continue;
    }

    if (arg.startsWith("--root=")) {
      result.rootPath = arg.slice("--root=".length);
      continue;
    }

    if (arg === "--path") {
      const value = argv[++index];
      if (value) {
        result.paths.push(value);
      }
      continue;
    }

    if (arg.startsWith("--path=")) {
      result.paths.push(arg.slice("--path=".length));
      continue;
    }

    if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    }

    result.paths.push(arg);
  }

  return result;
}

function resolveDefaultConfigPath() {
  for (const candidate of DEFAULT_CONFIG_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return DEFAULT_CONFIG_CANDIDATES[0];
}

function inferProjectRoot(configPath) {
  const absoluteConfigPath = path.resolve(configPath);
  const normalizedConfigPath = absoluteConfigPath.replace(/\\/g, "/");
  const markers = ["/.agents/skills/fractal-scope/", "/skills/fractal-scope/"];

  for (const marker of markers) {
    const index = normalizedConfigPath.lastIndexOf(marker);
    if (index !== -1) {
      return normalizedConfigPath.slice(0, index) || path.parse(absoluteConfigPath).root;
    }
  }

  return path.dirname(absoluteConfigPath);
}

function stripInlineComment(line) {
  let output = "";
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const previous = line[index - 1];

    if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
      output += char;
      continue;
    }

    if (char === '"' && !inSingleQuote && previous !== "\\") {
      inDoubleQuote = !inDoubleQuote;
      output += char;
      continue;
    }

    if (char === "#" && !inSingleQuote && !inDoubleQuote) {
      break;
    }

    output += char;
  }

  return output;
}

function parseScalar(rawValue) {
  const value = rawValue.trim();

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (/^-?\d+$/.test(value)) {
    return Number(value);
  }

  const isQuoted =
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"));

  if (isQuoted) {
    return value
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, "\\");
  }

  return value;
}

function parseConfig(text, sourcePath) {
  const result = {};
  const lines = text.split(/\r?\n/);
  let currentSection = null;
  let pendingArray = null;

  for (let lineNumber = 0; lineNumber < lines.length; lineNumber += 1) {
    const rawLine = lines[lineNumber];
    const lineWithoutComment = stripInlineComment(rawLine);

    if (!lineWithoutComment.trim()) {
      continue;
    }

    const indentMatch = rawLine.match(/^ */);
    const indent = indentMatch ? indentMatch[0].length : 0;
    const line = lineWithoutComment.trim();

    if (indent === 0) {
      const match = line.match(/^([A-Za-z0-9_]+):(.*)$/);
      if (!match) {
        throw new Error(
          `Unsupported YAML at ${sourcePath}:${lineNumber + 1}: ${rawLine.trim()}`
        );
      }

      const key = match[1];
      const value = match[2].trim();

      if (!value) {
        result[key] = {};
        currentSection = result[key];
      } else {
        result[key] = parseScalar(value);
        currentSection = null;
      }

      pendingArray = null;
      continue;
    }

    if (!currentSection) {
      throw new Error(
        `Unexpected indentation at ${sourcePath}:${lineNumber + 1}: ${rawLine.trim()}`
      );
    }

    if (indent === 2) {
      const match = line.match(/^([A-Za-z0-9_]+):(.*)$/);
      if (!match) {
        throw new Error(
          `Unsupported YAML at ${sourcePath}:${lineNumber + 1}: ${rawLine.trim()}`
        );
      }

      const key = match[1];
      const value = match[2].trim();

      if (!value) {
        currentSection[key] = [];
        pendingArray = currentSection[key];
      } else if (value === "[]") {
        currentSection[key] = [];
        pendingArray = null;
      } else {
        currentSection[key] = parseScalar(value);
        pendingArray = null;
      }

      continue;
    }

    if (indent >= 4 && line.startsWith("- ")) {
      if (!pendingArray) {
        throw new Error(
          `List item without an active array at ${sourcePath}:${lineNumber + 1}: ${rawLine.trim()}`
        );
      }

      pendingArray.push(parseScalar(line.slice(2)));
      continue;
    }

    throw new Error(
      `Unsupported indentation at ${sourcePath}:${lineNumber + 1}: ${rawLine.trim()}`
    );
  }

  return result;
}

function normalizePattern(pattern) {
  let normalized = path.normalize(String(pattern).trim()).replace(/\\/g, "/");
  normalized = normalized.replace(/^\.\/?/, "");
  normalized = normalized.replace(/^\/+/, "");

  if (normalized === ".") {
    return "";
  }

  if (normalized.endsWith("/")) {
    normalized += "**";
  }

  return normalized;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function segmentToRegex(segment) {
  let output = "";

  for (let index = 0; index < segment.length; index += 1) {
    const char = segment[index];

    if (char === "*") {
      output += "[^/]*";

      while (segment[index + 1] === "*") {
        index += 1;
      }

      continue;
    }

    if (char === "?") {
      output += "[^/]";
      continue;
    }

    output += escapeRegExp(char);
  }

  return output;
}

function compileGlob(pattern) {
  const normalized = normalizePattern(pattern);

  if (regexCache.has(normalized)) {
    return regexCache.get(normalized);
  }

  if (!normalized) {
    const emptyRegex = /^$/;
    regexCache.set(normalized, emptyRegex);
    return emptyRegex;
  }

  const collapsedSegments = [];
  for (const segment of normalized.split("/")) {
    if (!segment && collapsedSegments.length === 0) {
      continue;
    }

    if (segment === "**" && collapsedSegments[collapsedSegments.length - 1] === "**") {
      continue;
    }

    collapsedSegments.push(segment);
  }

  let regex = "^";

  for (let index = 0; index < collapsedSegments.length; index += 1) {
    const segment = collapsedSegments[index];
    const previous = collapsedSegments[index - 1];

    if (index > 0 && previous !== "**") {
      regex += "/";
    }

    if (segment === "**") {
      regex += index === collapsedSegments.length - 1 ? ".*" : "(?:[^/]+/)*";
      continue;
    }

    regex += segmentToRegex(segment);
  }

  regex += "$";

  const compiled = new RegExp(regex);
  regexCache.set(normalized, compiled);
  return compiled;
}

function normalizeInputPath(projectRoot, inputPath) {
  const resolved = path.isAbsolute(inputPath)
    ? inputPath
    : path.resolve(projectRoot, inputPath);

  return path.relative(projectRoot, resolved).replace(/\\/g, "/");
}

function findMatchingPatterns(patterns, targetPath) {
  const matches = [];

  for (const pattern of patterns) {
    if (compileGlob(pattern).test(targetPath)) {
      matches.push(pattern);
    }
  }

  return matches;
}

function evaluateSection(section, targetPath) {
  const enabled = Boolean(section && section.enabled);
  const include = Array.isArray(section && section.include) ? section.include : [];
  const exclude = Array.isArray(section && section.exclude) ? section.exclude : [];

  if (!enabled) {
    return {
      status: "disabled",
      includeMatches: [],
      excludeMatches: [],
    };
  }

  const includeMatches = findMatchingPatterns(include, targetPath);
  const excludeMatches = findMatchingPatterns(exclude, targetPath);

  if (excludeMatches.length > 0) {
    return {
      status: "excluded",
      includeMatches,
      excludeMatches,
    };
  }

  if (includeMatches.length > 0) {
    return {
      status: "matched",
      includeMatches,
      excludeMatches,
    };
  }

  return {
    status: "no-match",
    includeMatches,
    excludeMatches,
  };
}

function formatPatternList(patterns) {
  return patterns.length > 0 ? patterns.join(", ") : "(empty)";
}

function formatSectionResult(result, section) {
  if (result.status === "disabled") {
    return "disabled";
  }

  if (result.status === "matched") {
    return `matched (${result.includeMatches.join(", ")})`;
  }

  if (result.status === "excluded") {
    const parts = [];
    if (result.includeMatches.length > 0) {
      parts.push(`include ${result.includeMatches.join(", ")}`);
    }
    if (result.excludeMatches.length > 0) {
      parts.push(`exclude ${result.excludeMatches.join(", ")}`);
    }
    return `excluded (${parts.join("; ")})`;
  }

  if (!Array.isArray(section?.include) || section.include.length === 0) {
    return "no-match (empty include)";
  }

  return "no-match";
}

function buildReport(configPath, projectRoot, config, inputPaths) {
  const sections = ["l3_file_header", "l2_folder_manifest"];

  return {
    configPath,
    projectRoot,
    config,
    checks:
      inputPaths.length > 0
        ? inputPaths.map((inputPath) => {
            const normalizedPath = normalizeInputPath(projectRoot, inputPath);
            const results = {};

            for (const sectionName of sections) {
              results[sectionName] = evaluateSection(config[sectionName], normalizedPath);
            }

            return {
              inputPath,
              normalizedPath,
              results,
            };
          })
        : [],
  };
}

function printHumanReport(report) {
  console.log(`Config: ${report.configPath}`);
  console.log(`Project root: ${report.projectRoot}`);
  console.log(`Version: ${report.config.version ?? "(missing)"}`);
  console.log("");

  for (const sectionName of ["l3_file_header", "l2_folder_manifest"]) {
    const section = report.config[sectionName] ?? {};
    console.log(sectionName);
    console.log(`  enabled: ${section.enabled ? "true" : "false"}`);
    console.log(`  include: ${formatPatternList(Array.isArray(section.include) ? section.include : [])}`);
    console.log(`  exclude: ${formatPatternList(Array.isArray(section.exclude) ? section.exclude : [])}`);
    console.log("");
  }

  const specOutput = report.config.spec_output ?? {};
  console.log("spec_output");
  console.log(`  mode: ${specOutput.mode ?? "(missing)"}`);

  if (report.checks.length === 0) {
    console.log("");
    console.log("Pass one or more --path values to test match results.");
    return;
  }

  console.log("");
  console.log("Checks");

  for (const check of report.checks) {
    console.log(`- ${check.inputPath}`);
    console.log(`  normalized: ${check.normalizedPath || "."}`);

    for (const sectionName of ["l3_file_header", "l2_folder_manifest"]) {
      console.log(
        `  ${sectionName}: ${formatSectionResult(
          check.results[sectionName],
          report.config[sectionName]
        )}`
      );
    }
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    console.log(helpText());
    return;
  }

  const configPath = path.resolve(args.configPath ?? resolveDefaultConfigPath());
  if (!fs.existsSync(configPath)) {
    const candidates = args.configPath
      ? [configPath]
      : DEFAULT_CONFIG_CANDIDATES.map((candidate) => path.resolve(candidate));
    throw new Error(`config.yaml not found. Checked: ${candidates.join(", ")}`);
  }

  const projectRoot = args.rootPath
    ? path.resolve(args.rootPath)
    : path.resolve(inferProjectRoot(configPath));

  const rawConfig = fs.readFileSync(configPath, "utf8");
  const config = parseConfig(rawConfig, configPath);
  const report = buildReport(configPath, projectRoot, config, args.paths);

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  printHumanReport(report);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

module.exports = {
  buildReport,
  compileGlob,
  inferProjectRoot,
  normalizeInputPath,
  normalizePattern,
  parseConfig,
  parseScalar,
  parseArgs,
};
