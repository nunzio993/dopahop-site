# SEO Strategy — DopaHop blog

Captured thinking on integrating SEO-aware topic triage + per-article SERP intelligence into the `/auto-blog` pipeline. Discussion drafted 2026-05-17.

---

## Realtà del sito (baseline onesta)

- **dopahop.app**: ~6 mesi di vita, Domain Authority bassa. Su keyword competitive in inglese ("ADHD differential diagnosis", "ADHD productivity") **non batte** ADDitude / CHADD / NHS / Healthline → non è una questione di SEO, è DA.
- Dove **può** vincere ora:
  1. **Long-tail in IT/DE/FR/ES** — molto meno saturati di EN. Es.: "Differenzialdiagnose ADHS bipolar Erwachsene" più vincibile di "ADHD bipolar differential diagnosis adults".
  2. **Topic ultra-specifici** — "ADHD task switching cost minuti recupero giornata" vs generico "ADHD multitasking".
  3. **Angoli che i grandi siti evitano** — opinioni nette, anti-toxic-positivity, esperienza founder-with-ADHD. Brand voice differenziato è asset reale.

## Cosa è possibile senza API a pagamento (WebSearch/WebFetch)

| Capability | Free | Note |
|---|---|---|
| SERP intelligence (top-10 results) | ✅ | Authority proxy via dominio. Se top-10 sono tutti DR80+ medical = duro. |
| People Also Ask extraction | ✅ | Diventano direttamente H2/FAQ. Forte AEO. |
| Related searches | ✅ | Keyword adiacenti per ampliare il pezzo. |
| Featured snippet detection | ✅ | Capire formato vincente (lista/definizione/tabella) e replicare. |
| Title length + power words | ✅ | Già enforced (50-60 char). |
| Volume di ricerca assoluto | ❌ | Serve Ahrefs/SEMrush/DataForSEO. Google Keyword Planner free disabilitato. |
| Keyword Difficulty (KD) numerica | ❌ | Idem. |
| Google Trends relativo | ⚠️ | Stagionalità e trend, no volumi assoluti. |

## Con API a pagamento (opzionale)

- **DataForSEO**: ~$0.001 per keyword query, ~$0.005 per SERP query
- Costo per articolo (5 lang × 3 query): ~$0.075 → praticamente gratis
- Dà volume + KD reali, copre il gap del free tier
- **Quando**: solo quando il DA cresce e ci serve precisione sui volumi (~mese 12+)

## Strategia a due livelli

### Tier 1 — Strategic triage (one-shot, separato da auto-blog)

Comando dedicato (es. `/seo-triage`) che gira UNA volta sull'intero `BLOG_TOPICS.md`:

1. Per ogni topic, 1 SERP check per locale
2. Score: `feasibility × strategic-fit`
3. Output: queue ri-ordinata con topic vincibili in testa, impossibili in fondo (o segnalati `[SKIP]`)
4. **Costo**: ~250 topic × 5 lang × 1 query = 1250 query → 30-45 min in batch, ~500k token
5. **Frequenza**: ogni 2-3 mesi quando aggiungi nuovi topic, o quando DA cambia

**Vantaggio**: alloca energie sui topic che hanno chance reali, non spreca articoli su keyword morte.

### Tier 2 — Per-article tactical (integrato in auto-blog)

**Architettura corretta: ogni sub-agent nativo fa la SUA propria SERP research nella sua lingua. Niente coordinator separato, niente handoff cross-language.**

Modifica al brief del singolo sub-agent madrelingua (1 per locale, 5 in parallelo):

```
Sub-agent <LOCALE> madrelingua:
  Step 0 (NEW): 1-2 WebSearch nella lingua nativa sul topic
    → top-10 risultati (segnale difficulty)
    → People Also Ask
    → Related searches
    → Identifica 1-2 gap competitivi
  Step 1: Glob blog/<locale>/ per inter-blog (esistente)
  Step 2: legge BRAND_VOICE, SEO_TEMPLATE, BLOG_CITATIONS (esistente)
  Step 3: decide title + H2 + FAQ con (a) brand voice (b) safelist (c) SERP intelligence (d) suo istinto nativo
  Step 4: scrive l'articolo
  Step 5: report INCLUDE: difficulty locale + competitive gaps + perché title così
```

L'orchestrator aggrega i 5 mini-report in una **tabella difficulty cross-locale** nel report finale all'utente.

**Vantaggi rispetto a handoff con coordinator**:
- ✅ Native fluency preservata — l'agent vive in IT/EN/ES/DE/FR dall'inizio alla fine
- ✅ Nessun "SEO template tradotto" — la SERP è letta in lingua nativa e interpretata con istinto
- ✅ PAA usate come *intelligence sull'intent* (non come literal FAQ da copiare)
- ✅ Architettura attuale invariata, solo brief esteso

**Anti-pattern da evitare**:
- ❌ SEO brief che prescrive il title esatto al writer → produce title "tradotti dall'inglese" che suonano forzati
- ❌ PAA copincollate come FAQ literali → le PAA di Google sono query string aggregate, spesso brutte anche in lingua nativa
- ❌ Pattern keyword-front-load forzati ("X: why Y fails") → esistono in EN, in IT/DE/FR/ES suonano subito stranieri

**Regola d'oro per il brief**:
> Il brief dà **vincoli + intelligence**, mai prescrizioni testuali. Il madrelingua decide come dirlo.

Esempio brief estratto:
```
Vincoli SEO per il title:
  - 50-60 char
  - Deve contenere "GTD" + sigla ADHS/TDAH/ADHD nella tua lingua
  - Evita "klassische Methode/método clásico/méthode classique" (già usato da 3 dei top-5)
  - Angoli liberi nei top-10: "dove crolla/wo es kippt", "cosa scricchiola/là où ça lâche"
  - Scrivi il title che ti viene più naturale rispettando questi vincoli.
```

**Native-fluency check in Round 2 audit**:
- L'auditor (anch'esso madrelingua) legge title + 5 FAQ a voce alta come madrelingua
- Se uno suona "tradotto dall'inglese" o "da copywriter SEO", flagga FAIL con suggerimento nativo
- Costo: zero WebSearch, solo lettura

**Costo aggiunto per articolo**: ~3-5 min + ~80-120k token (≈15% in più sul baseline).

## Roadmap consigliata

1. **Primo step**: `/seo-triage` su queue esistente (weekend, 1 batch lungo). Ti dà la queue ordinata + segnali quali topic skipare per ora.
2. **Secondo step**: integrare Tier 2 in auto-blog, ma solo dopo aver visto il valore concreto su 1-2 articoli pilota. Se gli articoli SERP-aware rankano meglio dopo 30-60 giorni, scaliamo.
3. **Terzo step** (opzionale, mese 12+): valutare DataForSEO API per volumi precisi quando DA cresce e serve fine-tuning.

## Anti-pattern da evitare

- ❌ Investire in paid API ora — WebSearch dà l'80% del valore a costo zero.
- ❌ Usare SEO come ottimizzazione singola — il vero moltiplicatore per sito nuovo è **publish rate × multilingua × qualità factuale**. SEO è un acceleratore, non il motore.
- ❌ Chasing keyword vincibili che ti portano fuori brand. Meglio 50 articoli on-brand che rankano in 6 mesi che 200 articoli neutri che sembrano AI slop.
- ❌ Ignorare il moltiplicatore multilingua — un topic "perso" in EN può essere quasi gratis da vincere in DE/FR/IT.

## Metriche di successo (da tracciare a 30/60/90 giorni)

- **Impression in Google Search Console** (per articolo, per locale)
- **Position media** (idealmente <30 → <20 → <10 nel tempo)
- **CTR organic** (>3% sopra position 10 = title funziona)
- **People Also Ask appearance** (se un nostro H2 finisce in PAA = ranking forte)
- **Keyword spread** (numero di query distinte che fanno impression sull'articolo)

GSC è gratuito, basta verificare il sito (probabilmente già fatto via Cloudflare Pages → Custom domain).

## File correlati

- `BLOG_TOPICS.md` — coda topic
- `.claude/commands/auto-blog.md` — pipeline attuale (no SEO step)
- `.claude/commands/write-article.md` — writer brief
- `BLOG_CITATIONS.md` — safelist citazioni (parallelo a SEO, non sovrapposto)

## Note tecniche di implementazione (per quando si farà)

- WebSearch in Claude ha rate limit + costi token. Budget consigliato: max 20 query per agent.
- SERP brief deve essere **compatto** (1-2 KB) per non gonfiare il context del writer.
- People Also Ask può essere estratto via WebFetch su google.com/search?q=... ma fragile (HTML cambia, captcha). Più stabile usare DuckDuckGo o l'output di WebSearch nativo.
- Per cross-locale: ogni sub-agent madrelingua fa la SUA WebSearch nella SUA lingua. La query in lingua nativa tiene il bias geografico necessario, niente country parameter richiesto.
- Output format proposto per SERP brief (per articolo, per locale):
  ```yaml
  topic: "ADHD e GTD: cosa non funziona"
  locale: it
  difficulty: medium | hard | easy
  top_5_domains: [chadd.org, additude.it, ...]
  people_also_ask:
    - "GTD funziona davvero?"
    - "Qual è il miglior metodo per ADHD?"
  related_searches: ["bullet journal ADHD", "metodo ivy lee"]
  featured_snippet_format: list | paragraph | table | none
  recommended_title: "GTD e ADHD: perché il metodo classico non tiene"
  recommended_h2_inject: ["Come adattare GTD se hai ADHD"]
  competitive_gap: "Nessuno tra i top-5 parla di re-entry senza colpa"
  ```
