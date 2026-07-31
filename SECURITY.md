# Security Policy

## Supported version

Security fixes target the latest release on `main`.

## Rules

- Never commit API keys, tokens, passwords or `.env` files.
- Keep OpenAI API calls on the server.
- Do not log raw prompts or generated output.
- Validate and limit all user-controlled text before API calls.
- Treat pasted content as untrusted data, not application instructions.

## Reporting

Do not open a public issue containing a vulnerability or secret. Contact the
repository owner privately through an established SOJKA.PRO™ channel.

If a secret is committed, revoke it immediately; deleting a later commit is not
sufficient.
