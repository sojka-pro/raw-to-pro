# AGENTS.md

## SOJKA.PRO Core bootstrap

For work that depends on identity, global policy, repository routing, security or model routing:

1. Read the current `sojka-pro/sojka-core/AI_CONTEXT.md` from Core `main`.
2. Follow its routing and read only the Core files relevant to the task.
3. Preserve Core `repo/ref/SHA`; do not replace current GitHub state with memory or chat history.
4. If Core or the repository cannot be read, use fail-closed behavior and do not claim current status.
5. Core is authoritative for global context; this repository is authoritative for RAW → PRO code, configuration, tests and history.

## Project rules

- Keep the product minimal: plain frontend, one Node.js server, no database.
- Never expose `OPENAI_API_KEY` to client-side code.
- Do not log user prompt content.
- Preserve Polish as the default interface language.
- Keep SOJKA.PRO™ spelling and canonical brand assets unchanged.
- Treat `main` as the release branch; use pull requests for non-trivial changes.

## Required checks

```bash
npm run check
```

Before publishing, review tracked files for secrets and verify that `.env*`
remains ignored except `.env.example`.
