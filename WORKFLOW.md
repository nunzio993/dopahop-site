# Workflow blog DopaHop — passi settimanali

Pipeline operativa per produrre articoli in 5 lingue native (IT/EN/ES/DE/FR).

**Tre livelli di automazione, scegli a seconda di quanto controllo umano vuoi:**

| Comando | Cosa fa | Quando usarlo |
|---|---|---|
| `/auto-blog [N] [days]` | End-to-end: scrive, audita, revisiona, scheduledi pubblica N articoli a intervalli | Massimo throughput, batch grandi (10-30), zero touch |
| `/write-article` + `/publish-article` | Scrive 5 draft → editi IT → pubblichi | Vuoi controllo umano sull'IT prima di publish |
| Decap admin (browser) | Stessi file, UI grafica | Mobile/tablet senza terminale |

Il setup sotto descrive il flow `/write-article` + `/publish-article` (manuale-friendly). Per il flow full-auto vedi `.claude/commands/auto-blog.md`.

---

## Filosofia

**Niente "scrivi IT poi traduci"**. Cinque articoli "fratelli" scritti da 5 sub-agent madrelingua paralleli, ognuno **autonomo nel proprio paese**: cita risorse, enti, sistema sanitario, leggi, numeri emergenza, acronimi DEL PROPRIO paese, non quelli italiani.

Condividono solo:
- Topic (es. "ADHD: criteri DSM-5")
- Brand voice DopaHop
- Struttura macro (intro / definizione / sottotipi / miti / cosa fare / FAQ / disclaimer)
- Slug (in inglese, universale per multi-lingua)
- `translationKey` (uguale tra le 5 lingue, abilita hreflang reciproci)

Non condividono: fonti, esempi, riferimenti culturali, percorsi sanitari, numeri emergenza.

---

## Setup iniziale (già fatto)

File di riferimento nel repo:
- `BLOG_TOPICS.md` — coda topic (~290 topic ADHD pre-caricati)
- `BRAND_VOICE.md` — regole copy DopaHop + ground truth feature app
- `BLOG_SEO_TEMPLATE.md` — struttura SEO articolo + benchmark Inflow
- `.claude/commands/write-article.md` — slash command che genera 5 articoli paralleli
- `.claude/commands/publish-article.md` — slash command che flippa draft → published
- `.claude/commands/auto-blog.md` — slash command full-auto end-to-end (scrittura + audit + publish + scheduling)
- `.github/workflows/daily-rebuild.yml` — cron giornaliero che ribuilda Cloudflare per articoli scheduled

---

## Workflow settimanale

### Step 1 — Genera 5 articoli paralleli (~3 min automatici)

Apri Claude Code in `D:\dopahop\site\`, lancia:

```
/write-article
```

(Senza argomenti = prende il primo topic dalla coda. Con argomento = topic specifico, non tocca la coda.)

Cosa succede automaticamente:
1. Determina topic (queue o esplicito)
2. Calcola slug in inglese universale (es. `adhd-dsm-5-criteria`)
3. Spawna **5 sub-agent madrelingua paralleli** (IT, EN, ES, DE, FR)
4. Ciascuno legge `BRAND_VOICE.md` + `BLOG_SEO_TEMPLATE.md` come context
5. Ciascuno scrive un articolo NATIVO nel proprio paese (1.200-2.500 parole, 4-6 H2, frontmatter completo, `draft: true`)
6. Validation: tutti i 5 file controllati per frontmatter / lunghezza / H2 / link interni
7. Topic rimosso dalla coda (se preso da queue)
8. Commit + push automatico
9. Cloudflare Pages ribuilda → 5 pagine live in 1-2 min

### Step 2 — Edit IT (e EN spot-check se vuoi) (5-30 min tuoi)

Apri il file `src/content/blog/it/<slug>.md` in IDE o nel pannello Decap CMS.

Il file IT è in `draft: true`. Edita liberamente:
- Verifica accuratezza fattuale
- Aggiungi 1-2 esempi concreti dalla tua esperienza o utenti DopaHop reali
- Verifica che il tono sia "amico ADHD a amico ADHD", non clinico-paternalistico
- Lettura ad alta voce: aggiusta frasi che suonano "tradotte" o asciutte

Se padroneggi anche EN, fai uno spot-check del file `src/content/blog/en/<slug>.md`.

**ES/DE/FR**: ti fidi del sub-agent madrelingua. Non puoi editarli (non parli quelle lingue) e va bene così. Se in futuro un madrelingua ti scrive "frase X è strana", correggi puntualmente.

### Step 3 — Pubblica i 5 articoli (~5 sec automatici)

```
/publish-article
```

Senza argomento, auto-rileva i draft. Se ce n'è solo uno in coda, lo usa direttamente. Se più di uno, ti chiede quale.

In alternativa, slug esplicito:
```
/publish-article adhd-dsm-5-criteria
```

Cosa succede automaticamente:
1. Lo slash command trova i 5 file `src/content/blog/{it,en,es,de,fr}/<slug>.md`
2. Per ogni file con `draft: true`, flippa a `draft: false`
3. Mostra summary + chiede conferma
4. Commit `publish(blog): <slug> (5 langs)`
5. `git push` automatico

Cloudflare ribuilda. In 1-2 min sono tutti live.

**Alternativa lenta** (se sei senza terminale, da mobile/tablet): apri https://dopahop-site.pages.dev/admin/, login GitHub, naviga ai 5 articoli draft, flippa "Pubblica" su ognuno e mergia le PR. ~15-20 click.

### Step 5 — Verifica (opzionale)

Dopo 1-2 min controlla:
- https://dopahop-site.pages.dev/blog/<slug>/ (IT)
- https://dopahop-site.pages.dev/en/blog/<slug>/ (EN)
- https://dopahop-site.pages.dev/es/blog/<slug>/ (ES)
- https://dopahop-site.pages.dev/de/blog/<slug>/ (DE)
- https://dopahop-site.pages.dev/fr/blog/<slug>/ (FR)

Se uno non rende (404, layout rotto), apri l'issue e fix.

---

## Tempo totale per articolo

| Step | Tempo |
|---|---|
| 1. /write-article (5 sub-agent paralleli) | ~3 min (automatico) |
| 2. Edit IT (+ EN spot-check) | 5-30 min |
| 3. /publish-article (commit + push) | ~5 sec (automatico) |
| 4. Verifica live (Cloudflare ribuilda) | 1-2 min |
| **Totale** | **~10-40 min per articolo in 5 lingue** |

A 1-2 articoli/settimana → 4-8 articoli/mese → **20-40 pagine/mese** in 5 lingue.

Coda attuale: ~290 topic = oltre 5 anni di contenuti a 1 articolo/settimana.

---

## Pubblicazione bozze direttamente da Decap CMS

Solo come fallback se sei senza terminale (mobile/tablet):
1. Apri https://dopahop-site.pages.dev/admin/
2. Login GitHub
3. Vai a Blog → vedi i 5 articoli draft (uno per lingua, stesso `translationKey`)
4. Edita visualmente quello IT (Decap mostra preview live)
5. Quando pronto, flippa `draft → false` e salva tutti e 5
6. Decap apre 5 PR in editorial workflow — devi mergiarle a mano

⚠️ Da terminale, `/publish-article <slug>` fa lo stesso in 5 secondi senza PR.

---

## Troubleshooting

### `/write-article` dice "topic queue is empty"

Hai esaurito `BLOG_TOPICS.md`. Aggiungi nuovi topic o usa la variante con argomento esplicito.

### Validation fallisce sull'output di un sub-agent

Il comando fa retry singolo automatico. Se anche il retry fallisce, ferma e segnala. Sintomi: word count basso, H2 mancanti, frontmatter rotto. Tipicamente segnala che il topic è troppo specifico o ambiguo — riformulalo o saltalo.

### Le traduzioni hanno errori grammaticali

Improbabile col pattern sub-agent madrelingua (ognuno scrive da zero nel proprio paese, non traduce). Se succede:
- Apri il file della lingua incriminata
- Correzione manuale
- Commit + push

Se è un errore sistematico (es. il sub-agent DE traduce sempre male un termine), aggiorna le indicazioni nel `LOCAL_GUIDANCE` di `/write-article` per quella lingua.

### Voglio cambiare il tono di un articolo già pubblicato

Apri il file nella lingua specifica, edita, commit. Astro ribuilda. Il cambio resta locale a quella lingua. Le altre 4 lingue NON si aggiornano automaticamente (sono articoli indipendenti, non traduzioni). Se vuoi propagare un cambio strutturale a tutte e 5, devi editare tutti e 5 i file (oppure cancellarli e rilanciare `/write-article` con lo stesso topic — sovrascrive tutto).

### Il sito non si aggiorna dopo push

Verifica:
1. https://dash.cloudflare.com/?to=/:account/workers-and-pages → Deploys del progetto `dopahop-site`
2. Se build failed, leggi log
3. Se build success ma vecchio contenuto: hard refresh (Ctrl+Shift+R)

---

## File di riferimento

- `BLOG_TOPICS.md` → coda topic (consumata da `/write-article`)
- `BRAND_VOICE.md` → regole voice (input dei 5 sub-agent madrelingua)
- `BLOG_SEO_TEMPLATE.md` → struttura SEO (input dei 5 sub-agent)
- `.claude/commands/write-article.md` → slash command 5 articoli paralleli
- `.claude/commands/publish-article.md` → slash command flippa draft → published su tutti i 5
- `src/content/blog/{it,en,es,de,fr}/<slug>.md` → articoli per lingua
- `src/content/config.ts` → schema frontmatter (NON modificare)

## Nota sulla differenza dal vecchio setup

Il setup precedente aveva 2 comandi separati: `/draft-article` (solo IT) + `/translate-article` (4 traduzioni). Pattern "scrivi IT bene, poi traduci" — falliva sui topic con riferimenti localizzati (sistema sanitario italiano, associazioni italiane, ecc.) perché il sub-agent traduttore traduceva quei riferimenti inutilmente per il lettore tedesco/inglese/etc.

Il nuovo `/write-article` risolve strutturalmente: ogni lingua ha il proprio articolo nativo, scritto da zero per il proprio paese.
