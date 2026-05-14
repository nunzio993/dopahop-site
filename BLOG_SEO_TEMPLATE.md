# Blog SEO template — DopaHop

Struttura SEO da applicare a ogni articolo. Caricata come knowledge nei Claude Projects e usata dal sub-agent IT che genera la bozza.

---

## 1. Frontmatter del file Markdown

Ogni articolo è un file `.md` in `src/content/blog/<locale>/<slug>.md` con questo frontmatter completo:

```yaml
---
title: "Titolo articolo (50-60 caratteri, keyword principale all'inizio)"
description: "Meta description per Google (150-160 caratteri, keyword principale + 1-2 secondarie + CTA implicita)"
excerpt: "Anteprima per la card lista (60-100 caratteri, hook emotivo o claim forte)"
pubDate: 2026-05-04
updatedDate: 2026-05-04
cover: "/img/blog/<slug>.jpg"
tags: ["ADHD", "<tag-secondario>", "<tag-terziario>"]
locale: it
draft: true
author: "DopaHop Team"
translationKey: "<slug-canonico>"
---
```

**Note:**
- `draft: true` di default — manualmente cambia a `false` quando pronto a pubblicare
- `translationKey` deve essere uguale tra IT/EN/ES/DE/FR per lo stesso articolo (es. `adhd-procrastinazione-vera-causa`) — abilita gli `hreflang` reciproci
- `cover` è opzionale ma consigliato (16:9, 1200×675px)
- `tags` array di 2-4 tag (mai più di 4, mai sotto 2)

---

## 2. Slug URL

Lo slug è la parte URL dopo `/blog/` (es. `adhd-procrastinazione-vera-causa`).

Regole:
- 4-7 parole, solo lowercase
- Separato da trattini (no underscore)
- Include la keyword principale all'inizio
- No stopword superflue ("il", "di", "una") quando possibile
- Stesso slug per tutte le 5 lingue (mantiene unitario il `translationKey`)

Esempi:
- ✅ `adhd-procrastinazione-vera-causa`
- ✅ `adhd-funzioni-esecutive-cosa-si-rompe`
- ✅ `adhd-disregolazione-emotiva`
- ❌ `articolo-su-procrastinazione-e-adhd-importante` (troppo lungo, stopword)
- ❌ `procrastinazione_adhd` (underscore)

---

## 3. Title tag

**Lunghezza**: 50-60 caratteri (Google tronca oltre).

**Pattern**:
```
[Keyword principale]: [hook concreto] | DopaHop
```

Il `| DopaHop` è opzionale (-12 char), valutare se conviene.

Esempi:
- ✅ "ADHD e procrastinazione: il meccanismo reale" (45 char)
- ✅ "ADHD e dopamina: il modello neurobiologico spiegato" (52 char)
- ✅ "Diagnosi tardiva ADHD: perché succede" (38 char)
- ❌ "10 cose da sapere sull'ADHD" (toxic title, generico)

**Keyword principale all'inizio** (Google pesa di più i primi 30 caratteri).

---

## 4. Meta description

**Lunghezza**: 150-160 caratteri (Google tronca oltre).

**Pattern**:
```
[Affermazione concreta sulla keyword]. [Cosa l'articolo darà al lettore]. [Hook DopaHop o CTA implicita].
```

Deve contenere:
- Keyword principale (1 volta, naturale)
- 1-2 keyword secondarie correlate
- Vibe del brand DopaHop (gentile, anti-streak)

Esempi:
- ✅ "ADHD e procrastinazione non sono la stessa cosa. Capire il meccanismo neurobiologico aiuta a smettere di sentirsi pigri quando il cervello non parte." (148 char)
- ✅ "Disfunzione esecutiva nell'ADHD: cosa significa concretamente, quali processi si rompono, e quali strategie funzionano davvero. Senza guru." (140 char)

---

## 5. Struttura H1/H2/H3

### H1 (1 per pagina, = title senza ` | DopaHop`)

```markdown
# ADHD e procrastinazione: il meccanismo reale, non "pigrizia"
```

NB: il template Astro usa il `frontmatter.title` come `<h1>`, quindi il body markdown NON inizia con `# Titolo`. Inizi direttamente con il primo paragrafo dell'intro.

### Intro (100-150 parole)

Il primo paragrafo è critico:
- Keyword principale nei primi 100 caratteri
- Esempio concreto IMMEDIATO (non astratto)
- Riconoscimento della fatica del lettore
- Cosa l'articolo gli darà

Esempio:
> **ADHD e procrastinazione** non sono la stessa cosa, anche se sembrano. Quando hai ADHD e fissi lo schermo per due ore prima di rispondere a una mail di tre righe, non è pigrizia: è il tuo cervello che non riesce a generare la dopamina necessaria per "iniziare". In questo articolo capiamo il meccanismo neurobiologico, perché "basta sforzarsi" non funziona, e tre strategie con base scientifica.

### H2 (4-6 per articolo, = sezioni principali)

Le H2 strutturano l'articolo. Pattern raccomandato per articolo ADHD:

```markdown
## Cosa significa [keyword] nell'ADHD

(definizione operativa, fonte clinica)

## Perché succede: il meccanismo

(spiegazione neurobiologica/psicologica accessibile)

## Cosa NON funziona (e perché)

(metodi standard che falliscono — riconoscimento)

## Cosa funziona davvero

(strategie con base scientifica, 2-4 punti)

## Come DopaHop ti può aiutare

(collegamento concreto a moduli dell'app)

## In sintesi

(takeaway pratico)
```

**Ogni H2 contiene una keyword secondaria correlata** (es. "il meccanismo neurobiologico", "strategie pratiche per ADHD").

### H3 (opzionale, se H2 ha sotto-sezioni)

Usa H3 solo se serve davvero. Massimo 2-3 H3 per H2.

---

## 6. Body content

### Lunghezza target

Aggiornato dopo benchmark Inflow (vedi sezione 11):

- **Articoli informational** (definizioni, sintomi, meccanismi): **1.200-2.000 parole**
- **Articoli how-to** (strategie pratiche, guide): **1.500-2.500 parole**
- **Articoli short-form** (FAQ, definizioni rapide): **800-1.200 parole**

Sotto 800 parole Google considera "thin content". Sopra 3.000 perde retention nella maggior parte dei casi.

### Densità keyword

- Keyword principale: 5-8 occorrenze in 1.000 parole (densità ~0.5-0.8%)
- Keyword secondarie (sinonimi/correlate): 3-5 occorrenze ciascuna
- **No keyword stuffing**: se sembra forzato, riduci

### Paragrafi

- Max 4-5 righe per paragrafo (mobile reading)
- Mescola lunghezze: paragrafi corti + un po' di varietà
- Frasi corte > frasi lunghe

### Liste

Ogni articolo dovrebbe avere **almeno 1-2 liste** (puntate o numerate). Aiutano:
- Skim reading (lettore ADHD!)
- Featured snippet Google
- Estrazione facile per AI overview

### Bold strategico

**Grassetto** sui passaggi chiave (1 ogni 200-300 parole). Aiuta scan visivo e enfasi SEO.

### Esempi concreti

Ogni concetto astratto deve avere 1 esempio concreto entro le 100 parole successive. Pattern:
- Affermazione astratta
- "Per esempio:" / "Pensa a:" / "Un caso concreto:"
- Esempio dalla vita quotidiana ADHD

---

## 7. Link interni e esterni

### Internal link a moduli DopaHop (1-2 per articolo)

In ogni articolo cita almeno 1 modulo DopaHop pertinente:

| Difficoltà | Modulo | Markdown link |
|---|---|---|
| Iniziare task | Pomodoro | `[il Pomodoro di DopaHop](/#cosa-fa)` |
| Pensieri persi | Brain dump | `[brain dump](/#cosa-fa)` |
| Task grande | Spacca-task | `[spacca-task](/#cosa-fa)` |
| Farmaci | Promemoria farmaci | `[promemoria farmaci](/#cosa-fa)` |
| Mood | Mood check-in | `[mood check-in](/#cosa-fa)` |
| Focus | Focus sounds | `[focus sounds](/#cosa-fa)` |

### Internal link a altri articoli del blog (1-2 per articolo, MAX 3-4)

Quando un argomento si collega a un altro articolo già pubblicato:
```markdown
Vedi anche: [ADHD e funzioni esecutive: cosa si rompe davvero](/blog/adhd-funzioni-esecutive-cosa-si-rompe/)
```

**CAP MASSIMO: 3-4 link inter-blog per articolo.** Default consigliato 1-2. Mai oltre 4. Si conta solo `/blog/<slug>/` (gli anchor `/#cosa-fa` ai moduli DopaHop NON contano: sono CTA inline separati, gestiti in sezione 7). Sopra 4 link inter-blog su un articolo di 1.500-2.500 parole genera distrazione visiva (audience ADHD!) + segnale di over-optimization SEO. Se identifichi 5+ articoli candidati molto correlati, scegli i 2-3 migliori e basta.

### Link esterni a fonti autorevoli (1-3 per articolo clinico)

Per articoli che parlano di clinica, dosaggi, sintomi: cita fonti.

Fonti accettabili:
- **DSM-5 / ICD-11** (criteri diagnostici)
- **CHADD** (chadd.org) — autorità ADHD USA
- **AIDAI** (aidaiassociazione.com) — italiana
- **ISS** (iss.it) — Istituto Superiore di Sanità
- Studi PubMed indicizzati (linka all'abstract)

Non linkare a:
- Forum tipo Reddit, Quora (no autorità)
- Blog personali ADHD non verificati
- Siti commerciali di integratori

---

## 8. Disclaimer (se topic clinico)

Per articoli che toccano farmaci, diagnosi, terapia, sintomi clinici, **chiudi sempre con**:

```markdown
---

*Questo articolo è informativo e non sostituisce il parere di un professionista. Per diagnosi, terapia o emergenze, rivolgiti a un medico, psicologo o psichiatra qualificato. In caso di emergenza sanitaria: 112.*
```

Per articoli che toccano crisi o autolesionismo, aggiungi anche:

```markdown
*Se stai attraversando un momento difficile: Telefono Amico 800 86 00 22 — Samaritans Italia 02 2327 2327.*
```

---

## 9. FAQ section (opzionale ma consigliata)

Se l'articolo si presta, aggiungi 3-5 domande FAQ a fine articolo PRIMA del disclaimer. Astro le converte automaticamente in JSON-LD `FAQPage` schema (verifica nel template).

```markdown
## Domande frequenti

### L'ADHD si "cura"?

No. L'ADHD è un disturbo neurobiologico cronico. Si gestisce con farmaci, terapia, e adattamenti dello stile di vita. La parola "cura" è impropria.

### Posso avere ADHD anche se prendo bei voti a scuola?

Sì. Molti adulti con ADHD hanno performance accademiche buone in compenso a costi enormi (iperfocus selettivo, ansia da prestazione, burnout). La diagnosi non si basa solo sui voti.

### …
```

Le FAQ migliorano:
- Featured snippet ("People also ask" Google)
- Skim reading
- Long-tail keyword coverage

---

## 10. Cover image

Specifica per cover articolo:
- **Dimensioni**: 1200 × 675 px (16:9)
- **Formato**: JPG (per peso) o PNG (se serve trasparenza)
- **Path**: `/public/img/blog/<slug>.jpg`
- **Reference nel frontmatter**: `cover: "/img/blog/<slug>.jpg"`
- **Alt text**: il template usa il `title` come alt automaticamente

Genera con Midjourney / DALL-E / Sora con prompt allineati al brand:
- Palette: yellow/teal/dark navy (vedi BRAND_VOICE)
- Style: illustrato, gentile, non corporate-stock
- Subject: metafora visiva del topic, mai foto persone reali

---

## 11. Benchmark: pattern da blog ADHD di successo

Riferimento: **[Inflow](https://www.getinflow.io/blog)** (~16.000 utenti app, blog editoriale ADHD da imitare per struttura). Analisi struttura loro articoli (maggio 2026):

### Pattern che imitiamo

- **Lunghezza articoli: 1.500-3.000 parole** (più ranking, più dwell time). Aggiornato il nostro target lunghezza a 1.200-2.500 parole.
- **Reading time estimate** visibile in alto (es. "9 min di lettura"). Già implementato nel nostro template Astro.
- **Categorie tematiche** macro per facilitare browsing: ADHD 101, Management, Comorbidità, Salute, Lifestyle, Lavoro/Studio, Relazioni. Possiamo aggiungere come secondo livello di tag in futuro.
- **Tone conversazionale + personale**: prima persona quando ha senso ("quando ho cambiato lavoro la quarta volta"), umore leggero (es. una battuta o GIF), aneddoti.
- **Inline CTA multipli al prodotto**: non solo chiusura, ma 1-2 menzioni mid-article (es. "se ti capita spesso di X, prova [modulo Y di DopaHop]"). Naturali, mai pesanti.
- **Bold strategico** per concetti chiave (es. **dopamine pooling**, **task initiation**). Aiuta skim reading.
- **Pull quotes / blockquote** per enfasi visiva su passaggi forti.
- **Author byline + bio breve** (1-2 righe — autore + qualifica/storia ADHD personale). Per ora usiamo "DopaHop Team" come autore generico, ma valutare in futuro firme reali.
- **Disclaimer medico standard** in chiusura per ogni articolo che tocca clinica.

### Pattern Inflow che NON imitiamo (deliberato)

- **Zero citazioni accademiche**: Inflow scrive per testimonianza + dati interni. DopaHop alza l'asticella → cita fonti (CHADD, AIDAI, ISS, DSM-5, PubMed) per ogni claim clinico. È un nostro differenziatore di credibilità.
- **Quiz/onboarding lead magnet aggressivo**: Inflow inserisce "fai il quiz" molte volte. DopaHop non ha un quiz, e tira meno la conversione. Manteniamo CTA leggero ("Hop ti aspetta su Google Play").
- **GIF e meme inline**: Inflow li usa. Per noi è opzionale — se rallenta il caricamento o appare gimmicky, evita.

### Variante intro: storytelling vs claim

Inflow apre spesso con **narrativa personale** (es. "Quando ho cambiato lavoro la quarta volta in 3 anni…") prima di entrare nel topic. Più engaging, ma ritarda la keyword.

DopaHop può alternare:
- **Stile claim** (default, vedi sezione 5): "ADHD e procrastinazione **non sono la stessa cosa**…" — keyword nei primi 100 char, SEO-first
- **Stile narrativo** (variante): "Quando hai ADHD e cerchi di rispondere a una mail, ma ti accorgi di stare sistemando le penne per la terza volta…" — più engaging, keyword entro 200-250 char

Entrambi accettabili. Default consigliato: claim per articoli very SEO-targeted (definizioni, sintomi), narrativo per articoli lifestyle/strategie.

---

## 13. AEO — Answer Engine Optimization (AI Overviews, ChatGPT, Perplexity)

Nel 2026 una grossa fetta del traffico discovery non passa più dai click su Google ma dalle citazioni dentro AI Overviews di Google, ChatGPT, Perplexity, Bing Copilot. Le metriche e i pattern che contano per essere *citati* dagli LLM sono diversi (e in parte sovrapposti) rispetto al SEO classico.

### Cosa massimizza la citation in AI engines

1. **Branded mentions di entità autoritative riconosciute dagli LLM**. Citare nominalmente CHADD, AIDAI, ISS, NICE NG87, HAS, ADHS Deutschland e.V., FEAADAH, DSM-5, ICD-11, e paper specifici (con autori + anno) — non solo come fonte ma come *segnale di ground-truth*. Gli LLM tendono a ri-citare contenuti che a loro volta citano fonti che già conoscono. La nostra `BLOG_CITATIONS.md` è il primo strumento per questo.

2. **Definizione concisa estraibile nel primo paragrafo**. Gli AI engines estraggono il "primo wrapper di significato" del topic. Pattern raccomandato:

   > **[Keyword]** è [definizione operativa in una frase]. Concretamente, significa che [esempio osservabile]. La ricerca mostra che [un dato chiave dalla safelist].

3. **Struttura claim → evidence → number**. Per ogni H2 importante, organizzare in sequenza:
   - **Claim**: affermazione concreta, non vaga
   - **Evidence**: fonte autoritativa (paper safelist, ente, linea-guida)
   - **Number**: cifra/effect size/percentuale dal `finding_key` della safelist
   
   Esempio: "Le terapie cognitive adattate all'ADHD adulto riducono i sintomi in modo robusto. La meta-analisi di Young, Moghaddam e Tickle (2020) su 9 RCT mostra SMD=0.76 vs lista d'attesa."

4. **Content depth + struttura parseable**. Per AEO conta più la *granularità organizzata* della pura lunghezza:
   - H2 chiari con keyword nella domanda implicita ("Cosa funziona davvero", "Perché succede")
   - Liste numerate o puntate per ogni concetto enumerable
   - Bold sui termini-chiave (gli LLM li pesano come anchor)
   - FAQ inline con domande naturali (pattern question-answer chunk)

5. **Definizioni dichiarate in sezione propria**. Quando l'articolo introduce un concetto specialistico (RSD, time blindness, ego depletion, working memory), inserire una **micro-definizione di 1-2 frasi** nel punto in cui appare la prima volta. Gli AI engines estraggono questi blocchi come "definizione canonica".

6. **Struttura comparativa esplicita**. Per topic "X vs Y" (CBT vs coaching, rigid discipline vs scaffolding), usare una **tabella o lista comparativa** alla fine della sezione. Gli AI engines amano comparative tables come ground truth strutturato.

### Anti-pattern AEO da evitare

- **Walls of text** senza heading o struttura
- **Ironia o tono ambiguo** in introduzione (gli LLM faticano a estrarre il claim)
- **Numeri senza fonte** (gli LLM non li ri-citano se non possono attribuirli)
- **Frasi che iniziano con "Forse" / "Potrebbe" / "Dipende"** come definizione (ambigue per estrazione)
- **Citazioni di paper non in `BLOG_CITATIONS.md`** (rischio di hallucination cross-citation negli LLM downstream)

### Differenza pratica vs sezione 5 (SEO classico)

| Dimensione | SEO classico | AEO |
|---|---|---|
| Obiettivo | Click su SERP | Citation dentro AI Overview / chat answer |
| Keyword | Densità 0.5-0.8% nel body | Definizione concisa in apertura |
| Lunghezza | 1.200-2.500 parole | Granularità organizzata (chunk parseable) |
| Fonti | 1-3 esterne autorevoli | Branded mentions ricorrenti + safelist citata |
| FAQ | Featured snippet | Question-answer chunk per AI |
| Numeri | Per autorevolezza umana | Estratti dagli LLM se ben attribuiti |

### Checklist AEO add-on (pre-publish)

- [ ] Definizione operativa del topic nel primo paragrafo (1-2 frasi estraibili)
- [ ] Almeno 1 paper safelist citato per nome (autori + anno) con dato numerico dal `finding_key`
- [ ] Almeno 1 organizzazione autoritativa locale (CHADD/AIDAI/HAS/NICE/ADHS Deutschland/FEAADAH) menzionata
- [ ] Ogni concetto specialistico introdotto ha micro-definizione vicina alla prima occorrenza
- [ ] FAQ con domande naturali (no marketing-speak), risposte 2-4 righe (chunk size ottimale per AI extraction)
- [ ] Almeno 1 lista o tabella comparativa per ogni articolo "X vs Y" / "cosa funziona vs cosa no"

---

## 12. Checklist pre-publish

Prima di cambiare `draft: true → false`, verifica:

- [ ] Title 50-60 char con keyword all'inizio
- [ ] Description 150-160 char con keyword
- [ ] H1 = title (frontmatter, non duplicato nel body)
- [ ] Intro 100-150 parole con keyword nei primi 100 char
- [ ] 4-6 H2 con keyword secondarie
- [ ] 1.000+ parole (a meno che short-form intenzionale)
- [ ] 1-2 internal link a modulo DopaHop
- [ ] 1-2 fonti esterne autorevoli (se topic clinico)
- [ ] Disclaimer in chiusura (se topic clinico)
- [ ] Cover image (opzionale ma consigliata)
- [ ] `translationKey` impostato (per quando arriveranno le traduzioni)
- [ ] Tono coerente con BRAND_VOICE (no toxic positivity, no streak-shaming, no schwa)
- [ ] Zero affermazioni cliniche senza fonte
- [ ] Esempi concreti per ogni concetto astratto
- [ ] Lettura ad alta voce: suona naturale (non "tradotto")

Se almeno 1 check fallisce, riapri e correggi.
