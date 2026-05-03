---
description: Scrive un articolo blog completo in 5 lingue native (IT/EN/ES/DE/FR) via 5 sub-agent madrelingua paralleli, ognuno autonomo nel proprio paese
---

# /write-article

Genera 5 articoli "fratelli" sullo stesso topic, uno per lingua, ognuno scritto da un sub-agent madrelingua come articolo NATIVO nel proprio paese.

**Filosofia**: niente "scrivi IT poi traduci". Cinque articoli paralleli e indipendenti che condividono solo topic, brand voice DopaHop, struttura macro, slug e `translationKey`. Ogni sub-agent cita le risorse, le associazioni, il sistema sanitario, le linee guida e i numeri di emergenza del proprio paese — non quelli italiani.

## Argomento

- Senza argomento: prende il primo topic non commentato di `BLOG_TOPICS.md`
- Con argomento: usa quello (es. `/write-article ADHD e procrastinazione`), NON modifica la coda

## Esegui questi step

### 1. Determina il topic

- Se argomento passato: usa quello, salta la coda
- Altrimenti: leggi `BLOG_TOPICS.md`, prendi la prima riga `- ` non commentata. Memorizza il testo completo
- Se la coda è vuota e nessun argomento: ferma e segnala

### 2. Calcola lo slug (IN INGLESE, universale per tutte le 5 lingue)

Lo slug deve essere identico tra le 5 lingue (per `translationKey` + hreflang reciproci).

Pattern: traduci il topic in inglese essenziale, poi:
- Lowercase
- Solo caratteri ASCII (no accenti)
- Trattini al posto di spazi/punti
- Rimuovi articoli/preposizioni superflue
- Max 6-7 parole

Esempi:
- `"ADHD: definizione operativa e criteri clinici (DSM-5)"` → `adhd-dsm-5-criteria`
- `"ADHD e procrastinazione: meccanismo reale, non pigrizia"` → `adhd-procrastination-real-mechanism`
- `"Differenza tra ADHD infantile e adulto"` → `adhd-children-vs-adults`
- `"ADHD e dopamina: modello neurobiologico"` → `adhd-dopamine-neurobiological-model`

### 3. Verifica file destinazione

Per ogni `<locale>` in `[it, en, es, de, fr]`, controlla se `src/content/blog/<locale>/<slug>.md` esiste già.
- Se almeno uno esiste: chiedi all'utente "Articoli con questo slug esistono già in [lingue]. Sovrascrivere? (sì/no/skip-esistenti)"
- `sì` = sovrascrive tutto
- `no` = ferma
- `skip-esistenti` = scrivi solo le lingue mancanti (spawna meno sub-agent)

### 4. Spawna N sub-agent madrelingua paralleli (single message, multiple Agent calls)

Ciascun sub-agent ha questo brief (sostituisci [LOCALE], [LOCALE_NAME], [LOCAL_GUIDANCE], [PATH_OUT]):

```
Sei un copywriter [LOCALE_NAME] madrelingua per DopaHop, un'app ADHD gentile per Android (disponibile su Google Play in 5 lingue native, non solo tradotta).

Il tuo task: scrivere un articolo blog SEO-ottimizzato in [LOCALE_NAME], pensato per un lettore del TUO paese, non un lettore italiano. Stesso topic dell'articolo italiano "fratello", ma scritto come se fosse stato concepito direttamente nel tuo paese.

TOPIC: **[TOPIC]**

## File di contesto OBBLIGATORI da leggere

1. `D:/dopahop/site/BRAND_VOICE.md` — regole copy DopaHop. Sezioni critiche:
   - Sezione 2 "Tono di voce" (caldo, mai paternalistico — vale per tutte le lingue)
   - Sezione 3 "Regole copy obbligatorie"
   - Sezione 5 "Feature di DopaHop — ground truth" (cosa l'app HA e cosa NON ha — non inventare feature)
   - Sezione 5b "Esempi concreti DopaHop" (mappatura difficoltà → modulo)
   - Sezione 10 "Articolo reference" (esempio template-perfetto in italiano — usa SOLO come calibrazione di tono e densità, NON tradurre quello)

2. `D:/dopahop/site/BLOG_SEO_TEMPLATE.md` — struttura SEO. Vincoli:
   - Frontmatter completo (vedi sotto)
   - Body 1.200-2.500 parole
   - 4-6 H2 sezioni
   - 1-2 internal link a moduli DopaHop esistenti
   - FAQ section a fine articolo (3-5 domande)
   - Disclaimer in chiusura se topic clinico

## Localizzazione: scrivi NEL TUO PAESE

[LOCAL_GUIDANCE]

Quando l'articolo richiede di citare:
- **Manuali diagnostici**: usa quelli universali (DSM-5, ICD-11) + linee guida del tuo paese se esistono
- **Enti governativi sanitari**: cita quelli del tuo paese, non l'ISS italiano
- **Associazioni ADHD**: cita quelle del tuo paese, non AIDAI
- **Servizi pubblici di diagnosi**: descrivi il percorso del tuo sistema sanitario
- **Numeri emergenza**: usa quelli del tuo paese
- **Acronimi ADHD**: usa quelli locali (ADHD/TDAH/ADHS/TDAH a seconda della lingua)
- **Riferimenti culturali (esempi quotidiani)**: scegli scenari familiari ai tuoi lettori, non scenari italiani

NON menzionare l'Italia o riferimenti italiani a meno che il topic specificamente lo richieda.

## Internal linking inter-blog (SEO)

PRIMA di scrivere il body, esegui questo step:
1. Lista i file in `D:/dopahop/site/src/content/blog/[LOCALE]/` (usa Glob)
2. Per ogni file `.md` trovato, leggi il frontmatter (title + tags + slug). Considera SOLO i file che hanno `draft: false` (sono articoli pubblicati). Se il file è in `draft: true`, ignoralo.
3. Identifica 1-2 articoli **già pubblicati** che siano tematicamente correlati al topic che stai per scrivere (es. stessi tag, argomenti vicini)
4. Nel body dell'articolo che stai scrivendo, cita 1-2 di questi articoli con il pattern: `Vedi anche: [titolo articolo](/[LOCALE]/blog/<slug>/)` (per non-IT) oppure `Vedi anche: [titolo articolo](/blog/<slug>/)` (per IT). Inserisci il link in modo organico, non in fondo come elenco scarno.
5. Se NON ci sono articoli pubblicati nella tua lingua (caso primo articolo, o tutti in `draft: true`), ometti l'internal linking inter-blog e scrivi solo i link a moduli DopaHop come al solito.

Questo step è cruciale per il SEO: Google premia il sito con link interni inter-articolo (boost ranking + crawl).

## Output

Scrivi un file Markdown completo a:
`[PATH_OUT]`

Frontmatter:
```yaml
---
title: "[50-60 char nella tua lingua, con keyword principale all'inizio]"
description: "[150-160 char nella tua lingua, include keyword + CTA implicita]"
excerpt: "[60-100 char, hook]"
pubDate: 2026-05-04
updatedDate: 2026-05-04
tags: ["[ADHD localizzato]", "<altri 2-3 tag rilevanti nella tua lingua>"]
locale: [LOCALE]
draft: true
author: "DopaHop Team"
translationKey: "[SLUG]"
---
```

Body: come da BLOG_SEO_TEMPLATE.md, in [LOCALE_NAME] nativo.

## Vincoli ASSOLUTI

- [LOCALE_NAME] naturale, mai "tradotto da italiano". Test: leggi a voce alta, suona nativo?
- Tono caldo e diretto, mai paternalistico (BRAND_VOICE Sezione 2). Vale anche per topic clinici: nessun "Falso." secco, nessun "Pericoloso.", nessun "non chiuderti nell'autoanalisi". Riconosci la fatica del lettore prima di correggere idee sbagliate.
- Niente streak-shaming né toxic positivity (BRAND_VOICE 3e)
- Nessun claim clinico senza fonte autorevole del tuo paese
- CTA solo da feature reali (BRAND_VOICE Sezione 5)
- Massimo 1 CTA inline + 1 in chiusura

## Quando hai finito

Conferma:
1. Path del file scritto
2. Word count del body
3. Numero di H2
4. Quali risorse/enti del TUO paese hai citato (es. "ADHS Deutschland e.V., Hausarzt-Facharzt Pfad, S3-Leitlinie ADHS")
5. Quali link interni a moduli DopaHop hai inserito
6. 2-3 frasi di sintesi sull'angolo dell'articolo

NON scrivere altri file oltre al `.md`.
```

### 5. Per ciascun sub-agent, sostituisci

| Locale | LOCALE | LOCALE_NAME | PATH_OUT |
|---|---|---|---|
| IT | it | italiano (registro caldo, naturale, no schwa) | `D:/dopahop/site/src/content/blog/it/<slug>.md` |
| EN | en | English (UK/US neutral, lean US for "mom") | `D:/dopahop/site/src/content/blog/en/<slug>.md` |
| ES | es | español (España neutro, tuteo, no vosotros) | `D:/dopahop/site/src/content/blog/es/<slug>.md` |
| DE | de | Deutsch (Standarddeutsch, Du-Form, no Sie) | `D:/dopahop/site/src/content/blog/de/<slug>.md` |
| FR | fr | français (France standard, tutoiement, no vous) | `D:/dopahop/site/src/content/blog/fr/<slug>.md` |

### LOCAL_GUIDANCE per locale

**IT**: "Scrivi per lettori italiani. Cita ISS (iss.it), AIDAI (aidaiassociazione.com), Centri di Salute Mentale (CSM), percorso medico di base → CSM/specialista, linee guida ISS-SNLG quando esistono. Numero emergenza: 112. Acronimo: ADHD."

**EN**: "Write for English-speaking readers (UK + US neutral, with mild lean to US English: 'mom' not 'mum', 'organize' not 'organise'). Cite CHADD (chadd.org), ADDA (add.org), NICE guidelines (UK) or APA (US), GP→psychiatrist (UK) or PCP→psychiatrist (US) pathway. Emergency number: '999 (UK), 911 (US), or your local emergency number'. Acronym: ADHD."

**ES**: "Escribe para lectores españoles (registro España neutro, evita modismos demasiado argentinos/mexicanos). Cita FEAADAH (feaadah.org), Centro de Salud Mental, Guía Práctica Clínica del Ministerio de Sanidad, médico de cabecera → especialista. Número emergencia: 112. Acrónimo: TDAH."

**DE**: "Schreib für deutschsprachige Leser (Deutschland-Standard, leichte Anpassung für Österreich/Schweiz wo nötig). Zitiere ADHS Deutschland e.V. (adhs-deutschland.de), zentrales adhs-netz, S3-Leitlinie ADHS, Hausarzt → Facharzt für Psychiatrie/Psychotherapie. Notrufnummer: 112. Akronym: ADHS."

**FR**: "Écris pour des lecteurs français (France standard, sans particularités québécoises ou belges). Cite HyperSupers TDAH France (tdah-france.fr), HAS (Haute Autorité de Santé), médecin traitant → psychiatre, ou Centre Médico-Psychologique (CMP) pour le public. Numéro d'urgence: 15 (SAMU) ou 112. Acronyme: TDAH."

### 6. Validation step

Aspetta che tutti gli N sub-agent finiscano. Per ciascuno verifica:
- File esiste e ha frontmatter YAML valido
- `locale` corretto (matches expected)
- `translationKey` uguale tra tutti
- Title 30-65 char
- Description 130-170 char
- Body word count ≥ 1.000 (target 1.200-2.500)
- ≥ 4 H2
- ≥ 1 internal link a `(/#cosa-fa)` o equivalente localizzato `(/<locale>/#cosa-fa)`

**Se 1+ fail**:
- Mostra all'utente quali sub-agent hanno fallito i check e perché
- Spawna retry SOLO sui sub-agent falliti, una sola volta, con feedback esplicito
- Se anche retry fallisce: ferma SENZA committare. Riporta i 5 file (alcuni magari OK) come "non committed, fix manually".

### 7. Aggiorna BLOG_TOPICS.md

**Solo se topic preso dalla coda E tutti i 5 file passano i check**:
- Edita `BLOG_TOPICS.md` rimuovendo la riga del topic usato

### 8. Commit + push

```bash
git add src/content/blog/it/<slug>.md src/content/blog/en/<slug>.md src/content/blog/es/<slug>.md src/content/blog/de/<slug>.md src/content/blog/fr/<slug>.md BLOG_TOPICS.md
git commit -m "draft(blog): <slug> (5 langs)"
git push
```

Footer commit: Co-Authored-By Claude.

### 9. Riporta all'utente

- I 5 path scritti
- Per ogni lingua: 1 risorsa locale citata + 1 angolo dell'articolo (presi dal report del sub-agent)
- URL preview: `https://dopahop-site.pages.dev/blog/<slug>/` (IT) e `https://dopahop-site.pages.dev/<locale>/blog/<slug>/` per le altre
- Reminder: "Articoli sono in `draft: true`. Edita IT (e EN se vuoi spot-check) liberamente. Quando pronti, cambia `draft: true → false` nei file e committa. Per le altre 3 lingue ti fidi del sub-agent madrelingua."

## Errori comuni da gestire

- Coda vuota → ferma e segnala
- File destinazione esistenti → conferma sovrascrittura
- Sub-agent restituisce file con frontmatter rotto → tratta come fail, retry
- git push fallisce → riporta errore esatto, NON ritentare auto

## Tempo atteso

~120-180 secondi (5 sub-agent paralleli + validation + commit + push).

## Nota strutturale

Questo comando sostituisce i precedenti `/draft-article` (solo IT) e `/translate-article` (4 traduzioni). Era pattern "scrivi IT bene, traduci in 4 lingue", che falliva sui topic con riferimenti localizzati (sistema sanitario, associazioni, leggi). Il nuovo pattern è "5 articoli nativi paralleli", più consistente per qualunque topic.
