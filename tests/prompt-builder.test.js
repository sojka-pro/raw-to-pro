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
