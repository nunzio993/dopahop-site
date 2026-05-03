# Workflow blog DopaHop — passi settimanali

Pipeline operativa per produrre 1 articolo IT + 4 traduzioni in 5-35 min.

---

## Setup iniziale (una volta)

Già fatto — questi sono i file di riferimento nel repo:
- `BLOG_TOPICS.md` — coda topic (290+ topic pre-caricati)
- `BRAND_VOICE.md` — regole copy DopaHop
- `BLOG_SEO_TEMPLATE.md` — struttura SEO articolo
- `.claude/commands/draft-article.md` — comando per generare bozza IT
- `.claude/commands/translate-article.md` — comando per generare 4 traduzioni

Per usare i Claude Projects (workflow alternativo, vedi sezione 5):
- Vai su https://claude.ai/projects → New Project
- Nome: "DopaHop Blog"
- Project Knowledge: carica `BRAND_VOICE.md` + `BLOG_SEO_TEMPLATE.md` + `BLOG_TOPICS.md`
- (Opzionale) System instructions: "Sei il sub-agent IT madrelingua di DopaHop. Usa BRAND_VOICE.md per voice e BLOG_SEO_TEMPLATE.md per struttura. Quando ti chiedo un articolo, prendi un topic da BLOG_TOPICS.md e scrivi la bozza IT con frontmatter completo."

---

## Workflow settimanale (consigliato)

### Step 1 — Genera bozza IT (~2 min automatici)

Apri Claude Code in `D:\dopahop\site\`, lancia:

```
/draft-article
```

Cosa succede automaticamente:
1. Legge il primo topic in `BLOG_TOPICS.md`
2. Spawna sub-agent IT madrelingua con `BRAND_VOICE.md` + `BLOG_SEO_TEMPLATE.md` come context
3. Genera bozza IT completa (frontmatter + body Markdown)
4. Salva in `src/content/blog/it/<slug>.md` con `draft: true`
5. Rimuove il topic da `BLOG_TOPICS.md`
6. Commit automatico di entrambi i cambi
7. Ti dice il path del file da editare

Variante con topic specifico (salta la coda):
```
/draft-article ADHD e procrastinazione: meccanismo reale
```

### Step 2 — Edit della bozza IT (5-30 min tuoi)

Apri il file `src/content/blog/it/<slug>.md` in IDE o nel pannello Decap CMS.

**Editing necessario** (sempre):
- Verifica accuratezza fattuale (l'AI può sparare cazzate)
- Aggiungi 1-2 esempi concreti dalla tua esperienza o utenti DopaHop
- Verifica che ci sia almeno 1 link a un modulo DopaHop
- Se topic clinico: verifica le fonti citate, aggiungi disclaimer in fondo
- Lettura ad alta voce: aggiusta frasi che suonano "tradotte"

**Editing opzionale** (consigliato):
- Cambia titolo se non ti convince
- Riscrivi l'intro (è il pezzo che ranka di più, vale tempo extra)
- Aggiungi sezione FAQ a fine articolo se applicable

### Step 3 — Promuovi a published

Cambia nel frontmatter del file:
```yaml
draft: true  →  draft: false
```

Salva.

### Step 4 — Genera le 4 traduzioni (~3 min automatici)

In Claude Code:

```
/translate-article <slug>
```

Esempio:
```
/translate-article adhd-procrastinazione-meccanismo-reale
```

Cosa succede:
1. Legge `src/content/blog/it/<slug>.md`
2. Spawna 4 sub-agent madrelingua in parallelo (EN/ES/DE/FR), ognuno con `BRAND_VOICE.md` come context + glossario ADHD localizzato
3. Genera 4 traduzioni con frontmatter localizzato (title/description/excerpt tradotti, slug uguale, `translationKey` uguale, `draft: false`)
4. Salva i 4 file in `src/content/blog/{en,es,de,fr}/<slug>.md`
5. Commit automatico di tutti i 5 file (IT + 4 traduzioni)
6. Push automatico al repo GitHub
7. Cloudflare Pages ribuilda automaticamente in 1-2 min

### Step 5 — Verifica live (opzionale)

Dopo 1-2 min controlla:
- https://dopahop-site.pages.dev/blog/<slug>/ (IT)
- https://dopahop-site.pages.dev/en/blog/<slug>/ (EN)
- (idem per /es/, /de/, /fr/)

Se qualcosa non rende (404, layout rotto), apri issue / fixa lì.

---

## Tempo totale per articolo

| Step | Tempo |
|---|---|
| 1. /draft-article | ~2 min (automatico, aspetti) |
| 2. Edit IT | 5-30 min (tu) |
| 3. draft → false | 5 sec |
| 4. /translate-article | ~3 min (automatico, aspetti) |
| 5. Verifica live | 1-2 min |
| **Totale** | **~12-37 min per articolo in 5 lingue** |

A 1-2 articoli/settimana → 4-8 articoli/mese → 20-40 pagine/mese (5 lingue ciascuno).

In un anno con la coda attuale (290 topic): saremo a circa 100 articoli scritti, con ancora 190+ topic in coda.

---

## Workflow alternativo (Claude Projects, no Claude Code)

Se non vuoi aprire Claude Code ogni volta, puoi usare **claude.ai Projects** per il passo 1:

1. Apri il Project DopaHop Blog su claude.ai
2. New chat → "Genera articolo su [topic dalla lista]"
3. Claude usa la project knowledge per generare la bozza
4. Copi l'output (frontmatter + body) e crei manualmente il file `.md`
5. Per il passo 4 (traduzioni), apri Claude Code e lancia `/translate-article <slug>` — quello richiede sempre Claude Code per i sub-agent paralleli

Trade-off:
- **Claude Code only** (`/draft-article` + `/translate-article`): tutto automatico, commit incluso, ma serve terminale aperto
- **Hybrid Project + Claude Code**: scrittura più "conversazionale" ma copia/paste manuale

---

## Pubblicazione bozze direttamente da Decap CMS

In alternativa al flusso Markdown editing:
1. Apri https://dopahop-site.pages.dev/admin/
2. Login GitHub
3. Vai a Blog → l'articolo che hai generato con `/draft-article` ha già `draft: true`
4. Edita visualmente (Decap mostra preview live)
5. Quando pronto, sblocca `draft → false` e salva
6. Decap committa automaticamente — Cloudflare ribuilda

NB: Decap NON spawna sub-agent. Per le traduzioni torna in Claude Code.

---

## Troubleshooting

### "/draft-article" dice "topic queue is empty"

Hai esaurito la coda di `BLOG_TOPICS.md`. Aggiungi nuovi topic o usa la variante con argomento esplicito.

### Le traduzioni hanno errori grammaticali

Improbabile col pattern sub-agent madrelingua, ma se succede:
- Apri il file della lingua incriminata
- Fai una correzione manuale
- Commit + push

Se è un errore sistematico (es. il sub-agent DE traduce sempre male un termine), aggiorna il glossario in `BRAND_VOICE.md` sezione 9 con la traduzione corretta.

### Il sito non si aggiorna dopo push

Verifica:
1. https://dash.cloudflare.com/?to=/:account/workers-and-pages → Deploys del progetto `dopahop-site`
2. Se il build è failed, leggi il log
3. Se il build è success ma vedi vecchio contenuto: hard refresh (Ctrl+Shift+R)

### Voglio cambiare il tono di un articolo già pubblicato

Apri il file in `src/content/blog/<locale>/<slug>.md`, edita, commit. Astro ribuilda. La pagina si aggiorna in 1-2 min.

Per cambiare tutte e 5 le lingue di un articolo: edita IT + lancia di nuovo `/translate-article <slug>`. Sovrascriverà le 4 traduzioni con la nuova versione.

---

## File di riferimento

- `BLOG_TOPICS.md` → coda topic (consumata da `/draft-article`)
- `BRAND_VOICE.md` → regole voice (input dei sub-agent IT + traduttori)
- `BLOG_SEO_TEMPLATE.md` → struttura SEO (input del sub-agent IT)
- `.claude/commands/draft-article.md` → slash command bozza IT
- `.claude/commands/translate-article.md` → slash command 4 traduzioni
- `src/content/blog/it/*.md` → articoli IT
- `src/content/blog/{en,es,de,fr}/*.md` → traduzioni
- `src/content/config.ts` → schema frontmatter (NON modificare)
