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

## Diet / nutrition

### bloch-2011-omega3-meta
- authors: "Bloch, M.H., Qawasmi, A."
- year: 2011
- journal: "Journal of the American Academy of Child & Adolescent Psychiatry"
- citation: "50(10), 991-1000"
- pmid: 21961774
- doi: "10.1016/j.jaac.2011.06.008"
- population: "bambini (10 RCT, n=699)"
- finding_key: "Meta-analisi di 10 RCT su supplementazione di acidi grassi omega-3 in bambini con sintomi ADHD: effetto piccolo ma significativo nel migliorare i sintomi. Dosi più alte di EPA (eicosapentaenoic acid) correlate con maggiore efficacia. Modesta rispetto a opzioni farmacologiche standard, ma 'reasonably effective' considerando il profilo di sicurezza."
- use_for: ["omega-3 ADHD bambini", "EPA dose-response", "supplementazione meta-analisi", "effect size piccolo significativo"]
- verified: 2026-05-11

### hoover-1994-sugar-expectancy
- authors: "Hoover, D.W., Milich, R."
- year: 1994
- journal: "Journal of Abnormal Child Psychology"
- citation: "22(4), 501-515"
- pmid: 7963081
- doi: "10.1007/BF02168088"
- population: "bambini (35 maschi 5-7 anni) e loro madri"
- finding_key: "RCT in cui alle madri viene detto che i figli hanno ricevuto una dose alta di zucchero, mentre tutti i bambini ricevono aspartame placebo. Le madri nella condizione 'expectancy' percepiscono i figli come significativamente più iperattivi e mostrano maggiore controllo comportamentale (prossimità, critiche, attenzione). Effetto particolarmente marcato nelle madri cognitivamente rigide."
- use_for: ["expectancy effect zucchero", "percezione genitoriale iperattività", "placebo aspartame", "sugar myth"]
- verified: 2026-05-11

### nigg-2012-food-colorings-meta
- authors: "Nigg, J.T., Lewis, K., Edinger, T., Falk, M."
- year: 2012
- journal: "Journal of the American Academy of Child & Adolescent Psychiatry"
- citation: "51(1), 86-97.e8"
- pmid: 22176942
- doi: "10.1016/j.jaac.2011.10.015"
- population: "bambini (meta-analisi 24 studi)"
- finding_key: "Meta-analisi su coloranti alimentari sintetici e ADHD. Outcome riportati dai genitori mostrano beneficio modesto (g=0.18, 95% CI 0.08-0.24, p=.0007), che si indebolisce dopo correzione per publication bias. Studi di alta qualità con soli additivi coloranti: effetto affidabile (g=0.22). Circa l'8% dei bambini con ADHD può sperimentare sintomi connessi ai coloranti sintetici."
- use_for: ["coloranti alimentari ADHD", "additivi sintetici meta-analisi", "8% bambini sensibili", "publication bias coloranti"]
- verified: 2026-05-11

### rios-hernandez-2017-mediterranean
- authors: "Ríos-Hernández, A., Alda, J.A., Farran-Codina, A., Ferreira-García, E., Izquierdo-Pulido, M."
- year: 2017
- journal: "Pediatrics"
- citation: "139(2), e20162027"
- pmid: 28138007
- doi: "10.1542/peds.2016-2027"
- population: "bambini/adolescenti (60 ADHD newly diagnosed, 60 controlli — case-control)"
- finding_key: "Studio case-control su 120 bambini/adolescenti: minore aderenza alla dieta mediterranea associata a diagnosi ADHD. Ridotto consumo di frutta, verdura, pasta e riso correlato con ADHD; alto consumo di zuccheri e bevande cola e basso consumo di pesce grasso mostrano associazioni simili."
- use_for: ["dieta mediterranea ADHD", "pattern alimentari", "case-control bambini Spagna"]
- verified: 2026-05-11
- warning: "Studio CASE-CONTROL/cross-sectional, NON longitudinale: associazione, non causalità."

### wolraich-1995-sugar-meta
- authors: "Wolraich, M.L., Wilson, D.B., White, J.W."
- year: 1995
- journal: "JAMA"
- citation: "274(20), 1617-1621"
- pmid: 7474248
- doi: "10.1001/jama.1995.03530200053037"
- population: "bambini (meta-analisi 23 studi within-subject)"
- finding_key: "Meta-analisi di 23 studi within-subject design: lo zucchero NON influenza il comportamento o la performance cognitiva dei bambini. Effect size individuali da -0.14 a +0.30 in 14 costrutti, tutti gli intervalli di confidenza includono zero. Le credenze parentali derivano probabilmente da 'expectancy and common association' più che da effetti fisiologici reali."
- use_for: ["zucchero non causa iperattività", "sugar myth meta-analisi JAMA", "expectancy parentale", "zero effetto comportamentale"]
- verified: 2026-05-11

## Heritability

### faraone-2019-genetics-adhd
- authors: "Faraone, S.V., Larsson, H."
- year: 2019
- journal: "Molecular Psychiatry"
- citation: "24(4), 562-575"
- pmid: 29892054
- doi: "10.1038/s41380-018-0070-0"
- population: "review (genetica ADHD, evidenze familiari/gemellari/adozione + GWAS + CNV)"
- finding_key: "Review della genetica dell'ADHD. Ereditabilità alta ~74% da studi familiari, gemellari e adozione. Circa un terzo dell'ereditabilità deriva da componente poligenica con molte varianti comuni a piccolo effetto; copy number variants rare contribuiscono ulteriormente. GWAS ha implicato diversi loci a livello di significatività genome-wide."
- use_for: ["ereditabilità ADHD 74%", "genetica ADHD review", "componente poligenica", "GWAS ADHD", "studi gemellari familiari adozione"]
- verified: 2026-05-11

## Reward / dopamine

### plichta-2014-ventral-striatal
- authors: "Plichta, M.M., Scheres, A."
- year: 2014
- journal: "Neuroscience & Biobehavioral Reviews"
- citation: "38, 125-134"
- pmid: 23928090
- doi: "10.1016/j.neubiorev.2013.07.012"
- population: "review meta-analitica fMRI (ADHD vs popolazione sana)"
- finding_key: "Meta-analisi di studi fMRI su anticipazione di reward in ADHD: ipo-responsività ventro-striatale (VS) con effect size medio (Cohen's d=0.48-0.58). Paradosso: in soggetti sani, impulsività di tratto correla con MAGGIORE attivazione VS, mentre in ADHD è ridotta. Tre framework teorici proposti per riconciliare i pattern: U-rovesciata, moderatore genetico, modello unrelated."
- use_for: ["ipo-responsività ventro-striatale ADHD", "reward anticipation fMRI", "Cohen's d 0.48-0.58", "paradosso impulsività ADHD vs sani"]
- verified: 2026-05-11

## Executive function

### hervey-2004-adult-ef-meta
- authors: "Hervey, A.S., Epstein, J.N., Curry, J.F."
- year: 2004
- journal: "Neuropsychology"
- citation: "18(3), 485-503"
- pmid: 15291727
- doi: "10.1037/0894-4105.18.3.485"
- population: "adulti (meta-analisi 33 studi)"
- finding_key: "Meta-analisi di 33 studi su neuropsicologia degli adulti con ADHD. Deficit espressi in molteplici domini: attenzione, inibizione comportamentale, memoria. Performance normale nel simple reaction time, suggerendo impairment selettivo (non globale). Importanti deficit di inibizione comportamentale e working memory come meccanismi centrali."
- use_for: ["adulti ADHD neuropsicologia meta-analisi", "deficit attenzione inibizione memoria", "simple reaction time normale", "selettivo non globale"]
- verified: 2026-05-11

### willcutt-2005-ef-theory-meta
- authors: "Willcutt, E.G., Doyle, A.E., Nigg, J.T., Faraone, S.V., Pennington, B.F."
- year: 2005
- journal: "Biological Psychiatry"
- citation: "57(11), 1336-1346"
- pmid: 15950006
- doi: "10.1016/j.biopsych.2005.02.006"
- population: "meta-analisi 83 studi (3.734 ADHD vs 2.969 controlli, bambini/adolescenti/adulti)"
- finding_key: "Meta-analisi della validità della teoria executive function dell'ADHD. Effect size in range medio (0.46-0.69) su tutti i compiti EF. Effetti più forti su response inhibition, vigilance, working memory, planning. Deficit non spiegati da QI, achievement scolastico o sintomi di altri disturbi. Conclusione: deficit EF 'né necessari né sufficienti' a causare tutti i casi di ADHD — uno dei meccanismi, non l'unico."
- use_for: ["EF theory ADHD meta-analisi", "effect size 0.46-0.69 EF", "response inhibition vigilance WM planning", "EF non necessario non sufficiente", "Willcutt 2005"]
- verified: 2026-05-11

## Delay aversion / discounting

### jackson-2016-delay-discounting-meta
- authors: "Jackson, J.N.S., MacKillop, J."
- year: 2016
- journal: "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging"
- citation: "1(4), 316-325"
- pmid: 27722208
- doi: "10.1016/j.bpsc.2016.01.007"
- population: "meta-analisi 21 studi case-control (25 confronti, N=3.913)"
- finding_key: "Meta-analisi su monetary delay discounting in ADHD vs controlli. Effect size medio (Cohen's d=0.43, p<10⁻¹⁵): individui con ADHD mostrano discounting elevato di ricompense future. Nessuna variazione significativa per età dei partecipanti, ricompense reali vs ipotetiche, o presenza di comorbidità (CD/ODD)."
- use_for: ["delay discounting meta-analisi ADHD", "Cohen's d 0.43 discounting", "robusto attraverso età e setting", "monetary discounting case-control"]
- verified: 2026-05-11

### marx-2021-delay-aversion-meta
- authors: "Marx, I., Hacker, T., Yu, X., Cortese, S., Sonuga-Barke, E."
- year: 2021
- journal: "Journal of Attention Disorders"
- citation: "25(2), 171-187"
- pmid: 29806533
- doi: "10.1177/1087054718772138"
- population: "meta-analisi 37 confronti di gruppo (3.763 partecipanti, 53% ADHD)"
- finding_key: "Meta-analisi comparativa su scelta di piccole ricompense immediate vs grandi ritardate, paragonando simple choice paradigm (SCP, 22 confronti) e temporal discounting paradigm (TDP, 15 confronti). Effect size piccoli-medi in entrambi i paradigmi. Offrire ricompense reali (vs ipotetiche) nel SCP quasi raddoppia l'odds ratio per ADHD. Conclusione: avversione al ritardo più forte del normale + effetto demotivante di ricompense ipotetiche promuovono la scelta impulsiva."
- use_for: ["delay aversion meta-analisi", "small immediate vs large delayed", "SCP vs TDP", "ricompense reali vs ipotetiche", "Marx 2021"]
- verified: 2026-05-11

### sonuga-barke-2003-dual-pathway
- authors: "Sonuga-Barke, E.J.S."
- year: 2003
- journal: "Neuroscience & Biobehavioral Reviews"
- citation: "27(7), 593-604"
- pmid: 14624804
- doi: "10.1016/j.neubiorev.2003.08.005"
- population: "modello teorico (review concettuale)"
- finding_key: "Modello dual pathway dell'ADHD: due sotto-tipi psico-pato-fisiologici con diversi pathway dello sviluppo. (1) Pathway esecutivo — disturbi nei circuiti fronto-dorsale-striatali e branche dopaminergiche meso-corticali. (2) Pathway motivazionale/delay aversion — alterati processi di reward, circuiti fronto-ventro-striatali e branche meso-limbiche al nucleus accumbens."
- use_for: ["dual pathway model Sonuga-Barke", "delay aversion teoria", "due sotto-tipi ADHD", "fronto-dorsale vs fronto-ventrale", "circuiti reward ADHD"]
- verified: 2026-05-11

## Entrepreneurship

### wiklund-2017-adhd-entrepreneurship
- authors: "Wiklund, J., Yu, W., Tucker, R., Marino, L.D."
- year: 2017
- journal: "Journal of Business Venturing"
- citation: "32(6), 627-656"
- pmid: null
- doi: "10.1016/j.jbusvent.2017.07.002"
- population: "adulti (modello teorico + ipotesi su imprenditori)"
- finding_key: "Integrazione delle letterature ADHD, impulsività e imprenditorialità. Il tratto multifaceted di impulsività media la relazione tra sintomi ADHD e preferenze imprenditoriali, comportamento di start-up e performance. I sintomi di iperattività hanno un effetto positivo nel contesto imprenditoriale, principalmente attraverso la dimensione sensation-seeking dell'impulsività."
- use_for: ["ADHD imprenditorialità", "impulsività mediator", "sensation-seeking imprenditori", "Wiklund 2017", "iperattività effetto positivo entrepreneurship"]
- verified: 2026-05-11
- warning: "Pubblicazione in business journal — NO PMID (non in PubMed). Verifica via DOI/Journal of Business Venturing."

## ADHD in school / college

### dupaul-2009-college-adhd
- authors: "DuPaul, G.J., Weyandt, L.L., O'Dell, S.M., Varejao, M."
- year: 2009
- journal: "Journal of Attention Disorders"
- citation: "13(3), 234-250"
- pmid: 19620623
- doi: "10.1177/1087054709340650"
- population: "review (studenti universitari con ADHD)"
- finding_key: "Review su studenti universitari con ADHD. Prevalenza: 2-8% della popolazione universitaria riporta sintomi ADHD clinicamente significativi; almeno il 25% degli studenti con disabilità ha diagnosi ADHD. Evidenze consistenti di deficit accademici associati ad ADHD. Evidenze su funzionamento sociale, psicologico e neuropsicologico ancora poco chiare. ~7% degli studenti riporta uso non prescritto di stimolanti."
- use_for: ["college students ADHD prevalenza 2-8%", "deficit accademici università", "uso non prescritto stimolanti 7%", "DuPaul 2009 review"]
- verified: 2026-05-11
- warning: "Review del 2009 con limitazioni metodologiche segnalate dagli autori (campioni piccoli, diagnosi spesso non confermata). Per dati più recenti citare con cautela."

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
