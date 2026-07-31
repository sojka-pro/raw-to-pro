import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildGenerationInstructions,
  normalizeGenerationRequest
} from "./lib/prompt-builder.js";

const app = express();
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const model = process.env.OPENAI_MODEL ?? "gpt-5.6";
const root = path.dirname(fileURLToPath(import.meta.url));

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(root, "public")));

app.get("/api/health", (_request, response) => {
  response.json({
    ok: true,
    service: "raw-to-pro",
    modelConfigured: Boolean(process.env.OPENAI_API_KEY)
  });
});

app.post("/api/generate", async (request, response) => {
  if (!process.env.OPENAI_API_KEY) {
    return response.status(503).json({
      error: "Brak OPENAI_API_KEY po stronie serwera."
    });
  }

  let input;

  try {
    input = normalizeGenerationRequest(request.body);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.responses.create({
      model,
      instructions: buildGenerationInstructions(input),
      input: input.raw,
      max_output_tokens: input.depth === "master" ? 5000 : 3000
    });

    const prompt = result.output_text?.trim();

    if (!prompt) {
      throw new Error("Model nie zwrócił treści.");
    }

    return response.json({
      prompt,
      meta: {
        model,
        target: input.target,
        type: input.type,
        depth: input.depth,
        language: input.language
      }
    });
  } catch (error) {
    const status = Number.isInteger(error?.status) ? error.status : 500;
    const safeStatus = status >= 400 && status < 600 ? status : 500;

    console.error("Generation failed:", error?.name ?? "Error", safeStatus);

    return response.status(safeStatus).json({
      error:
        safeStatus === 429
          ? "Limit API został osiągnięty. Spróbuj ponownie za chwilę."
          : "Nie udało się wygenerować promptu. Spróbuj ponownie."
    });
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: "Nie znaleziono zasobu." });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`RAW → PRO działa na http://localhost:${port}`);
  });
}

export default app;
