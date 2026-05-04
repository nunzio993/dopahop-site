---
description: Pipeline end-to-end completamente automatica. Genera N articoli (5 lingue ciascuno) da BLOG_TOPICS.md, audit factuale parallelo, revisione fino a 3 round, scheduling staggerato via pubDate, commit + push. Zero touch.
---

# /auto-blog

Pipeline blog full-auto: scrittura → audit → revisione → schedule → push.

Per ogni articolo: 5 sub-agent madrelingua scrivono in parallelo, 5 auditor verificano fatti contro fonti web, fino a 3 round di revisione automatica per ogni claim flaggato. Articoli vengono schedulati a intervalli regolari via il campo `pubDate` (Astro li filtra finché data non è arrivata, GitHub Actions ribuilda Cloudflare ogni giorno).

## Argomenti

- **count** (opzionale, default `1`): quanti articoli generare in batch
- **interval** (opzionale, default `3`): giorni tra una pubDate e la successiva

Esempi:
- `/auto-blog` → 1 articolo con pubDate oggi (publish immediato)
- `/auto-blog 10` → 10 articoli, 1 ogni 3 giorni
- `/auto-blog 30 5` → 30 articoli, 1 ogni 5 giorni (copre 150 giorni)
- `/auto-blog 30 3` → 30 articoli, 1 ogni 3 giorni (copre 90 giorni)

## Pipeline (alto livello)

```
Round 1: 5 Writer madrelingua paralleli         → 5 file
Round 2: 5 Auditor paralleli (WebSearch/Fetch)  → 5 report PASS/WARN/FAIL
Round 3: Revision loop (max 3 round, skip se 0 WARN/FAIL)
   ├─ Per ogni lang con flag non risolti: writer revision
   ├─ Re-audit lingue modificate
   └─ Loop finché 0 flag o cap 3 raggiunto
Round 4: Commit articolo (5 file con pubDate scheduled, draft:false)
[loop sui N articoli]
Round 5: Aggiorna BLOG_TOPICS.md (rimuovi N topic consumati) + commit
Round 6: Push singolo a fine batch
```

## Esegui questi step

### 0. Parse argomenti + calcola startDate

- Parse: `count` (default 1), `interval` (default 3). Validate `count ≥ 1`, `interval ≥ 1`.
- Trova la **pubDate massima** tra tutti i file in `src/content/blog/*/*.md` (parse frontmatter YAML, leggi `pubDate`).
- Se `latestPubDate >= oggi`: `startDate = latestPubDate + interval giorni`
- Altrimenti: `startDate = oggi`
- Costruisci array `pubDates = [startDate, startDate + interval, ..., startDate + (count-1)*interval]`
- Tutte le date in formato ISO `YYYY-MM-DD`

### 1. Carica topic dalla coda

- Leggi `BLOG_TOPICS.md`
- Estrai le prime `count` righe che iniziano con `- ` (escludi commenti e linee vuote)
- Se disponibili `< count`: ferma e segnala "Solo M topic in coda, batch ridotto a M" — chiedi se procedere con M
- Per ogni topic, calcola lo slug (ASCII, kebab-case, max 6-7 parole, in inglese; vedi esempi in `.claude/commands/write-article.md` Step 2)

### 2. Verifica conflitti slug

Per ogni slug, controlla `src/content/blog/{it,en,es,de,fr}/<slug>.md` non esista già. Se conflitto: chiedi utente skip / abort.

### 3. Pipeline per articolo (loop sequenziale)

Per ogni `(topic[i], slug[i], pubDate[i])` in ordine:

#### 3a. Round 1 — Writer madrelingua (5 paralleli)

Spawna 5 sub-agent in parallelo come da `.claude/commands/write-article.md` Step 4-5 (LOCAL_GUIDANCE per locale, sostituisci `[TOPIC]`, `[PATH_OUT]`, ecc.).

**Differenze rispetto a `/write-article`**:
- `pubDate: <pubDate[i] ISO>` invece di oggi
- `updatedDate: <pubDate[i] ISO>` (uguale)
- `draft: false` invece di true (articolo nasce pronto, schedulato via pubDate)
- L'agent NON fa internal-linking inter-blog (invariato), ma deve sapere che l'articolo è "scheduled future"

Aspetta tutti e 5.

#### 3b. Validation iniziale

Per ogni file generato verifica:
- Frontmatter YAML valido
- `locale` corretto, `translationKey` uguale tra tutti, `pubDate` corrispondente
- Title 30-65 char, description 130-170 char
- Body word count ≥ 1.000
- ≥ 4 H2
- ≥ 1 internal link (modulo o blog inter-link)

Se fail: 1 retry singolo sui sub-agent falliti. Se ancora fail dopo retry: skip questo articolo (NON committare), continua col prossimo, registra nel report finale.

#### 3c. Round 2 — Auditor (5 paralleli)

Spawna 5 audit sub-agent in parallelo, uno per file, con questo brief:

```
Sei un Auditor INDIPENDENTE per `<file_path>`.

Task:
1. Leggi il file completo (frontmatter + body)
2. Estrai max 12-15 claim factuali verificabili:
   - Numeri/percentuali (prevalenza, statistiche, dosaggi)
   - Nomi organizzazioni/enti + URL
   - Citazioni manuali (DSM-5, ICD-11)
   - Riferimenti leggi/linee-guida
   - Descrizioni processo sanitario
3. Per ogni claim:
   - URL → WebFetch
   - Numero/percentuale → 1-2 WebSearch su fonti autoritative
   - Citazione manuale → WebSearch verifica
   - Processo sanitario → WebSearch verifica attualità
4. Assegna PASS / WARN / FAIL + cita fonte ESATTA usata
5. NON modificare il file. Solo report strutturato.

Output:
## Audit report — <slug> (<locale>)
Total: N | PASS: X | WARN: Y | FAIL: Z

### Claim 1
- Claim: "..."
- Status: PASS/WARN/FAIL
- Source checked: <URL/query>
- Finding: <2-3 righe>
- Suggested fix (solo WARN/FAIL): <testo nuovo o "Verifica manualmente">

Vincoli: max 15 WebSearch per agent. 0 flag stilistici (solo factuali). Cita fonte sempre.
```

Aspetta tutti e 5. Aggrega 5 report.

#### 3d. Round 3 — Revision multi-round (skip se tutto PASS)

```
revisionRound = 0
unresolvedFlags = aggregate WARN/FAIL across all 5 langs (skip questo step se zero)

while unresolvedFlags > 0 AND revisionRound < 3:
   revisionRound++
   for each locale con flag non risolti:
      spawn writer revision sub-agent con prompt:
         "Auditor ha flaggato N claim nel tuo articolo. Per ognuno decidi:
          
          A. DIFENDI: cita fonte specifica autoritativa che supporta il claim originale,
             spiega perché auditor sbaglia.
          B. REVISIONA: applica Edit al file con il fix suggerito (o tua versione migliore).
          
          [Lista flag con: claim originale, source auditor, finding, suggested fix]
          
          Output: per ogni flag: DECISIONE (A o B) + motivazione + (se B) testo nuovo applicato.
          Se DIFENDI senza fonte concreta → considera revisione obbligatoria."
      
      L'agent applica le revisioni con Edit. Restituisce report di decisioni.
   
   Re-audit SOLO le lingue modificate in questo round (spawn audit agent solo per quelle).
   Update unresolvedFlags: solo i nuovi WARN/FAIL del re-audit + i DIFENDI senza fonte solida.

if revisionRound == 3 AND unresolvedFlags > 0:
   Marca questo articolo come "needs human review" nel report finale, ma NON bloccare commit.
```

#### 3e. Round 4 — Commit articolo

```bash
git -C D:/dopahop/site add \
  src/content/blog/it/<slug>.md \
  src/content/blog/en/<slug>.md \
  src/content/blog/es/<slug>.md \
  src/content/blog/de/<slug>.md \
  src/content/blog/fr/<slug>.md
git -C D:/dopahop/site commit -m "auto-blog: <slug> (5 langs, scheduled <pubDate ISO>)"
```

NON push qui. Push alla fine.

### 4. Aggiorna BLOG_TOPICS.md

- Rimuovi le `count` righe topic consumate dalla coda (mantieni intestazione e separatori)
- Commit:

```bash
git -C D:/dopahop/site add BLOG_TOPICS.md
git -C D:/dopahop/site commit -m "chore(blog): consume <count> topics from queue"
```

### 5. Push singolo

```bash
git -C D:/dopahop/site push
```

Cloudflare ribuilda. Solo gli articoli con `pubDate <= oggi` sono visibili (filtro Astro). Gli altri restano "in attesa": il cron `daily-rebuild.yml` ribuilda ogni giorno alle 06:00 UTC, articoli appaiono mano a mano che la loro pubDate arriva.

### 6. Report finale all'utente

```
## Auto-blog batch complete

✅ N articoli generati, scheduled da <startDate> a <endDate>
⏱ Tempo totale: ~M minuti
📦 Push: <commit_hash_range>

| # | Slug | pubDate | Audit (P/W/F) | Revisions | Status |
|---|------|---------|---------------|-----------|--------|
| 1 | adhd-... | 2026-05-04 | 11/0/0 | 0 | OK |
| 2 | adhd-... | 2026-05-07 | 10/1/0 | 1 | OK (1 fix applied) |
| 3 | adhd-... | 2026-05-10 | 8/2/1 | 3 | ⚠ REVIEW |
| ... |

⚠ Articoli con flag non risolti dopo 3 round (review umano consigliato):
- #3 adhd-xxx (IT): "Y% prevalenza secondo X" — auditor non ha confermato fonte, writer ha difeso ma senza citation. Suggerito: rileggi sezione "diagnostico".

📅 Articoli live ora: <quanti hanno pubDate <= oggi>
📅 Articoli in attesa: <quanti pubDate futura>
📋 Topic rimanenti in coda: K
🔜 Prossimo articolo schedulato: <pubDate>

URLs di esempio (live a pubDate raggiunta):
- IT: https://dopahop-site.pages.dev/blog/<slug>/
- EN: https://dopahop-site.pages.dev/en/blog/<slug>/
- ...
```

## Errori comuni da gestire

- **Coda topic vuota o < count**: chiedi se procedere con quanti disponibili o abortire
- **Conflitto slug**: chiedi skip/abort; suggerisci slug alternativi se utente vuole continuare
- **Validation iniziale fail dopo retry**: skip quell'articolo, continua col prossimo, registra nel report
- **Audit timeout su una lingua**: marca "audit incomplete" per quella lingua, prosegui senza revision per quella, registra
- **Writer revision auto-Edit fail**: keep original, flag come "revision attempted but failed", continua
- **git push fail**: NON ritentare auto. Riporta errore. Articoli committati localmente ma non live finché user fa push manuale.
- **Token limit Claude Max raggiunto**: l'errore arriva dal sub-agent, fai fail-soft → committa quanto fatto finora + report parziale

## Considerazioni costi (Claude Max subscription)

Token reali misurati per articolo:
- Round 1 (5 writer paralleli): ~340k token
- Round 2 (5 auditor): ~310k token
- Round 3 (revisioni, variabile): ~50-200k (skip se 0 flag)
- **Totale per articolo: ~700-850k token** (alto se molte revisioni)

Stima batch:
- 10 articoli ≈ 7-8.5M token
- 30 articoli ≈ 21-25M token

Su Claude Max il limite è mensile della subscription. Distribuisci batch nel tempo o spezza in più sessioni se serve.

## Tempo wall-clock atteso

Per articolo: ~10-15 minuti (sub-agent paralleli + audit web + eventuali revisioni)
Per batch:
- 10 articoli: ~1.5-2.5 ore
- 30 articoli: ~5-7.5 ore

Lanciato di sera o weekend = nessun overhead percepito.

## Note strutturali

**Convive con i comandi esistenti**:
- `/write-article` → drafts (per editing IT manuale prima di publish)
- `/publish-article` → flippa draft → published su articoli specifici
- `/auto-blog` → end-to-end senza intervento umano

Tutti e tre usano lo stesso underlying mechanism (file `.md` + frontmatter + git). Sono strategie d'uso diverse, non sistemi separati.

**Filtro Astro `pubDate <= new Date()`**: garantisce che articoli con data futura non siano visibili sul sito pubblico. Il GitHub Action `daily-rebuild.yml` triggera Cloudflare Pages ogni giorno alle 06:00 UTC così articoli con pubDate "diventata passata" entrano nel build successivo.

**Decap admin scheduling**: una volta in piedi questo sistema, settare manualmente una `pubDate` futura in Decap admin equivale a schedulare. È una via alternativa per pubblicare articoli singoli con calendario custom (es. articolo speciale per una data specifica).
