---
description: Genera bozza articolo IT da topic in coda (BLOG_TOPICS.md)
---

# /draft-article

Genera la bozza italiana di un articolo blog DopaHop. Usa il primo topic non commentato di `BLOG_TOPICS.md` (oppure il topic specificato come argomento) e lo passa a un sub-agent IT madrelingua dedicato.

## Argomento

Se l'utente passa un argomento dopo il comando (es. `/draft-article ADHD e procrastinazione`), usa quello come topic invece di leggere dalla coda. In questo caso NON modificare `BLOG_TOPICS.md`.

Se l'utente non passa argomenti, leggi `BLOG_TOPICS.md` e usa il primo topic della lista.

## Esegui questi step

1. **Leggi i file di context**:
   - `BRAND_VOICE.md` (regole copy DopaHop)
   - `BLOG_SEO_TEMPLATE.md` (struttura SEO)
   - `BLOG_TOPICS.md` (coda topic — solo se nessun argomento è passato)

2. **Determina il topic**:
   - Se argomento passato dall'utente: usa quello, salta la coda
   - Altrimenti: prendi la prima riga di `BLOG_TOPICS.md` che inizia con `- ` (lista) e non con `<!--` (commento). Memorizza il testo completo del topic.
   - Se la coda è vuota, ferma l'esecuzione e dì all'utente "BLOG_TOPICS.md è vuoto. Aggiungi nuovi topic o passa un topic esplicito al comando."

3. **Calcola lo slug** dal topic scelto:
   - Lowercase
   - Rimuovi "ADHD e " all'inizio se presente
   - Rimuovi punteggiatura (`:`, `.`, `?`, `!`, `,`)
   - Sostituisci spazi e `/` con `-`
   - Rimuovi articoli/preposizioni superflue se lo slug supera 7 parole
   - Esempi: `"ADHD e procrastinazione: meccanismo reale"` → `procrastinazione-meccanismo-reale`

4. **Spawna un sub-agent IT madrelingua** in foreground (NON in background, perché ti serve l'output) con questo brief:

```
Sei un copywriter italiano madrelingua per DopaHop, un'app ADHD gentile per Android.

Il tuo task: scrivere la bozza completa di un articolo blog SEO-ottimizzato in italiano sul topic:
**[TOPIC]**

Devi rispettare:
1. Le regole copy in `D:/dopahop/site/BRAND_VOICE.md` (leggi quel file prima di iniziare).
2. La struttura SEO in `D:/dopahop/site/BLOG_SEO_TEMPLATE.md` (leggi anche quello).

OUTPUT: scrivi un file Markdown completo a:
`D:/dopahop/site/src/content/blog/it/[SLUG].md`

Il file deve contenere:
- Frontmatter completo (vedi BLOG_SEO_TEMPLATE.md sezione 1) con:
  - title (50-60 char con keyword principale all'inizio)
  - description (150-160 char)
  - excerpt (60-100 char)
  - pubDate: data di oggi in formato YYYY-MM-DD
  - tags: 2-4 tag rilevanti, primo sempre "ADHD"
  - locale: it
  - draft: true   ← IMPORTANTE: bozza, non pubblicata
  - author: "DopaHop Team"
  - translationKey: [SLUG]
- Body Markdown:
  - Intro 100-150 parole con keyword nei primi 100 char
  - 4-6 H2 sezioni
  - 1.000-1.500 parole totali
  - Almeno 1 internal link a un modulo DopaHop (es. `[il Pomodoro di DopaHop](/#cosa-fa)`)
  - Se topic clinico: cita 1-2 fonti autorevoli (CHADD, AIDAI, ISS, DSM-5)
  - Se topic clinico: chiudi con il disclaimer standard (vedi BLOG_SEO_TEMPLATE.md sezione 8)
  - Se applicable: aggiungi sezione "Domande frequenti" con 3-5 FAQ

VINCOLI assolutamente:
- Niente schwa, niente streak-shaming, niente toxic positivity
- Italiano naturale (non "tradotto da inglese")
- Niente claims clinici senza fonte
- Esempi concreti per ogni concetto astratto

Quando hai finito, conferma il path del file scritto e una breve sintesi (3-5 frasi) di cosa hai scritto. NON scrivere altri file oltre al `.md` dell'articolo.
```

Sostituisci `[TOPIC]` con il topic vero e `[SLUG]` con lo slug calcolato.

5. **Aspetta** che il sub-agent finisca. Quando ha scritto il file:

5b. **Validation step** — verifica che il file rispetti i minimi PRIMA di committare:

   - **Frontmatter YAML valido**: leggi il file, le prime ~15 righe devono essere tra `---` con `title`, `description`, `pubDate`, `locale: it`, `draft: true`, `translationKey` presenti.
   - **Title 30-65 char**: tollera leggera deviazione dal range 50-60.
   - **Description 130-170 char**: tollera leggera deviazione.
   - **Body word count**: conta le parole del body (escluso frontmatter). Deve essere **>= 1.000** (target 1.200-2.500). Se sotto 1.000 = fallimento.
   - **Almeno 4 H2** (linee che iniziano con `## `).
   - **Almeno 1 internal link** a `/#cosa-fa` o a `/blog/` (regex: `\]\(/(#cosa-fa|blog/)`).

   **Se uno di questi check fallisce:**
   - Mostra all'utente cosa è andato storto (es. "il sub-agent ha scritto solo 720 parole, target è 1.200+")
   - Spawna **una sola volta** un nuovo sub-agent IT madrelingua con feedback esplicito (es. "il file precedente aveva solo 720 parole e 2 H2. Riscrivilo rispettando: minimo 1.200 parole, almeno 4 H2, [...]")
   - Se anche il retry fallisce, ferma e segnala all'utente: "il sub-agent non riesce a generare un articolo che rispetta i minimi. Topic: '<topic>'. Forse il topic è troppo specifico o troppo generico — valuta di riformularlo o saltarlo."
   - In caso di fallimento doppio: NON rimuovere il topic da `BLOG_TOPICS.md`, NON committare.

6. **Se il topic è stato preso dalla coda** (nessun argomento esplicito) **E il check è passato**:
   - Edita `BLOG_TOPICS.md` rimuovendo la riga del topic usato (mantieni intatto il resto)

7. **Commit + push**:
   ```bash
   git add src/content/blog/it/<slug>.md BLOG_TOPICS.md
   git commit -m "draft(blog): <slug> (it)"
   git push
   ```

   Il commit message deve includere:
   - prefisso `draft(blog)`
   - slug
   - locale
   - footer Co-Authored-By Claude

8. **Riporta all'utente**:
   - Path del file scritto
   - 1 frase di summary del topic
   - Comando per la fase di traduzione: `/translate-article <slug>`
   - Reminder: "Edita la bozza, cambia `draft: true → false`, poi lancia il comando di traduzione."

## Errori comuni da gestire

- Se il sub-agent scrive il frontmatter sbagliato → controlla il file e segnala all'utente
- Se la coda topic è vuota → ferma e segnala
- Se il file `<slug>.md` esiste già → chiedi conferma prima di sovrascrivere (per non perdere editing precedenti)
- Se git push fallisce per qualsiasi ragione → riporta l'errore esatto, NON ritentare automaticamente

## Tempo atteso

~90-120 secondi (sub-agent IT + commit + push).
