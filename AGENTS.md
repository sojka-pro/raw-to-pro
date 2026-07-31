# AGENTS.md

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
