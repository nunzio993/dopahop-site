---
description: Traduce un articolo IT in EN/ES/DE/FR via 4 sub-agent madrelingua paralleli
---

# /translate-article

Traduce un articolo italiano del blog in EN/ES/DE/FR usando 4 sub-agent madrelingua dedicati in parallelo. Salva i 4 file `.md` nelle cartelle delle rispettive lingue, commit + push, Cloudflare ribuilda.

## Argomento

L'utente passa lo slug dell'articolo IT come argomento, es:
```
/translate-article procrastinazione-meccanismo-reale
```

Se manca, chiedi all'utente lo slug.

## Esegui questi step

1. **Verifica esistenza file IT**:
   - Path: `D:/dopahop/site/src/content/blog/it/<slug>.md`
   - Se non esiste, ferma e segnala "File IT non trovato. Hai sbagliato slug? Lancia `/draft-article` prima."

1b. **Pre-flight check del file IT** (prima di spendere ~4× API per traduzioni):

   - **Frontmatter YAML parseable**: le prime righe tra `---` devono essere YAML valido. Estrai title, description, slug, locale, draft, translationKey.
   - **`locale` deve essere `it`**: se diverso, ferma e segnala "il file non è in italiano".
   - **Body word count >= 800**: se troppo corto, segnala "il file IT ha solo X parole, traduzione potrebbe valer poco. Procedere comunque? (sì/no)"
   - **Verifica file destinazione**: per ogni `<locale>` in `[en, es, de, fr]`, controlla se `src/content/blog/<locale>/<slug>.md` esiste già.
     - Se almeno uno esiste: chiedi all'utente "le traduzioni in [lista lingue] esistono già. Sovrascrivere? (sì/no/skip-esistenti)"
     - `sì` = sovrascrivi tutto
     - `no` = ferma
     - `skip-esistenti` = traduci solo le lingue mancanti (spawna meno sub-agent)

   Se almeno un check fallisce hard (file rotto, locale sbagliato), ferma e segnala. NON spawnare sub-agent.

2. **Verifica che `draft` sia `false` nel frontmatter IT**:
   - Se `draft: true`, chiedi all'utente: "Il file IT è ancora in `draft: true`. Procedo comunque a tradurlo come bozza? (sì/no)"
   - Se sì, le traduzioni avranno anch'esse `draft: true`
   - Se no, ferma

3. **Leggi `BRAND_VOICE.md`** (sezione 9 ha il glossario ADHD localizzato per ogni lingua)

4. **Spawna sub-agent in parallelo** (single message con N Agent tool calls — N = lingue da tradurre, max 4). Ciascuno ha questo brief (sostituisci [LOCALE], [LOCALE_NAME], [GLOSSARIO_LOCALE], [PATH_OUT]):

### Brief comune

```
Sei un copywriter [LOCALE_NAME] madrelingua per DopaHop, un'app ADHD gentile per Android.

Il tuo task: tradurre/riscrivere in [LOCALE_NAME] un articolo blog scritto in italiano.

NON tradurre letteralmente. Riscrivilo come se fosse stato pensato direttamente in [LOCALE_NAME] da una persona madrelingua. Mantieni il significato, l'argomento, la struttura H2/H3, i link interni, i fatti, le fonti citate. Cambia gli idiomi, le costruzioni di frase, i collegamenti culturali quando servono.

INPUT: leggi il file IT a:
`D:/dopahop/site/src/content/blog/it/[SLUG].md`

LE REGOLE COPY DopaHop in `D:/dopahop/site/BRAND_VOICE.md` (leggile prima di iniziare). In particolare:
- Niente toxic positivity né streak-shaming
- Tono caldo, diretto, mai paternalistico
- Esempi concreti vivi
- Tutoiement (tu/du/tu/tú secondo lingua)

GLOSSARIO ADHD per [LOCALE_NAME]:
[GLOSSARIO_LOCALE]

OUTPUT: scrivi un file Markdown completo a:
`[PATH_OUT]`

Il file deve contenere:
- Frontmatter identico a quello IT MA:
  - `title`: tradotto in [LOCALE_NAME], rispetta 50-60 char
  - `description`: tradotta in [LOCALE_NAME], rispetta 150-160 char, include la keyword ADHD localizzata
  - `excerpt`: tradotto
  - `tags`: traduci ogni tag (mantieni "ADHD" come "ADHD"/"ADHS"/"TDAH" secondo lingua)
  - `locale`: [LOCALE]
  - `pubDate`, `updatedDate`, `cover`, `author`, `translationKey`: identici al file IT
  - `draft`: identico al file IT
- Body Markdown:
  - Stessa struttura H2/H3 del file IT (stesso numero di sezioni, stesso ordine logico)
  - Internal link `(/#cosa-fa)` → riadatta a `(/[LOCALE]/#cosa-fa)` per i link interni del modulo
  - Internal link a altri articoli blog: `(/blog/<slug>/)` → riadatta a `(/[LOCALE]/blog/<slug>/)`
  - Disclaimer (se presente nell'IT): traduci e localizza il numero di emergenza:
    - EN: "your local emergency number"
    - ES: "112"
    - DE: "112"
    - FR: "le 112"

Quando hai finito, conferma il path scritto e segnala 1-2 decisioni traduttive non banali (es. idiomi che hai cambiato).
```

### Per ciascun sub-agent, sostituisci:

- **EN**: `[LOCALE]=en`, `[LOCALE_NAME]=English (UK/US neutral, lean US for "mom")`, `[PATH_OUT]=D:/dopahop/site/src/content/blog/en/<slug>.md`, glossario: `ADHD, ADD, executive dysfunction, neurodivergent`
- **ES**: `[LOCALE]=es`, `[LOCALE_NAME]=Spanish (España neutro, no vosotros, sí tú)`, `[PATH_OUT]=D:/dopahop/site/src/content/blog/es/<slug>.md`, glossario: `TDAH, TDA, disfunción ejecutiva, neurodivergencia`
- **DE**: `[LOCALE]=de`, `[LOCALE_NAME]=German (Standarddeutsch, du-form, no Sie)`, `[PATH_OUT]=D:/dopahop/site/src/content/blog/de/<slug>.md`, glossario: `ADHS, ADS, exekutive Dysfunktion, neurodivergent`
- **FR**: `[LOCALE]=fr`, `[LOCALE_NAME]=French (France standard, tutoiement, no vous)`, `[PATH_OUT]=D:/dopahop/site/src/content/blog/fr/<slug>.md`, glossario: `TDAH, TDA, dysfonction exécutive, neuroatypie`

5. **Aspetta che tutti e 4 i sub-agent finiscano**. Verifica che tutti i 4 file `.md` siano stati creati.

6. **Commit + push**:
   ```bash
   git add src/content/blog/en/<slug>.md src/content/blog/es/<slug>.md src/content/blog/de/<slug>.md src/content/blog/fr/<slug>.md
   git commit -m "feat(blog): translations en/es/de/fr for <slug>"
   git push
   ```

   Footer commit: Co-Authored-By Claude.

7. **Riporta all'utente**:
   - I 4 path scritti
   - Per ogni lingua: 1 decisione traduttiva non banale (presa dal report del sub-agent)
   - URL live di ogni traduzione (es. `https://dopahop-site.pages.dev/en/blog/<slug>/`)
   - Reminder: "Cloudflare ribuilda in 1-2 min."

## Errori comuni da gestire

- Se il file IT non esiste → ferma e segnala
- Se 1 dei 4 sub-agent fallisce → rilancia solo quello (foreground) con stesso brief
- Se git push fallisce → riporta errore esatto, NON ritentare auto
- Se uno dei file traduzione esiste già → conferma sovrascrittura con utente

## Importante

- I 4 sub-agent vanno spawned **in parallelo**, in un singolo messaggio Agent con 4 tool calls
- I 4 sub-agent sono "general-purpose"
- Aspetto le 4 risposte e poi committo tutto insieme

## Tempo atteso

~90-120 secondi (4 sub-agent paralleli + commit + push).
