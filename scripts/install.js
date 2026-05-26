#!/usr/bin/env node

/**
 * Fractal Skills installer for OpenCode.
 *
 * Reads AGENTS.template.md, asks for your name and languages,
 * writes ~/.config/opencode/AGENTS.md.
 *
 * Also copies agent definitions from opencode-agents/
 * to ~/.config/opencode/agents/.
 *
 * Usage: node install.js
 *         or: chmod +x install.js && ./install.js
 *
 * No dependencies. Pure Node.js built-ins.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");

const TEMPLATE_PATH = path.join(__dirname, "..", "AGENTS.template.md");
const AGENT_SRC_DIR = path.join(__dirname, "..", "opencode-agents");
const TARGET_DIR = path.join(os.homedir(), ".config", "opencode");
const TARGET_PATH = path.join(TARGET_DIR, "AGENTS.md");
const AGENTS_TARGET_DIR = path.join(TARGET_DIR, "agents");

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function createOneShotReadline() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

async function confirmOverwrite(filePath) {
  const rl = createOneShotReadline();
  const answer = await ask(
    rl,
    `\n${filePath} already exists.\nOverwrite? [y/N] `
  );
  rl.close();
  return answer.toLowerCase() === "y";
}

/** Install a single agent file, returning true if written. */
async function installAgentFile(srcPath, dstPath) {
  if (fs.existsSync(dstPath)) {
    const shouldOverwrite = await confirmOverwrite(dstPath);
    if (!shouldOverwrite) {
      console.log(`  Skipped: ${dstPath}`);
      return false;
    }
  }
  fs.copyFileSync(srcPath, dstPath);
  console.log(`  ✓ Installed: ${dstPath}`);
  return true;
}

async function installAgents() {
  if (!fs.existsSync(AGENT_SRC_DIR)) {
    console.log("\nNo opencode-agents/ directory found. Skipping agent installation.");
    return;
  }

  const files = fs.readdirSync(AGENT_SRC_DIR).filter(f => f.endsWith(".md"));
  if (files.length === 0) {
    console.log("\nNo agent definitions found in opencode-agents/. Skipping.");
    return;
  }

  console.log("\nInstalling OpenCode agent definitions...");
  fs.mkdirSync(AGENTS_TARGET_DIR, { recursive: true });

  let installed = 0;
  let skipped = 0;

  for (const file of files) {
    const srcPath = path.join(AGENT_SRC_DIR, file);
    const dstPath = path.join(AGENTS_TARGET_DIR, file);
    const written = await installAgentFile(srcPath, dstPath);
    if (written) installed++;
    else skipped++;
  }

  console.log(`\nAgents: ${installed} installed, ${skipped} skipped.`);
}

async function main() {
  // Check template exists
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error("ERROR: AGENTS.template.md not found.");
    console.error("Ensure AGENTS.template.md exists in the parent directory of scripts/.");
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("╔══════════════════════════════════════════════╗");
  console.log("║      Fractal Skills — OpenCode Installer     ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");
  console.log("This script generates ~/.config/opencode/AGENTS.md");
  console.log("and installs OpenCode agent definitions.");
  console.log("");

  const userName = await ask(rl, "Your name: ");
  const languages = await ask(
    rl,
    "Languages you work with (e.g. Rust, TypeScript, Python): "
  );

  rl.close();

  if (!userName || !languages) {
    console.error("\nERROR: Both name and languages are required.");
    process.exit(1);
  }

  // Apply template substitutions
  const result = template
    .replace(/\{\{USER_NAME\}\}/g, userName)
    .replace(/\{\{LANGUAGES\}\}/g, languages);

  // Ensure target directory exists
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  // Check if existing - prompt warning
  if (fs.existsSync(TARGET_PATH)) {
    const shouldOverwrite = await confirmOverwrite(TARGET_PATH);
    if (!shouldOverwrite) {
      console.log("\nAGENTS.md skipped. Proceeding with agent installation...");
    } else {
      fs.writeFileSync(TARGET_PATH, result, "utf-8");
      console.log(`\n✓ Written: ${TARGET_PATH}`);
    }
  } else {
    fs.writeFileSync(TARGET_PATH, result, "utf-8");
    console.log(`\n✓ Written: ${TARGET_PATH}`);
  }

  // Install agent definitions
  await installAgents();

  console.log("\n  Restart your coding agent session for changes to take effect.");
  process.exit(0);
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
