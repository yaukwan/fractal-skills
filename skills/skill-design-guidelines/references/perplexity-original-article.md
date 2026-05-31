# Designing, Refining, and Maintaining Agent Skills at Perplexity

Source URL: https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
Fetched via: https://r.jina.ai/http://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity
Reference purpose: Full original markdown source for deep lookup when exact wording, examples, or nuanced guidance from the article is needed.

---

Title: Designing, Refining, and Maintaining Agent Skills at Perplexity

URL Source: http://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity

Markdown Content:
Perplexity’s frontier agent products rest on a foundation of know-how and domain expertise packaged in modular [Agent Skills](https://agentskills.io/home). We maintain a carefully curated library of Skills across our technical environments. These Skills include many of the general-purpose utilities powering [Perplexity Computer](https://www.perplexity.ai/products/computer); vertical-specific capabilities in areas such as finance, law, and health; and a very long tail of modules for addressing user needs. Some Skills are infrequently invoked but critical _when_ invoked. To ensure a consistently excellent user experience, Perplexity’s Agents team prioritizes Skill quality just as much as code quality.

The intuitions and best practices required to develop a high-quality Skill differ significantly from those required to build traditional software. The Agents team reviews many pull requests from excellent engineers who develop Skills in the course of their work. The result is almost always numerous comments and suggestions for revision. This is because many useful patterns for writing code become antipatterns in Skill creation.

For example, if you take some of the aphorisms from [PEP20 – The Zen of Python](https://peps.python.org/pep-0020/), it quickly becomes clear that writing good Python code is unlike writing good Skills. Of the 20 lines of wisdom, at least half are fully wrong or actively misleading when writing Skills. Here are five of them:

| **Zen of Python** | **Zen of Skills** |
| --- | --- |
| Simple is better than complex | A Skill is a folder, not a file. Complexity is the feature. |
| Explicit is better than implicit | Activation is implicit pattern matching. Progressive disclosure. |
| Sparse is better than dense | Context is expensive. Maximum signal per token. |
| Special cases aren’t special enough to break the rules | Gotchas ARE the special cases (they're the highest-value content). |
| If the implementation is easy to explain, it may be a good idea | If it's easy to explain, the model already knows it. Delete it. |

This guide is the document that engineers across Perplexity use when developing and reviewing Skills. We’re also releasing this guide to the public so that our discoveries and learnings can benefit the broader community. Whether you’re an engineer designing production Skills in your day-to-day work, a Computer user looking to develop your own Skill in an area you know best, or both, this guide is for you.

## What is a Skill?

When you write a Skill, you aren’t writing plain old software (even though Skills are now part of the main logical engines for agent systems). Rather, you're building context for models and their environments. A Skill has different constraints and different design principles. If you write a Skill like you do code, you will fail.

A Skill is at least four things, especially in the context of how we build them at Perplexity.

### A Skill is a Directory

A Skill is not just a single `SKILL.md` file. In many cases, a Skill includes several files. Under the directory named after your Skill, you might have:

* `SKILL.md`: frontmatter and instructions
* `scripts/`: code the agent runs, not reinvents
* `references/`: heavy docs, loaded conditionally
* `assets/`: templates, schemas, and data
* `config.json`: first-run user setup

This hub-and-spoke pattern allows you to keep Skills very focused and tight, and one can use the folder structure in a very creative way. Sometimes, particularly intricate Skills benefit from multiple levels of hierarchy to help the model navigate better. Suppose a Skill requires knowledge across 300 topics, groupable into 20 subject matter areas. Reliably choosing the right topic among 300 is an unsolved challenge even for today’s best frontier models. It’s a much easier choice problem for a model to hone in on one of 20 areas, than among the 15 topics within that area.

As one example of how multilevel hierarchy provides value, our team employed three levels of topical nesting within the Skills powering Computer’s U.S. income tax capabilities this past tax season. This hierarchy was absolutely indispensable given the complexity of tax law: in our early tests, presenting the model with a single folder containing all 1,945 sections of the U.S. Internal Revenue Code resulted in worse performance than not loading the Skill at all. Organizing the information into logical subdivisions was indispensable for ensuring high-precision read operations.

Yet this hierarchy did not come free. Increasing levels of hierarchy require increasing levels of curation across the information architecture to manage the resulting indirection. We devised quick reference guides, custom search utilities, and other tools to support the model in locating information with a minimum of indirection. In this case, doing the hard work of curation ultimately produced a positive end result: a Skill that allowed models to perform tax-related tasks much more capably than using general tools alone.

### A Skill is a Format

A Skill is a format. The core root `SKILL.md` file must have both a name and a description. Furthermore, the Skill needs to exactly map to the directory name in which the Skill is located. The name must be all lower-case characters, have no spaces, and can use hyphens. The description is the routing trigger. This is a common failure point: the description is not internal documentation for what the Skill does. It amounts to instructions for the model for when to load the Skill. So, you will frequently see “Load when,” not “This Skill does.” This is important because of the way that most implementations inject the description into the model context.

Within the frontmatter, there is also `depends:`, which allows you to create hierarchical Skill dependencies, and `metadata:`, which is used for reviews and evaluations. Different agent systems can even define their own frontmatter fields, to be used in a manner specific to those systems. As an alternative, Skill-specific metadata can be packaged in an auxiliary JSON or YAML configuration file. This is desirable when building agent systems that need to facilitate different types of runtime behavior per Skill without polluting the model’s context with minutiae. Finally, similar behavior is obtainable through stripping Skill frontmatter on read. Computer employs this methodology, which allows configuration to be preserved in the root `SKILL.md` file. Careful attention to detail is required in the parsing logic, and one might wish to implement conditional stripping if there are certain fields that are useful to have within the model context.

### A Skill is Invocable

A Skill is invocable. The agent loads a Skill at runtime. Importantly, Skills aren’t always bundled into the context. By default, most agent systems unfold Skills progressively upon specific need.

There are at least three tiers of context costs in the way that we've implemented Skills in Computer. Here is the process:

1. Computer calls `load_skill(name="...")`
2. Computer copies the Skill directory into the isolated execution sandbox
3. Computer recursively auto-loads dependencies in the `depends:` tag
4. Computer then strips the frontmatter and the agent thus only sees the body and the additional files

Different agent systems can choose to expose Skill content in different ways. As an example, some systems might choose not to expose the file hierarchy at all, leaving it to the model to discover the hierarchy through filesystem operations. Other systems may choose to give the model a mapping of the entire filetree up to a certain truncation and/or depth limit. To keep context clean, Computer omits full file hierarchies from the invocation context; however, this is overridable on a per-Skill basis.

### A Skill is Progressive

Skills are progressive. In Computer, there are three different tiers of context costs, and we incur all three at various stages:

| **Tier** | **What loads** | **Budget** | **When you pay** |
| --- | --- | --- | --- |
| Index | `name: description` for every non-hidden Skill | ~100 tokens per Skill | Every session, every user, always paid |
| Load | Full `SKILL.md` body | ~5,000 tokens | When the skill loads |
| Runtime | Files in `scripts/`, `references/`, `assets/`, subskills, `FORMATTING.md`, `SPECIAL_CASES.md` | Unbounded | Only when the agent reads them |

Computer builds a Skill index that has the name and the description for every available Skill. The budget for this is around 100 tokens per Skill. It’s so tight because you're paying this cost in every session, for every user. The model has access to a bunch of named Skills and descriptions so that it can decide whether to call `load_skill()`. The bar to getting into this index is extremely high.

After the agent system loads the Skill, there’s the full `SKILL.md` body. Ideally, the body text does not exceed 5,000 tokens. Even then, you want every sentence to matter because once you load a Skill, the rest of the conversation has to pay that until you hit the compaction boundary. Many threads load anywhere between three and five different Skills, multiplying this cost.

The final level of progression is scripts or special cases, like subskills or formatting. This is where you want to put unbounded conditional branched logic. The agent will only use it when it needs to, meaning there's a much lower bar for what you want to put in here.

## When do you need a Skill?

The only way to really figure this out is to start with your agent without the Skill, run several hero queries, and then figure out whether the agent is doing a good job.

### When you need a Skill

You need a Skill when the agent will get it wrong without special context, or if there's some inconsistency or non-determinism that you need to be extremely consistent across runs.

It could be that your knowledge is durable but not in the training data. There could be cutoffs or enterprise specific workflows, or it could be a matter of taste.

### When you don’t need a Skill

If the model already knows how to do it, or if the content is just system-prompt duplication, or if the content changes faster than you can maintain it, it usually should not be a Skill.

### Every Skill is a tax

A useful test for every sentence:

> Would the agent get this wrong without this instruction?

If not, the sentence probably cannot afford to be there.

## How to build a Skill

### Step 0: Write the Evals

Start with:

* Real user queries
* Known failures
* Neighbor confusion

Negative examples are extremely powerful.

### Step 1: The Description

The description is the hardest line in the Skill. It’s a routing trigger, not documentation.

Checklist:

* Starts with "Load when..."
* Target 50 words or fewer
* Describes the user’s intent, ideally from real queries
* Does not summarize the workflow

### Step 2: Write the Body

Skip the obvious things. Don’t write out a series of commands the model already knows.

Bad:

`git log # find the commit; git checkout main; git checkout -b <clean-branch>; git cherry-pick <commit>;`

Better:

`Cherry-pick the commit onto a clean branch. Resolve conflicts preserving intent. If it can't land cleanly, explain why.`

Focus on gotchas and negative examples. If any portion is conditional or heavy, move it out of `SKILL.md` into an accessory file that can be progressively loaded.

### Step 3: Use the Hierarchy

`scripts/`

Deterministic logic the agent would reinvent every run. Give it code to compose, not reconstruct.

`references/`

Heavy docs loaded only when a condition is met.

`assets/`

Output templates the agent copies and fills.

`config.json`

First-run user setup.

### Step 4: Iterate

Run baseline tests without the Skill, then with it. Iterate on routing, gotchas, boundaries, and wording. Small word changes in descriptions can produce large routing differences.

---

Note: This copy is stored as a deep reference, not as the primary runtime guidance. Prefer `SKILL.md` and the curated summary/reference files first. Load this file only when exact original wording or raw-source nuance is needed.
