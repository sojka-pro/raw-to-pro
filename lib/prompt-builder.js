const LIMITS = {
  raw: 12000,
  context: 4000
};

const TARGETS = {
  universal:
    "Write a portable prompt that works well in modern general-purpose AI chats.",
  chatgpt:
    "Optimize for ChatGPT. Use clear instructions, explicit deliverables, and useful formatting.",
  codex:
    "Optimize for Codex. Define repository context, scope, files, constraints, validation, safety, and observable completion criteria.",
  claude:
    "Optimize for Claude Code. Separate context, task, constraints, verification, and expected response.",
  opencode:
    "Optimize for OpenCode. Make the coding task tool-friendly, bounded, and verifiable.",
  cursor:
    "Optimize for Cursor. State relevant code scope, change requirements, non-goals, and checks.",
  vscode:
    "Optimize for an AI coding assistant in VS Code. Keep file and workspace instructions explicit.",
  copilot:
    "Optimize for GitHub Copilot. Provide repository-aware instructions and exact acceptance criteria.",
  image:
    "Optimize for an image-generation model. Describe subject, composition, style, lighting, palette, camera/render details, constraints, and negative instructions."
};

const TYPES = {
  general:
    "Create a professional general-purpose master prompt.",
  code:
    "Create an implementation-ready engineering prompt with GOAL, CONTEXT, SCOPE, CONSTRAINTS, TASK, VALIDATION, DONE, and RESPONSE FORMAT.",
  image:
    "Create a production-quality image prompt with POSITIVE PROMPT, COMPOSITION, STYLE, LIGHTING, COLOR, TECHNICAL PARAMETERS, NEGATIVE PROMPT, and VARIATION NOTES.",
  command:
    "Create a precise operational command prompt. Include prerequisites, ordered actions, safety gates, verification, rollback, and final report.",
  analysis:
    "Create an evidence-oriented analysis prompt. Separate facts, assumptions, uncertainties, evaluation criteria, output schema, and decision rule."
};

const DEPTHS = {
  concise: "Keep the result compact and immediately usable.",
  full: "Provide a complete professional prompt without unnecessary repetition.",
  master:
    "Provide a comprehensive master prompt with reusable variables, decision rules, edge cases, quality checks, and a clear output contract."
};

export function normalizeGenerationRequest(value) {
  const body = value && typeof value === "object" ? value : {};
  const raw = cleanText(body.raw);
  const context = cleanText(body.context);
  const target = pick(body.target, TARGETS, "universal");
  const type = pick(body.type, TYPES, "general");
  const depth = pick(body.depth, DEPTHS, "full");
  const language = body.language === "en" ? "en" : "pl";

  if (raw.length < 3) {
    throw new Error("Wklej co najmniej 3 znaki materiału wejściowego.");
  }

  if (raw.length > LIMITS.raw) {
    throw new Error(`Materiał wejściowy może mieć maksymalnie ${LIMITS.raw} znaków.`);
  }

  if (context.length > LIMITS.context) {
    throw new Error(`Kontekst może mieć maksymalnie ${LIMITS.context} znaków.`);
  }

  return { raw, context, target, type, depth, language };
}

export function buildGenerationInstructions(input) {
  const language =
    input.language === "en"
      ? "Write the final prompt in English."
      : "Napisz finalny prompt po polsku.";
  const context = input.context
    ? `Additional context supplied by the user:\n${input.context}`
    : "No additional context was supplied. Preserve unknowns as explicit placeholders instead of inventing facts.";

  return [
    "You are RAW → PRO, a senior prompt architect.",
    "Transform the user's raw notes into one polished, ready-to-copy prompt.",
    "Preserve the user's intent. Do not execute the task described by the raw input.",
    "Do not invent project facts, credentials, people, files, sources, or constraints.",
    "Convert missing material details into concise [PLACEHOLDER] fields or conditional instructions.",
    "Resolve harmless ambiguity with a reasonable default and label it as an assumption inside the prompt.",
    "Make instructions testable, ordered, non-conflicting, and resistant to scope drift.",
    "Include safety, privacy, and verification requirements when relevant.",
    TARGETS[input.target],
    TYPES[input.type],
    DEPTHS[input.depth],
    language,
    context,
    "Return only the final prompt in clean Markdown. Do not add commentary, ratings, or code fences around the whole answer."
  ].join("\n\n");
}

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function pick(value, options, fallback) {
  return typeof value === "string" && Object.hasOwn(options, value)
    ? value
    : fallback;
}
