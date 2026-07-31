# RAW → PRO

Minimalistyczny generator, który zamienia chaotyczne notatki, burzę mózgu,
surowe dane lub niedopracowane polecenie w profesjonalny prompt gotowy do
użycia.

Oficjalny projekt **SOJKA.PRO™**.

## Obsługiwane zastosowania

- ChatGPT i inne ogólne chaty AI;
- Codex, Claude Code, OpenCode, Cursor i asystenci VS Code;
- GitHub Copilot;
- generatory grafiki;
- zadania analityczne, operacyjne i techniczne.

## Uruchomienie

Wymagania: Node.js 22+ i własny klucz OpenAI API.

```bash
npm install
cp .env.example .env.local
```

Ustaw `OPENAI_API_KEY` w `.env.local`, następnie:

```bash
npm start
```

Otwórz `http://localhost:3000`.

## Kontrole

```bash
npm run check
```

## Konfiguracja

| Zmienna | Wymagana | Domyślna |
|---|---:|---|
| `OPENAI_API_KEY` | tak | — |
| `OPENAI_MODEL` | nie | `gpt-5.6` |
| `PORT` | nie | `3000` |

Klucz nigdy nie jest wysyłany do przeglądarki. Aplikacja nie zapisuje historii
promptów ani treści wejściowej.

## Dokumentacja

- [standard promptów](docs/PROMPT_STANDARD.md)
- [architektura](docs/ARCHITECTURE.md)
- [roadmap](docs/ROADMAP.md)
- [master prompt](MASTER_PROMPT.md)
- [bezpieczeństwo](SECURITY.md)
- [prywatność](PRIVACY.md)

## Status

`0.1.0` — MVP przeznaczony do lokalnego uruchomienia i wczesnej walidacji.

## Prawa

Copyright © 2026 Łukasz Sojka / SOJKA.PRO™. All rights reserved.
Zobacz [LICENSE](LICENSE).
