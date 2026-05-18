---
description: Triage SEO della coda BLOG_TOPICS.md. 5 sub-agent madrelingua paralleli fanno SERP analysis nel proprio locale, scorano ogni topic 0-100. Output: 5 ranking per locale + master queue riordinata per priorità aggregata. Zero costo $, ~30-90 min wall-clock.
---

# /seo-triage

Strategic Tier 1 SEO triage. Analizza l'intera coda `BLOG_TOPICS.md` con SERP veri per i 5 locali, ri-ordina i topic per chance reali di ranking. Comando one-shot, NON integrato in auto-blog.

## Filosofia

- **Decoupling per locale**: ogni mercato (IT/EN/ES/DE/FR) ha la sua classifica indipendente, ottimizzata sulla SERP locale
- **Niente skip threshold**: ogni topic viene scritto comunque in tutte le 5 lingue (long-tail inatteso, topical authority, aging signal, hreflang cluster completo)
- **Solo priority queue globale**: il triage decide quale topic scrivere PROSSIMO, non quale locale escludere
- **Zero budget**: usa solo WebSearch via sub-agent, niente API a pagamento
- **Token isolation**: i sub-agent consumano token nel loro context, il main riceve solo report sintetici

## Argomenti

- **count** (opzionale, default: tutti): processa solo le prime N entry della coda. Utile per test su batch piccolo.
- **--dry-run** (opzionale, flag): produce i 6 file output ma NON sovrascrive `BLOG_TOPICS.md`. Default: swap con backup `.bak`.

Esempi:
- `/seo-triage` → processa tutti i ~246 topic, swap `BLOG_TOPICS.md`
- `/seo-triage 30` → test su prime 30, swap
- `/seo-triage --dry-run` → tutti, NON swap (review manuale dei file output)
- `/seo-triage 30 --dry-run` → test su 30, NON swap

## Pipeline (alto livello)

```
Step 1: Parse BLOG_TOPICS.md → N topic
Step 2: Spawna 5 sub-agent Explore in parallelo (1 per locale)
   Ogni sub-agent: per ogni topic → 1 WebSearch nella sua lingua → score 0-100
   Output: tabella ranked + 1-line gap per topic
Step 3: Aggrega 5 mini-report → tabella master
Step 4: Calcola priority globale (MAX score across 5 locali per topic)
Step 5: Scrivi 6 file output:
   - BLOG_TOPICS_IT.md  (ranked per IT)
   - BLOG_TOPICS_EN.md  (ranked per EN)
   - BLOG_TOPICS_ES.md  (ranked per ES)
   - BLOG_TOPICS_DE.md  (ranked per DE)
   - BLOG_TOPICS_FR.md  (ranked per FR)
   - BLOG_TOPICS_TRIAGED.md  (master priority queue aggregata)
Step 6: Swap BLOG_TOPICS.md (se non --dry-run): backup .bak + sostituisci con BLOG_TOPICS_TRIAGED.md content
Step 7: Commit + push
Step 8: Report finale all'utente
```

## Esegui questi step

### Step 0. Parse argomenti

- Parse `count` (intero ≥ 1) e flag `--dry-run`
- Se assenti: `count = ∞` (tutti), `dryRun = false`
- Validate: `count` se presente deve essere ≥ 1

### Step 1. Carica topic dalla coda

- Leggi `C:/progetti/apps/dopahop-site/BLOG_TOPICS.md`
- Estrai TUTTE le righe che iniziano con `- ` (escludi commenti, header, separator `---`, linee vuote)
- Se `count` specificato: prendi prime `count`, altrimenti tutte
- Numera 1..N per riferimento. Conserva l'ordine originale come fallback ID.
- Se N = 0: ferma e segnala "Coda vuota — niente da triagare"

### Step 2. Spawna 5 sub-agent Explore in parallelo

Lancia 5 sub-agent **nella stessa response** (parallel tool calls). Ogni sub-agent riceve:
- La lista numerata completa di N topic (in italiano, formato originale)
- Il proprio locale assegnato
- Il brief sotto

**Brief per ogni sub-agent (sostituisci `<LOCALE>`, `<LANG_NAME>`, `<TLD>`, `<TOPICS_LIST>`):**

```
Sei un SEO analyst madrelingua <LANG_NAME> per il mercato <LOCALE>.

Task: per ognuno dei N topic ADHD-focused qui sotto, fai SERP analysis su google.<TLD>
nella TUA lingua nativa, e produci uno score 0-100 + 1 linea di gap competitivo.

Lista topic (in italiano — TRADUCI in <LANG_NAME> per la query, ma mantieni il numero ID):

<TOPICS_LIST>

Per ogni topic, esegui questa procedura:

1. Estrai 1-2 head keyword in <LANG_NAME>. Esempi pattern:
   - "ADHD e GTD: cosa non funziona" → IT: "ADHD GTD", EN: "ADHD GTD", DE: "ADHS GTD", ES: "TDAH GTD", FR: "TDAH GTD"
   - "ADHD e procrastinazione" → IT: "ADHD procrastinazione", EN: "ADHD procrastination", DE: "ADHS Prokrastination", ES: "TDAH procrastinacion", FR: "TDAH procrastination"
   - Usa l'acronimo locale corretto: IT/EN=ADHD, DE=ADHS, ES/FR=TDAH

2. 1 WebSearch con query nella tua lingua. Hint: aggiungi locale operator se la query è ambigua
   (es. `"ADHS GTD" site:de` per forzare risultati tedeschi). Default: query naturale madrelingua.

3. Analizza top-10 risultati. Valuta:
   - **Feasibility 0-50** (quanto è "vincibile"):
     * 0-15: top-10 dominato da siti tier-1 (Wikipedia, Mayo Clinic, NHS, equivalenti locali) o
       associazioni nazionali ADHD ufficiali. Difficile rankare.
     * 15-35: misto, presenza di blog tematici medi (DA 30-50), forum, articoli divulgativi non-autorevoli.
     * 35-50: top-10 debole. Reddit, Quora, blog personali, contenuti vecchi, snippet incompleti.
       Spazio per articolo serio.

   - **Strategic-fit 0-50** (quanto on-brand DopaHop ADHD app):
     * 0-15: top-10 NON parla del taglio specifico ADHD-focused. Topic genericissimo,
       ranking richiederebbe ottica diversa dal nostro brand.
     * 15-35: top-10 cita ADHD ma marginalmente, taglio diverso dal nostro (clinico/diagnostico
       puro vs il nostro "meccanismi cognitivi + soluzioni pratiche").
     * 35-50: top-10 ha il taglio compatibile con DopaHop. Possiamo competere con voce
       autentica e angolo originale.

   - **Total score = feasibility + strategic-fit** (0-100)

4. Identifica gap competitivo (1 linea max):
   - Cosa manca nel top-10? (es. "manca approccio neuroscientifico", "tutti generici no
     personal experience", "no FAQ rispondono a query reali")
   - Quale angolo userebbe il sub-agent madrelingua quando scriverà l'articolo?

5. Output ESCLUSIVAMENTE in questo formato (tabella markdown):

   ## Triage report <LOCALE> — N topic

   | # | Topic (originale IT) | Query usata (<LANG_NAME>) | Score | Gap (1 linea) |
   |---|----------------------|---------------------------|-------|---------------|
   | 1 | ADHD e GTD: cosa non funziona | ADHS GTD warum scheitert | 72 | Top-10 in tedesco solo cliniche, manca approccio "Anpassung an Hyperfokus" |
   | 2 | ... | ... | ... | ... |

Vincoli:
- Max 1 WebSearch per topic (no follow-up search). Budget totale: N WebSearch.
- Output max 100 righe (1 per topic + header). NO long-form analysis, NO sezioni extra.
- NON fare WebFetch di siti specifici, NON aprire PDF, NON analizzare backlink. Solo SERP read.
- NON valutare difficulty assoluta (DA dei competitor): non hai API per questo. Usa il
  pattern dei domini in top-10 come proxy (Wikipedia + cliniche = duro; Reddit + blog = facile).
- Conserva il numero ID del topic così l'orchestrator può ri-ordinare.
- Se WebSearch fallisce su un topic: marca score=null, gap="search fallita", continua.

Tip performance: puoi fare WebSearch in batch parallelo nello stesso response (più tool call
in un singolo turno) per accelerare. Tipico: 5-10 WebSearch in parallelo per turno.

NON cercare conferma da me, NON chiedere chiarimenti, esegui tutto e ritorna il report.
```

**Sostituzioni per locale:**

| Locale | LANG_NAME | TLD |
|--------|-----------|-----|
| IT     | italiano  | it  |
| EN     | inglese   | com |
| ES     | spagnolo  | es  |
| DE     | tedesco   | de  |
| FR     | francese  | fr  |

Aspetta tutti e 5. Se uno fallisce: 1 retry singolo. Se ancora fallisce: marca quel locale come `incomplete` nel report finale e procedi (gli altri 4 locali sono comunque validi).

### Step 3. Aggrega 5 mini-report

L'orchestrator (main context) riceve 5 tabelle. Costruisci una struttura interna:

```
topic[i] = {
  id: <numero originale>,
  text: "<topic IT originale>",
  scores: { IT: 72, EN: 45, ES: 60, DE: 82, FR: 38 },
  gaps:   { IT: "...", EN: "...", ES: "...", DE: "...", FR: "..." }
}
```

### Step 4. Calcola priority globale

Per ogni topic:
- `priority_score = MAX(scores)` — usiamo il massimo cross-locale come segnale primario.
- Rationale: se un topic è top-tier in 1 locale ma medio negli altri, vale comunque la pena scriverlo (verrà rankato bene almeno in quel mercato, gli altri locali aggiungono valore comunque).
- Tie-break: somma totale dei 5 score (preferisce topic forti ovunque a quelli forti in 1 solo locale).

Ordina topic per `(priority_score DESC, sum_scores DESC)`.

### Step 5. Scrivi 6 file output

Per ogni file, mantieni l'header originale di `BLOG_TOPICS.md` (linee 1-7) e poi i topic ranked.

**File `BLOG_TOPICS_<LOCALE>.md` (1 per ogni locale):**

```markdown
# Blog topics queue — DopaHop (ranked per locale <LOCALE>)

Output di `/seo-triage` eseguito <data ISO>. NON modificare manualmente — rigenera con
`/seo-triage` quando aggiungi topic o quando il DA del sito cresce.

Ogni riga: `score | topic originale | gap competitivo locale`.

---

| # | Score | Topic | Gap (<LOCALE>) |
|---|-------|-------|----------------|
| 1 | 82 | ADHD e GTD: cosa non funziona | Top-10 solo cliniche, manca... |
| 2 | 78 | ... | ... |
...
```

**File `BLOG_TOPICS_TRIAGED.md` (master priority queue):**

```markdown
# Blog topics queue — DopaHop (ranked aggregato cross-locale)

Output di `/seo-triage` eseguito <data ISO>. Ranking aggregato: priority = MAX(score) tra
i 5 locali, tie-break per somma totale. Usato da `/auto-blog` come ordine di pick del prossimo topic.

Ogni riga ha 5 score per locale visibili (per scegliere il prossimo topic con intelligenza).

---

- ADHD e GTD: cosa non funziona  [IT:78 EN:42 ES:65 DE:82 FR:71]
- ADHD e procrastinazione: meccanismo  [IT:80 EN:55 ES:60 DE:75 FR:68]
- ...
```

**Importante:** in `BLOG_TOPICS_TRIAGED.md` mantieni il formato `- <topic>` (linea per topic, no tabella) perché questo file diventa il nuovo `BLOG_TOPICS.md` e `/auto-blog` legge quel formato.

### Step 6. Swap BLOG_TOPICS.md (skip se --dry-run)

Se `dryRun = false`:
1. Copia `BLOG_TOPICS.md` → `BLOG_TOPICS.md.bak` (backup)
2. Sovrascrivi `BLOG_TOPICS.md` con il contenuto di `BLOG_TOPICS_TRIAGED.md`
3. `BLOG_TOPICS_TRIAGED.md` resta come "spec" del triage (con score visibili)
4. `BLOG_TOPICS.md` è la queue operativa (consumata da auto-blog)

Se `dryRun = true`:
- Lascia `BLOG_TOPICS.md` invariato
- I 6 file output sono pronti per review umana

### Step 7. Commit + push

```bash
git -C C:/progetti/apps/dopahop-site add \
  BLOG_TOPICS_IT.md \
  BLOG_TOPICS_EN.md \
  BLOG_TOPICS_ES.md \
  BLOG_TOPICS_DE.md \
  BLOG_TOPICS_FR.md \
  BLOG_TOPICS_TRIAGED.md

# se non dry-run, aggiungi anche
git -C C:/progetti/apps/dopahop-site add BLOG_TOPICS.md BLOG_TOPICS.md.bak

git -C C:/progetti/apps/dopahop-site commit -m "seo-triage: ranked N topics across 5 locales (zero-budget WebSearch tier 1)"
git -C C:/progetti/apps/dopahop-site push
```

### Step 8. Report finale all'utente

```
## /seo-triage complete

✅ N topic triaged across 5 locali
⏱ Tempo totale: ~M minuti
📦 Push: <commit_hash>

### Top 10 priority globale (next picks per /auto-blog)

| # | Topic | Max score | Locale leader |
|---|-------|-----------|---------------|
| 1 | ADHD e GTD: ... | 82 | DE |
| 2 | ADHD e procrastinazione | 80 | IT |
| ... |

### Distribuzione score per locale

| Locale | Topic con score ≥ 70 | Score medio | Score mediano |
|--------|----------------------|-------------|---------------|
| IT     | 23                   | 48          | 45            |
| EN     | 8                    | 32          | 30            |
| ES     | 34                   | 55          | 52            |
| DE     | 41                   | 58          | 56            |
| FR     | 28                   | 51          | 49            |

(Conferma intuizione strategia SEO: DE/FR/ES mercati meno saturi, EN più duro.)

### File generati

- BLOG_TOPICS_IT.md
- BLOG_TOPICS_EN.md
- BLOG_TOPICS_ES.md
- BLOG_TOPICS_DE.md
- BLOG_TOPICS_FR.md
- BLOG_TOPICS_TRIAGED.md (master)
- BLOG_TOPICS.md (sovrascritto, backup in BLOG_TOPICS.md.bak)  [se non --dry-run]

### Eventuali skipped/incomplete

[Se qualche locale ha fallito o topic specifici sono andati in errore, lista qui]

### Prossimo step suggerito

`/auto-blog 5` per pubblicare i prossimi 5 topic ad alta priorità (top di
BLOG_TOPICS.md ora riordinata).
```

## Errori comuni da gestire

- **Sub-agent locale fallisce completamente**: 1 retry. Se ancora fail, marca quel locale come incomplete (score=null nel master) e procedi.
- **WebSearch rate limit/down**: il sub-agent dovrebbe già gestirlo con score=null per topic singoli. Non bloccare l'intero triage.
- **Topic count mismatch**: se un sub-agent ritorna meno topic di N, considera mancanti come score=null per quel locale.
- **BLOG_TOPICS.md modificato durante il run**: improbabile ma possibile. Il backup `.bak` salva da rollback manuale.
- **File output già esistenti**: sovrascrivi senza chiedere (sono artifatti rigenerabili).

## Considerazioni costi (Claude Max subscription)

Token stimati:
- 5 sub-agent paralleli, ognuno: ~150-250k token (N WebSearch + scoring + output tabella)
- **Totale**: ~750k-1.25M token, ma DISTRIBUITI nei sub-agent context
- **Main context riceve**: ~50k token totali (5 mini-tabelle aggregate)

Wall-clock:
- 246 topic con WebSearch parallele dentro ogni sub-agent: ~30-60 min realistico
- Worst case (WebSearch lente, retry): ~90 min

Frequenza consigliata: ogni 2-3 mesi quando aggiungi >50 topic nuovi, o quando il DA del sito sale visibilmente (rifare il triage perché alcuni topic prima "impossibili" diventano fattibili).

## Note strutturali

**Quando NON usare /seo-triage**:
- Coda BLOG_TOPICS.md modificata da poco con < 20 topic nuovi: meno valore (l'aggregato resta simile)
- Hai meno di ~30 topic in coda: il rumore della SERP analysis supera il segnale, meglio scegliere a mano

**Convive con**:
- `/auto-blog` → consuma da `BLOG_TOPICS.md` riordinata dal triage
- `/write-article` → continua a leggere prime righe di `BLOG_TOPICS.md`

**Output non in src/content**: i file `BLOG_TOPICS_*.md` stanno alla root del progetto come `BLOG_TOPICS.md`. Non sono parte del sito Astro, sono operational artifacts.

**Idempotenza**: rigirare `/seo-triage` sovrascrive i 6 file output. Il `.bak` resta l'ultima versione pre-triage di `BLOG_TOPICS.md`. Per ripristinare manualmente: `mv BLOG_TOPICS.md.bak BLOG_TOPICS.md`.
