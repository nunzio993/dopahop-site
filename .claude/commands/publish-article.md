---
description: Pubblica un articolo blog togliendo `draft:true` da tutti i 5 file lingua. Commit + push automatici. Bypassa il flow lento di Decap (5 PR + editorial workflow).
---

# /publish-article

Pubblica un articolo blog in tutte le 5 lingue (IT/EN/ES/DE/FR) flippando `draft: true` → `draft: false` sui 5 file markdown corrispondenti, poi commit + push. Cloudflare Pages ribuilda automaticamente → articoli live in 1-2 min.

**Filosofia**: bypass completo di Decap. Da 15-20 click distribuiti su editorial workflow + 5 PR a 1 comando da terminale.

## Argomento

- **Senza argomento**: il comando auto-rileva i draft pendenti e ti propone quale pubblicare
- **Con argomento**: usa quello slug specifico (es. `/publish-article adhd-dsm-5-criteria`)

## Esegui questi step

### 1. Determina lo slug

**Se l'utente HA passato un argomento**:
- Memorizza lo slug ricevuto. Validalo: deve matchare `^[a-z0-9-]+$`. Vai allo step 2.

**Se l'utente NON ha passato un argomento**:
- Scansiona ricorsivamente `src/content/blog/{it,en,es,de,fr}/*.md`
- Per ogni file leggi il frontmatter e identifica quelli con `draft: true`
- Estrai lo slug dal nome file (rimuovi `.md` e prefisso locale)
- Raggruppa per slug univoco
- Casi:
  - **0 slug in draft**: ferma e segnala "Nessun articolo in draft. Niente da pubblicare."
  - **1 slug univoco**: usalo direttamente, salta lo step di prompt e vai a step 2 con quello
  - **2+ slug univoci**: elenca all'utente i candidati con count di lingue per slug:
    ```
    Trovati 2 articoli in draft:
    - adhd-dsm-5-criteria (5 lingue)
    - adhd-procrastination-real-mechanism (3 lingue)
    Quale pubblichi?
    ```
    Aspetta che l'utente risponda con uno degli slug. Se ambiguo, richiedi.

### 2. Localizza e ispeziona i 5 file

Per ogni `<locale>` in `[it, en, es, de, fr]`, costruisci il path `src/content/blog/<locale>/<slug>.md` e controlla:
- Esiste? (sì / no)
- Se sì: leggi il frontmatter e identifica il valore corrente di `draft:` (true / false / mancante = trattalo come false)

Costruisci queste tre liste:
- **toPublish**: file esistenti con `draft: true` (sono i candidati al flip)
- **alreadyPublished**: file esistenti con `draft: false` o senza `draft:` (no-op, riporta solo)
- **missing**: file che non esistono (avvisa, possibile typo dello slug)

### 3. Decisione preliminare

- Se `toPublish.length === 0`:
  - Se `alreadyPublished.length === 5`: ferma e segnala "Tutti i 5 file sono già pubblicati. Niente da fare."
  - Se `missing.length === 5`: ferma e segnala "Nessun file trovato per slug `<slug>`. Forse typo? Slug attesi sono nel formato ASCII kebab-case (es. `adhd-dsm-5-criteria`)."
  - Mix dei due: ferma e segnala lo stato

### 4. Mostra summary all'utente e chiedi conferma

Stampa una riga per lingua:
```
[it] ✓ draft → published    (src/content/blog/it/<slug>.md)
[en] ✓ draft → published    (src/content/blog/en/<slug>.md)
[es] · già published         (skip)
[de] ✓ draft → published    (src/content/blog/de/<slug>.md)
[fr] ✗ file mancante         (skip)
```

Poi: `Pubblicare M articoli in K lingue? (sì/no)` dove M = `toPublish.length`, K = `toPublish.length`.

Aspetta risposta utente. Se "no" o cancellazione: ferma SENZA modifiche.

### 5. Flippa il draft

Per ogni file in `toPublish`:
- Apri il file
- Trova la riga `draft: true` (deve essere boolean YAML literal, non stringa)
- Sostituisci con `draft: false`
- Non toccare altri campi del frontmatter (NON aggiornare `pubDate`, NON aggiornare `updatedDate`)

### 6. Commit + push

```bash
git -C D:/dopahop/site add <list of toPublish file paths>
git -C D:/dopahop/site commit -m "publish(blog): <slug> (<M> langs)" -m "Co-Authored-By: Claude <noreply@anthropic.com>"
git -C D:/dopahop/site push
```

Se `git push` fallisce (es. credenziali, conflitti): NON ritentare auto. Riporta l'errore esatto e ferma.

### 7. Riporta all'utente

Stampa:
- Conferma del commit (hash + messaggio)
- Lista degli M articoli ora pubblicati con URL preview:
  - IT: `https://dopahop-site.pages.dev/blog/<slug>/`
  - EN: `https://dopahop-site.pages.dev/en/blog/<slug>/`
  - ES: `https://dopahop-site.pages.dev/es/blog/<slug>/`
  - DE: `https://dopahop-site.pages.dev/de/blog/<slug>/`
  - FR: `https://dopahop-site.pages.dev/fr/blog/<slug>/`
  - (Mostra solo le lingue che hai effettivamente pubblicato)
- Reminder: "Cloudflare Pages sta ribuldando, articoli live in 1-2 min."

## Errori comuni da gestire

- **Nessun draft trovato** (nessun argomento + nessun file con `draft: true`) → ferma "Niente da pubblicare"
- **Slug invalido** (caratteri strani, accenti) → ferma con esempio del formato corretto
- **Tutti i file mancanti** → typo nello slug, suggerisci `ls src/content/blog/it/` per vedere gli slug disponibili
- **Tutti già pubblicati** → no-op, riporta lo stato
- **Frontmatter senza `draft:`** → trattalo come `draft: false` (default Zod schema), considera già pubblicato
- **Mix di `draft: true` con anche `draft: false` su qualche lingua** → procedi solo sui draft true, riporta lo stato finale
- **`git push` fallisce** → riporta errore esatto, NON ritentare

## Tempo atteso

~5-10 secondi totali (read + 5 edits + git add/commit/push).

## Nota strutturale

Questo comando complementa `/write-article`. Pipeline tipica:

1. `/write-article` (o `/write-article "topic specifico"`) → genera 5 articoli draft, commit `draft(blog): ...`
2. Editi IT (e EN se vuoi) liberamente, salva
3. `/publish-article <slug>` → flippa tutti i 5 a published, commit `publish(blog): ...`, Cloudflare ribuilda

Tempo totale per articolo in 5 lingue: ~10-40 min (inclusi i 5-30 min di edit IT).
