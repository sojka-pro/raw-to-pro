# OpenCode + Muse Spark 1.3 profile

This profile turns the Codex folder into a local operator workspace.

## Recommended setup

Open `packs/magick-ai-os/` as the OpenCode workspace.

The folder includes:
- `AGENTS.md` — persistent project rules;
- `.opencode/agents/magick-operator.md` — primary MAGICK//AI OS agent;
- Polish and English Codex files;
- a session template.

The bundled agent selects `opencode/muse-spark-1.3`.

## Why this shape

The operator is deliberately **file-aware but shell-disabled**. The main work is knowledge work and journaling, so arbitrary command execution adds little value.

Edits are set to `ask` so the model can propose saving or updating a journal while the user remains in control.

## Session workflow

1. Open this folder as the workspace.
2. Select the `magick-operator` agent.
3. Start with `/boot`.
4. Use `/raw` and paste the material.
5. Continue through the Codex commands.
6. If persistence is useful, ask: “Save this session using templates/SESSION.md.”
7. Review the proposed edit before allowing it.

## Muse Spark 1.3 prompting notes

- Keep one bounded objective per turn when possible.
- Keep current session state explicit during long sessions.
- Name the file you want changed instead of giving vague write permission.
- For difficult reviews, request a split between evidence, interpretation and alternatives before choosing the next iteration.
- Use another model only when the task actually needs capabilities outside this profile.

## Provider note

If you choose a different Muse Spark 1.3 provider or tier, check its current data and usage terms before putting private journal material into it. The Codex does not assume identical privacy behavior across providers.
