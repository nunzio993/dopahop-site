---
description: Mostra l'elenco dei slash command custom del progetto DopaHop site con spiegazione in italiano. Lancia con `/comandi`.
---

# /comandi

Quando l'utente lancia `/comandi`, stampa esattamente questo output (tradurre in HTML/markdown formattato per il client):

---

# 📋 Comandi DopaHop site

Slash command custom disponibili in questo progetto. Lanciali da Claude Code aperto in `D:\dopahop\site\`.

---

## ✍️ Generazione articoli

### `/write-article [topic]`
Genera 5 articoli "fratelli" (uno per lingua: IT/EN/ES/DE/FR) sullo stesso topic, scritti da 5 sub-agent madrelingua paralleli. Ogni articolo cita risorse e percorsi sanitari del proprio paese.

- **Senza argomento** → prende il primo topic dalla coda `BLOG_TOPICS.md`
- **Con argomento** → usa quel topic specifico, non tocca la coda
- Output: 5 file con `draft: true` (invisibili sul sito finché non pubblichi). Commit + push automatici.
- Tempo: ~3 minuti

Esempi:
```
/write-article
/write-article "ADHD e ansia: comorbidità"
```

---

### `/auto-blog [count] [interval-days]`
**Pipeline completa end-to-end**. Genera N articoli, audita ognuno con fact-check via WebSearch, revisiona automaticamente i flag, schedula a intervalli regolari via `pubDate`. Zero touch.

- **count** (default 1) → quanti articoli generare
- **interval-days** (default 3) → giorni tra una pubblicazione e la successiva
- Continua dalla data dell'ultimo articolo schedulato (batch successivi non si sovrappongono)
- Output: N articoli con `draft: false`, pubDate staggerati. Filtro Astro li tiene invisibili finché data non arriva.
- Tempo: ~10-15 min per articolo. 30 articoli ≈ 5-7 ore (sub-agent paralleli, lasciali girare di sera/weekend)

Esempi:
```
/auto-blog                  # 1 articolo, pubDate oggi
/auto-blog 10               # 10 articoli, 1 ogni 3 giorni
/auto-blog 30 5             # 30 articoli, 1 ogni 5 giorni (copre 150 giorni)
/auto-blog 30 3             # 30 articoli, 1 ogni 3 giorni (copre 90 giorni)
```

---

## 🎯 SEO Strategy

### `/seo-triage [count] [--dry-run]`
**Strategic Tier 1 SEO triage**. 5 sub-agent madrelingua paralleli fanno SERP analysis nel proprio locale per ognuno dei topic in `BLOG_TOPICS.md`. Output: 5 ranking decouppati per locale + master priority queue aggregata. Zero costo $.

- **count** (opzionale) → processa solo prime N topic (utile per test)
- **--dry-run** (opzionale) → produce i 6 file output ma NON sovrascrive `BLOG_TOPICS.md`
- Output: `BLOG_TOPICS_<LOCALE>.md` × 5 + `BLOG_TOPICS_TRIAGED.md` + swap di `BLOG_TOPICS.md` (con backup `.bak`)
- Tempo: ~30-90 min per 246 topic
- Frequenza: ogni 2-3 mesi quando aggiungi >50 topic nuovi, o quando il DA cresce

Esempi:
```
/seo-triage                # triage completo, swap automatico
/seo-triage 30             # test su prime 30, swap
/seo-triage --dry-run      # tutti, NO swap (review manuale)
/seo-triage 30 --dry-run   # test su 30, NO swap
```

---

## 🚀 Pubblicazione manuale

### `/publish-article [slug]`
Flippa `draft: true` → `draft: false` su tutti i 5 file lingua di un articolo specifico. Commit + push.

- **Senza argomento** → auto-rileva. Se 1 solo articolo è in draft, lo usa. Se più di uno, ti chiede quale.
- **Con argomento** → usa lo slug specifico
- Tempo: ~5 secondi
- Bypassa Decap (alternativa più lenta ma browser-friendly)

Esempi:
```
/publish-article                                         # auto-detect
/publish-article adhd-procrastination-real-mechanism     # slug specifico
```

---

## 📖 Help

### `/comandi`
Questo comando. Mostra la lista che stai leggendo.

---

## 🎯 Workflow tipici

**Massimo throughput, batch grande (sfrutta token Claude Max)**:
```
/auto-blog 30 3
```
Lanciato di sera/weekend. Riempi 90 giorni di scheduling. Tu fai zero.

**SEO triage + batch ottimizzato (workflow consigliato per mercati non-EN)**:
```
/seo-triage              # 1 volta ogni 2-3 mesi
/auto-blog 30 3          # poi consuma dalla queue riordinata per priority
```
Il triage ri-ordina `BLOG_TOPICS.md` per chance reali di ranking nei 5 locali. `/auto-blog` continua a leggere dall'alto, ma ora i primi topic sono quelli con max score cross-locale.

**Controllo umano sull'IT prima di publish**:
```
/write-article
# poi editi src/content/blog/it/<slug>.md
/publish-article
```

**Pubblicare un articolo già in draft (es. dopo edit Decap)**:
```
/publish-article <slug>
```

**Pubblicazione da browser/mobile (senza terminale)**:
- Apri https://dopahop-site.pages.dev/admin/
- Login GitHub
- Apri ogni articolo in draft → flippa "Bozza" → Pubblica
- Decap committa direttamente, Cloudflare ribuilda

---

## 📂 File di riferimento

- `BLOG_TOPICS.md` → coda topic ADHD (~290 precaricati). Comandi consumano dall'alto.
- `BRAND_VOICE.md` → regole tono/copy DopaHop (input sub-agent writer)
- `BLOG_SEO_TEMPLATE.md` → struttura SEO articoli (input sub-agent writer)
- `WORKFLOW.md` → workflow settimanale + tabella livelli automazione

Per dettagli completi su ogni comando: leggi il `.md` corrispondente in `.claude/commands/`.

---

## 🔧 Setup pendente (da fare 1 volta)

Per attivare lo scheduling automatico (cron daily-rebuild che fa apparire articoli scheduled quando arriva la data):

1. **Cloudflare Dashboard** → Pages → `dopahop-site` → Settings → Builds & deployments → **Deploy hooks** → Create
2. Nome: `daily-rebuild`. Branch: `main`. Crea. Copia l'URL.
3. **GitHub** → repo `dopahop-site` → Settings → Secrets and variables → Actions → New secret
4. Nome: `CLOUDFLARE_DEPLOY_HOOK`. Valore: URL del hook.
5. Save.

Senza questo, `/auto-blog` funziona ma gli articoli scheduled per il futuro non escono automaticamente — devi triggerare rebuild a mano da Cloudflare quando vuoi.
