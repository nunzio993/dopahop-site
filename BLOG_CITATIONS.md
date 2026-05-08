# BLOG_CITATIONS.md — Safelist paper ADHD verificati

Curated list of verified ADHD literature for blog citations. Auto-updated by `/auto-blog` (safelist-curator step after audit).

## Rules for writers

**MUST**:
- Cite ONLY entries from this file when naming `authors + journal + year` of a study
- For claims not covered by an entry: use generic phrasing ("la ricerca mostra…", "diverse meta-analisi indicano…") WITHOUT naming authors/journal/year
- Use ONLY numbers/percentages explicitly listed in an entry's `finding_key`. For other quantitative claims, use qualitative ranges ("una quota significativa", "la maggioranza", "una minoranza")
- Match the entry's `population` field (children/adolescents/adults). Don't apply a children's study to adults or vice versa.

**MUST NOT**:
- Invent or guess `authors`, `journal`, `year`, `volume`, `pages`, `pmid`, `doi`
- Cite a paper from this file but attribute to it a finding NOT in `finding_key`
- Extrapolate ranges ("up to X%") beyond what the entry says

When in doubt → use generic phrasing. Better cautious than wrong.

## Rules for safelist-curator (auto-update)

After audit completes for an article:
1. Parse all 5 audit reports (`PASS` claims with `Source checked` URL/PMID/DOI)
2. For each PASS that cites a paper (authors + journal + year): check if entry exists in this file (by PMID > DOI > authors+year)
3. If new: append entry under appropriate topic section, fill all fields possible from audit report. If `pmid`/`doi` missing → 1 WebSearch on PubMed to fill
4. If entry exists with conflicting `finding_key` (e.g., audit reports new population): add entry to "## Conflicts to review" section, do NOT overwrite
5. Update `verified` date on existing entries when re-confirmed by new audit

Entries are sorted alphabetically within each section by `key` for stable diffs.

---

## Working memory

### alderson-2013-wm-adults
- authors: "Alderson, R.M., Kasper, L.J., Hudec, K.L., Patros, C.H.G."
- year: 2013
- journal: "Neuropsychology"
- citation: "27(3), 287-302"
- pmid: 23688211
- doi: "10.1037/a0032371"
- population: "adulti"
- finding_key: "Meta-analisi su working memory in adulti ADHD. Effect size moderato. Deficit più marcati in compiti che richiedono manipolazione attiva (central executive) rispetto a semplice ripetizione/storage."
- use_for: ["working memory adulti ADHD", "central executive deficit adulti", "manipolazione vs storage"]
- verified: 2026-05-08

### baddeley-1974-wm-model
- authors: "Baddeley, A.D., Hitch, G.J."
- year: 1974
- journal: "Recent Advances in Learning and Motivation (Vol. 8, ed. G.A. Bower)"
- citation: "pp. 47-89, Academic Press"
- pmid: null
- doi: null
- population: "modello teorico"
- finding_key: "Modello originale della working memory con tre componenti: phonological loop (loop fonologico), visuospatial sketchpad (taccuino visuo-spaziale), central executive (esecutivo centrale)."
- use_for: ["modello working memory", "Baddeley & Hitch", "componenti memoria di lavoro"]
- verified: 2026-05-08

### baddeley-2000-episodic-buffer
- authors: "Baddeley, A.D."
- year: 2000
- journal: "Trends in Cognitive Sciences"
- citation: "4(11), 417-423"
- pmid: 11058819
- doi: "10.1016/s1364-6613(00)01538-2"
- population: "modello teorico"
- finding_key: "Aggiunta del quarto componente al modello Baddeley & Hitch (1974): episodic buffer, che integra informazioni multimodali e le lega alla memoria a lungo termine."
- use_for: ["episodic buffer", "Baddeley 2000", "estensione modello working memory"]
- verified: 2026-05-08

### kasper-2012-wm-children
- authors: "Kasper, L.J., Alderson, R.M., Hudec, K.L."
- year: 2012
- journal: "Clinical Psychology Review"
- citation: "32(7), 605-617"
- pmid: 22917740
- doi: "10.1016/j.cpr.2012.07.001"
- population: "BAMBINI (NON adulti — per adulti usa alderson-2013-wm-adults)"
- finding_key: "Meta-analisi su working memory in BAMBINI con ADHD. Effect size GRANDI ('large magnitude'). Demands on central executive sono moderatore significativo."
- use_for: ["working memory bambini ADHD", "moderatori effect size"]
- verified: 2026-05-08
- warning: "ATTENZIONE: questo è uno studio sui BAMBINI. NON citarlo per affermazioni sugli adulti."

### martinussen-2005-wm-children
- authors: "Martinussen, R., Hayden, J., Hogg-Johnson, S., Tannock, R."
- year: 2005
- journal: "Journal of the American Academy of Child & Adolescent Psychiatry"
- citation: "44(4), 377-384"
- pmid: 15782085
- doi: "10.1097/01.chi.0000153228.72591.73"
- population: "bambini/adolescenti"
- finding_key: "Meta-analisi su working memory in bambini/adolescenti con ADHD. Effect size: storage spaziale 0.85, central executive spaziale 1.06, storage verbale 0.47, central executive verbale 0.43. Deficit visuo-spaziali maggiori dei verbali. Indipendenti da QI generale."
- use_for: ["working memory bambini ADHD", "componente verbale vs visuo-spaziale", "indipendenza da QI"]
- verified: 2026-05-08

## Time perception / time blindness

### barkley-1997-self-regulation-time
- authors: "Barkley, R.A."
- year: 1997
- journal: "Psychological Bulletin"
- citation: "121(1), 65-94"
- pmid: 9000892
- doi: "10.1037/0033-2909.121.1.65"
- population: "modello teorico (bambini, esteso ad adulti)"
- finding_key: "ADHD come disturbo dell'autoregolazione attraverso il tempo. Concetti di 'temporal myopia', 'time horizon' ridotto, dicotomia 'now/not-now'. Inibizione comportamentale come deficit primario."
- use_for: ["time horizon Barkley", "temporal myopia", "now/not-now", "self-regulation across time"]
- verified: 2026-05-08

### noreika-2013-timing-review
- authors: "Noreika, V., Falter, C.M., Rubia, K."
- year: 2013
- journal: "Neuropsychologia"
- citation: "51(2), 235-266"
- pmid: 23022430
- doi: "10.1016/j.neuropsychologia.2012.09.036"
- population: "review (bambini, adolescenti, adulti)"
- finding_key: "Rassegna sistematica su timing deficits in ADHD attraverso milliseconds, seconds, minutes e intervalli più lunghi. Deficit consistenti in tre domini: motor timing, perceptual timing, temporal foresight. Disfunzioni nei circuiti fronto-striato-cerebellari e fronto-parietali."
- use_for: ["review timing ADHD", "circuiti fronto-striato-cerebellari", "deficit timing multidominio"]
- verified: 2026-05-08

### toplak-2005-time-discrimination
- authors: "Toplak, M.E., Tannock, R."
- year: 2005
- journal: "Journal of Abnormal Child Psychology"
- citation: "33(5), 639-654"
- pmid: 16195956
- doi: "10.1007/s10802-005-6743-6"
- population: "adolescenti (46 ADHD, 44 controlli)"
- finding_key: "Adolescenti con ADHD hanno soglie più alte (peggio) in tutti i compiti di duration discrimination rispetto ai controlli. Deficit replicati in molti studi successivi."
- use_for: ["duration discrimination ADHD", "soglie discriminazione temporale"]
- verified: 2026-05-08

### toplak-2006-temporal-processing-review
- authors: "Toplak, M.E., Dockstader, C., Tannock, R."
- year: 2006
- journal: "Journal of Neuroscience Methods"
- citation: "151(1), 15-29"
- pmid: 16378641
- doi: "10.1016/j.jneumeth.2005.09.018"
- population: "review (bambini, adolescenti, adulti)"
- finding_key: "Rassegna critica (NON meta-analisi formale) su temporal information processing in ADHD. Documenta deficit in duration discrimination, duration reproduction, finger tapping. Implicazioni di regioni cerebellari, basal ganglia, prefrontali."
- use_for: ["review temporal processing ADHD", "duration discrimination/reproduction", "neural circuits timing"]
- verified: 2026-05-08
- warning: "È REVIEW critica, NON meta-analisi statistica formale. Non chiamarla 'meta-analisi'."

## Multitasking / task-switching

### mark-2008-interrupted-work
- authors: "Mark, G., Gudith, D., Klocke, U."
- year: 2008
- journal: "CHI 2008 (Proceedings of the SIGCHI Conference on Human Factors in Computing Systems)"
- citation: "pp. 107-110"
- pmid: null
- doi: "10.1145/1357054.1357072"
- population: "adulti generali (popolazione lavorativa)"
- finding_key: "In media servono ~23 minuti e 15 secondi per tornare al livello di concentrazione originale dopo un'interruzione. Studio su lavoratori della conoscenza, non specifico ADHD."
- use_for: ["costo delle interruzioni", "23 minuti recupero attenzione", "knowledge worker interruptions"]
- verified: 2026-05-08

### ophir-2009-media-multitasking
- authors: "Ophir, E., Nass, C., Wagner, A.D."
- year: 2009
- journal: "Proceedings of the National Academy of Sciences (PNAS)"
- citation: "106(37), 15583-15587"
- pmid: 19706386
- doi: "10.1073/pnas.0903620106"
- population: "adulti generali (studenti universitari, NON ADHD)"
- finding_key: "Heavy media multitaskers performano peggio in compiti di cognitive control inclusi task-switching. Suggerisce che chi si percepisce buon multitasker tende a esserlo meno in test oggettivi. Studio su popolazione generale."
- use_for: ["heavy media multitaskers", "self-perception vs performance multitasking"]
- verified: 2026-05-08

### rubinstein-2001-task-switching
- authors: "Rubinstein, J.S., Meyer, D.E., Evans, J.E."
- year: 2001
- journal: "Journal of Experimental Psychology: Human Perception and Performance"
- citation: "27(4), 763-797"
- pmid: 11518143
- doi: "10.1037/0096-1523.27.4.763"
- population: "adulti generali (NON specifico ADHD)"
- finding_key: "Studio classico sui costi cognitivi del task-switching. Frasi attribuibili (via APA): 'mental blocks created by shifting between tasks can cost as much as 40 percent of someone's productive time'. Modello a due stadi: goal shifting + rule activation."
- use_for: ["task-switching cost", "40% productivity cost", "goal shifting rule activation"]
- verified: 2026-05-08
- warning: "Studio NON specifico per ADHD. Per applicare ad ADHD, usare formulazione 'amplificato in ADHD' senza attribuire il dato del 40% direttamente all'ADHD."

### watson-2010-supertaskers
- authors: "Watson, J.M., Strayer, D.L."
- year: 2010
- journal: "Psychonomic Bulletin & Review"
- citation: "17(4), 479-485"
- pmid: 20702865
- doi: "10.3758/PBR.17.4.479"
- population: "adulti generali (n=200)"
- finding_key: "~2.5% dei partecipanti ('supertaskers') non mostra dual-task decrement. La grande maggioranza paga un costo significativo nel multitasking."
- use_for: ["supertaskers ~2.5%", "rara assenza dual-task cost"]
- verified: 2026-05-08

## Hyperfocus

### ashinoff-2021-hyperfocus-review
- authors: "Ashinoff, B.K., Abu-Akel, A."
- year: 2021
- journal: "Psychological Research"
- citation: "85(1), 1-19"
- pmid: 31541305
- doi: "10.1007/s00426-019-01245-8"
- population: "review (ADHD, autismo, schizofrenia, flow)"
- finding_key: "Rassegna sistematica che propone una definizione operativa dell'iperfocus (4 criteri: engagement intenso, attenzione sostenuta, ridotta percezione di stimoli non-task, performance migliorata). Niente consensus precedente sulla definizione. Iperfocus come attenzione sostenuta paradossale che non si disengage facilmente."
- use_for: ["definizione operativa hyperfocus", "iperfocus paradossale", "no consensus definition"]
- verified: 2026-05-08

### hupfeld-2019-hyperfocus-adults
- authors: "Hupfeld, K.E., Abagis, T.R., Shah, P."
- year: 2019
- journal: "ADHD Attention Deficit and Hyperactivity Disorders"
- citation: "11(2), 191-208"
- pmid: 30267329
- doi: "10.1007/s12402-018-0272-y"
- population: "adulti (pilota n=251, replicazione n=372 — totale ~623)"
- finding_key: "Adulti con sintomatologia ADHD più alta riportano maggior frequenza e maggiori valori dispositivi di iperfocus, attraverso scuola, hobby e screen time. Non studio di 'intensità' o 'problematicità'."
- use_for: ["iperfocus adulti ADHD", "frequenza dispositiva", "settings school/hobbies/screen"]
- verified: 2026-05-08

### ozel-kizil-2016-hyperfocus-scale
- authors: "Ozel-Kizil, E.T., Kokurcan, A., Aksoy, U.M., Kanat, B.B., Sakarya, D., Bastug, G., Colak, B., Altunoz, U., Kirici, S., Demirbas, H., Oncu, B."
- year: 2016
- journal: "Research in Developmental Disabilities"
- citation: "59, 351-358"
- pmid: 27681531
- doi: "10.1016/j.ridd.2016.07.018"
- population: "adulti (53 ADHD stimulant-naive, 79 ADHD su stimolanti, 65 controlli)"
- finding_key: "Validazione della Hyperfocusing Scale in adulti ADHD. Entrambi i gruppi ADHD scorano significativamente più alto dei controlli (p<0.001). Iperfocus come dimensione separata dell'ADHD adulto."
- use_for: ["Hyperfocusing Scale", "iperfocus dimensione separata adulti ADHD"]
- verified: 2026-05-08
- warning: "Lo strumento si chiama 'Hyperfocusing Scale' (non 'ASRS-Hyperfocus Scale')."

## Implementation intentions / planning

### gollwitzer-2006-implementation-intentions
- authors: "Gollwitzer, P.M., Sheeran, P."
- year: 2006
- journal: "Advances in Experimental Social Psychology"
- citation: "Vol. 38, pp. 69-119"
- pmid: null
- doi: "10.1016/S0065-2601(06)38002-1"
- population: "meta-analisi (94 studi, popolazione generale)"
- finding_key: "Meta-analisi mostra che le implementation intentions ('quando X accade, farò Y') hanno effect size medio-grande (d=.65) sul raggiungimento degli obiettivi. Gli intenti difficili vengono completati ~3 volte più spesso con implementation intentions."
- use_for: ["implementation intentions", "Gollwitzer if-then planning", "d=.65 effect size", "x3 difficult goals"]
- verified: 2026-05-08

## Flow

### csikszentmihalyi-1975-flow
- authors: "Csikszentmihalyi, M."
- year: 1975
- journal: "Beyond Boredom and Anxiety (libro, Jossey-Bass)"
- citation: "ISBN: 978-0875892610"
- pmid: null
- doi: null
- population: "modello teorico"
- finding_key: "Concetto di 'flow' (esperienza ottimale) introdotto formalmente. Condizioni canoniche: bilancio sfida/abilità, obiettivi chiari, feedback immediato, fusione azione/coscienza, perdita autoconsapevolezza, distorsione del tempo."
- use_for: ["flow Csikszentmihalyi", "condizioni canoniche flow", "bilancio sfida-abilità"]
- verified: 2026-05-08
- warning: "DA NON CONFONDERE con hyperfocus ADHD: il flow è volontariamente innescato e termina rinfrancati; l'iperfocus ADHD è involontario e tipicamente termina in crash."

---

## Conflicts to review

(empty — populated automatically by safelist-curator when new audits report conflicting findings on existing entries)
