#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");

const TEMPLATE_PATH = path.join(__dirname, "..", "AGENTS.template.md");
const FRACTAL_AGENT_PATH = path.join(__dirname, "..", "opencode-agents", "fractal.md");
const TARGET_DIR = path.join(os.homedir(), ".config", "opencode");
const TARGET_PATH = path.join(TARGET_DIR, "AGENTS.md");
const AGENTS_TARGET_DIR = path.join(TARGET_DIR, "agents");
const FRACTAL_TARGET_PATH = path.join(AGENTS_TARGET_DIR, "fractal.md");
const HELP_TEXT = `Fractal Skills OpenCode installer

Usage:
  fractal-skills install
  node scripts/install.js install

This command generates ~/.config/opencode/AGENTS.md
and installs ~/.config/opencode/agents/fractal.md.
`;

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

async function readNonInteractiveAnswers() {
  if (process.stdin.isTTY) {
    return [];
  }

  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks)
    .toString("utf-8")
    .split(/\r?\n/)
    .map((value) => value.trim());
}

function createPrompt(queuedAnswers) {
  if (!process.stdin.isTTY) {
    let index = 0;

    return {
      ask(question) {
        process.stdout.write(question);
        const answer = queuedAnswers[index] ?? "";
        index += 1;
        return Promise.resolve(answer);
      },
      close() {},
    };
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return {
    ask(question) {
      return ask(rl, question);
    },
    close() {
      rl.close();
    },
  };
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
  console.log("\nInstalling OpenCode fractal agent...");
  fs.mkdirSync(AGENTS_TARGET_DIR, { recursive: true });

  const written = await installAgentFile(FRACTAL_AGENT_PATH, FRACTAL_TARGET_PATH);
  console.log(`\nFractal agent: ${written ? "installed" : "skipped"}.`);
}

function validateRuntimeFiles() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error("ERROR: AGENTS.template.md not found.");
    console.error("Ensure AGENTS.template.md exists in the package root.");
    process.exit(1);
  }

  if (!fs.existsSync(FRACTAL_AGENT_PATH)) {
    console.error("ERROR: opencode-agents/fractal.md not found.");
    console.error("Ensure the fractal agent definition is included with this package.");
    process.exit(1);
  }
}

function resolveCommand(argv) {
  const [command] = argv;

  if (!command) {
    return "install";
  }

  if (command === "install") {
    return command;
  }

  if (command === "help" || command === "--help" || command === "-h") {
    console.log(HELP_TEXT);
    process.exit(0);
  }

  console.error(`ERROR: Unknown command '${command}'.`);
  console.error(HELP_TEXT);
  process.exit(1);
}

async function main() {
  resolveCommand(process.argv.slice(2));
  validateRuntimeFiles();

  const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");
  const prompt = createPrompt(await readNonInteractiveAnswers());

  console.log("╔══════════════════════════════════════════════╗");
  console.log("║      Fractal Skills — OpenCode Installer     ║");
  console.log("╚══════════════════════════════════════════════╝");
  console.log("");
  console.log("This script generates ~/.config/opencode/AGENTS.md");
  console.log("and installs the OpenCode fractal agent definition.");
  console.log("");

  const userName = await prompt.ask("Your name: ");
  const languages = await prompt.ask(
    "Languages you work with (e.g. Rust, TypeScript, Python): "
  );

  prompt.close();

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
      console.log("\nAGENTS.md skipped. Proceeding with fractal agent installation...");
    } else {
      fs.writeFileSync(TARGET_PATH, result, "utf-8");
      console.log(`\n✓ Written: ${TARGET_PATH}`);
    }
  } else {
    fs.writeFileSync(TARGET_PATH, result, "utf-8");
    console.log(`\n✓ Written: ${TARGET_PATH}`);
  }

  await installAgents();

  console.log("\n  Restart your coding agent session for changes to take effect.");
  process.exit(0);
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
