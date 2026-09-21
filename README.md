# RAW → PRO

Minimalistyczny generator, który zamienia chaotyczne notatki, burzę mózgu,
surowe dane lub niedopracowane polecenie w profesjonalny prompt gotowy do
użycia.

Oficjalny projekt **SOJKA.PRO™**.

## Obsługiwane zastosowania

- ChatGPT i ChatGPT Work;
- Codex, Claude Code, OpenCode, Cursor i asystenci VS Code;
- dedykowany target OpenCode + Muse Spark 1.3;
- GitHub Copilot;
- generatory grafiki;
- zadania analityczne, operacyjne i techniczne.

## Protocol packs

Repo może przechowywać gotowe systemy zbudowane standardem RAW → PRO.

- [MAGICK//AI OS — Chaos Magick Codex](packs/magick-ai-os/README.md) — pełny,
  dwujęzyczny protokół chaos magick + AI operator, z profilami dla
  OpenCode + Muse Spark 1.3 i ChatGPT Work.

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
- [master prompt v2](MASTER_PROMPT.md)
- [bezpieczeństwo](SECURITY.md)
- [prywatność](PRIVACY.md)

## Status

`0.1.0` — działający MVP generatora. Protocol packs rozwijają zastosowania bez
komplikowania podstawowej architektury aplikacji.

## Prawa

Copyright © 2026 Łukasz Sojka / SOJKA.PRO™. All rights reserved.
Zobacz [LICENSE](LICENSE).
