#!/usr/bin/env node
"use strict";

const assert = require("assert");
const { buildReport, parseConfig } = require("./check-scope.js");

function check(configText, inputPath) {
  const config = parseConfig(configText, "test-config.yaml");
  return buildReport("test-config.yaml", process.cwd(), config, [inputPath]).checks[0]
    .results.l2_folder_manifest;
}

const blockList = check(
  `l2_folder_manifest:
  enabled: true
  include:
    - docs/**
  exclude: []
`,
  "docs/guide.md"
);
assert.strictEqual(blockList.status, "matched");
assert.deepStrictEqual(blockList.includeMatches, ["docs/**"]);

const emptyInline = check(
  `l2_folder_manifest:
  enabled: true
  include: []
  exclude: []
`,
  "docs/guide.md"
);
assert.strictEqual(emptyInline.status, "no-match");

const inlineList = check(
  `l2_folder_manifest:
  enabled: true
  include: ["docs/**"]
  exclude: []
`,
  "docs/guide.md"
);
assert.strictEqual(inlineList.status, "matched");
assert.deepStrictEqual(inlineList.includeMatches, ["docs/**"]);

const excluded = check(
  `l2_folder_manifest:
  enabled: true
  include: ["docs/**"]
  exclude: ["docs/private/**"]
`,
  "docs/private/guide.md"
);
assert.strictEqual(excluded.status, "excluded");
assert.deepStrictEqual(excluded.includeMatches, ["docs/**"]);
assert.deepStrictEqual(excluded.excludeMatches, ["docs/private/**"]);

assert.throws(
  () =>
    parseConfig(
      `l2_folder_manifest:
  enabled: true
  include: docs/**
`,
      "test-config.yaml"
    ),
  /Expected include to be a list/
);

assert.throws(
  () =>
    parseConfig(
      `l2_folder_manifest:
  enabled: true
  include: [docs/**
`,
      "test-config.yaml"
    ),
  /Unsupported inline array/
);

console.log("check-scope tests passed");
