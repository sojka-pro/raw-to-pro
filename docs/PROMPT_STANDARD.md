# RAW → PRO Prompt Standard v1

Każdy wynik powinien być:

1. zgodny z intencją materiału RAW;
2. pozbawiony wymyślonych faktów;
3. jednoznaczny co do celu, zakresu i wyniku;
4. możliwy do zweryfikowania;
5. dopasowany do narzędzia docelowego;
6. bezpieczny dla sekretów i danych osobowych;
7. gotowy do skopiowania bez dodatkowej obróbki.

## Rdzeń promptu

- `ROLE` — kompetencje potrzebne do zadania;
- `GOAL` — jeden główny rezultat;
- `CONTEXT` — fakty i źródła;
- `CONSTRAINTS` — granice, bezpieczeństwo i non-goals;
- `TASK` — działania w poprawnej kolejności;
- `OUTPUT` — dokładny kontrakt odpowiedzi;
- `DONE` — obserwowalne kryteria ukończenia.

Typy specjalistyczne rozszerzają rdzeń zgodnie z
[`data/prompt-types.json`](../data/prompt-types.json).
