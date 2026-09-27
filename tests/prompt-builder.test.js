import test from "node:test";
import assert from "node:assert/strict";

import {
  buildGenerationInstructions,
  normalizeGenerationRequest
} from "../lib/prompt-builder.js";

test("normalizes a valid request", () => {
  const result = normalizeGenerationRequest({
    raw: "  Zbuduj małe API  ",
    type: "code",
    target: "codex",
    depth: "master",
    language: "pl"
  });

  assert.equal(result.raw, "Zbuduj małe API");
  assert.equal(result.target, "codex");
  assert.equal(result.type, "code");
  assert.equal(result.depth, "master");
});

test("accepts new operator targets", () => {
  const work = normalizeGenerationRequest({
    raw: "uporządkuj projekt",
    target: "chatgpt_work"
  });
  const muse = normalizeGenerationRequest({
    raw: "edytuj dokumentację",
    target: "opencode_muse"
  });

  assert.equal(work.target, "chatgpt_work");
  assert.equal(muse.target, "opencode_muse");
});

test("falls back to safe option values", () => {
  const result = normalizeGenerationRequest({
    raw: "abc",
    type: "unknown",
    target: "unknown",
    depth: "unknown",
    language: "unknown"
  });

  assert.equal(result.type, "general");
  assert.equal(result.target, "universal");
  assert.equal(result.depth, "full");
  assert.equal(result.language, "pl");
});

test("rejects empty and oversized input", () => {
  assert.throws(
    () => normalizeGenerationRequest({ raw: "x" }),
    /co najmniej 3/
  );
  assert.throws(
    () => normalizeGenerationRequest({ raw: "x".repeat(12001) }),
    /maksymalnie 12000/
  );
});

test("builds target-aware instructions without executing raw content", () => {
  const input = normalizeGenerationRequest({
    raw: "napisz testy",
    target: "codex",
    type: "code",
    depth: "full",
    language: "en"
  });
  const instructions = buildGenerationInstructions(input);

  assert.match(instructions, /Optimize for Codex/);
  assert.match(instructions, /Do not execute the task/);
  assert.match(instructions, /Write the final prompt in English/);
});

test("builds ChatGPT Work and Muse-specific instructions", () => {
  const work = buildGenerationInstructions(
    normalizeGenerationRequest({
      raw: "zrób raport",
      target: "chatgpt_work"
    })
  );
  const muse = buildGenerationInstructions(
    normalizeGenerationRequest({
      raw: "zaktualizuj pliki",
      target: "opencode_muse"
    })
  );

  assert.match(work, /ChatGPT Work/);
  assert.match(work, /approval gates/i);
  assert.match(muse, /Muse Spark 1\.3/);
  assert.match(muse, /one bounded objective/i);
});
