#!/usr/bin/env node
// Build SEO triage output files from 5 raw locale tables.
// Reads scripts/triage-raw/<LOCALE>.md (markdown tables) and emits:
//   BLOG_TOPICS_<LOCALE>.md  (per-locale ranking, 5 files)
//   BLOG_TOPICS_TRIAGED.md   (master priority queue, aggregated)
//   BLOG_TOPICS.md           (overwritten with TRIAGED content; backup to .bak)

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const RAW_DIR = path.join(ROOT, 'scripts', 'triage-raw');
const LOCALES = ['IT', 'EN', 'ES', 'DE', 'FR'];
const TODAY = new Date().toISOString().slice(0, 10);

function parseRaw(locale) {
  const file = path.join(RAW_DIR, `${locale}.md`);
  const text = fs.readFileSync(file, 'utf8');
  const rows = {};
  for (const line of text.split('\n')) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map(c => c.trim());
    // [empty, #, topic, query, score, gap, empty]
    if (cells.length < 6) continue;
    const n = parseInt(cells[1], 10);
    if (!Number.isFinite(n)) continue;
    rows[n] = {
      n,
      topic: cells[2],
      query: cells[3],
      score: parseInt(cells[4], 10),
      gap: cells[5],
    };
  }
  return rows;
}

const data = {};
for (const loc of LOCALES) data[loc] = parseRaw(loc);

// Build unified per-topic structure
const topics = {};
for (let n = 1; n <= 246; n++) {
  const row = data.IT[n] || data.EN[n] || data.ES[n] || data.DE[n] || data.FR[n];
  if (!row) continue;
  topics[n] = {
    n,
    text: row.topic,
    scores: {},
    gaps: {},
    queries: {},
  };
  for (const loc of LOCALES) {
    const r = data[loc][n];
    topics[n].scores[loc] = r?.score ?? null;
    topics[n].gaps[loc] = r?.gap ?? '';
    topics[n].queries[loc] = r?.query ?? '';
  }
  const vals = LOCALES.map(l => topics[n].scores[l]).filter(v => Number.isFinite(v));
  topics[n].max = vals.length ? Math.max(...vals) : 0;
  topics[n].sum = vals.reduce((a, b) => a + b, 0);
  topics[n].leader = LOCALES.find(l => topics[n].scores[l] === topics[n].max) || '?';
}

const allTopics = Object.values(topics);

// Stats per locale
const stats = {};
for (const loc of LOCALES) {
  const scores = allTopics.map(t => t.scores[loc]).filter(v => Number.isFinite(v)).sort((a, b) => a - b);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const median = scores.length % 2 ? scores[(scores.length - 1) / 2] : (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2;
  stats[loc] = {
    count: scores.length,
    over70: scores.filter(s => s >= 70).length,
    over80: scores.filter(s => s >= 80).length,
    mean: mean.toFixed(1),
    median,
  };
}

// === Write per-locale files ===
for (const loc of LOCALES) {
  const sorted = [...allTopics].sort((a, b) => (b.scores[loc] ?? -1) - (a.scores[loc] ?? -1));
  const lines = [
    `# Blog topics queue — DopaHop (ranked per locale ${loc})`,
    '',
    `Output di \`/seo-triage\` eseguito ${TODAY}. NON modificare manualmente —`,
    `rigenera con \`/seo-triage\` quando aggiungi topic o quando il DA del sito cresce.`,
    '',
    `Ogni riga: \`rank | score | topic | query | gap competitivo locale\`.`,
    '',
    `**Stats ${loc}**: ${stats[loc].count} topic | score ≥70: ${stats[loc].over70} | score ≥80: ${stats[loc].over80} | mean: ${stats[loc].mean} | median: ${stats[loc].median}`,
    '',
    '---',
    '',
    `| Rank | # | Score | Topic | Query (${loc}) | Gap (${loc}) |`,
    `|------|---|-------|-------|---------------|---------------|`,
  ];
  sorted.forEach((t, idx) => {
    lines.push(`| ${idx + 1} | ${t.n} | ${t.scores[loc] ?? '—'} | ${t.text} | ${t.queries[loc]} | ${t.gaps[loc]} |`);
  });
  const out = path.join(ROOT, `BLOG_TOPICS_${loc}.md`);
  fs.writeFileSync(out, lines.join('\n') + '\n');
  console.log(`✓ ${out}`);
}

// === Write master TRIAGED file ===
const masterSorted = [...allTopics].sort((a, b) => b.max - a.max || b.sum - a.sum);
const masterLines = [
  `# Blog topics queue — DopaHop (master priority aggregato cross-locale)`,
  '',
  `Output di \`/seo-triage\` eseguito ${TODAY}.`,
  `Ranking aggregato: priority = MAX(score) tra i 5 locali, tie-break per somma totale.`,
  `Usato da \`/auto-blog\` come ordine di pick del prossimo topic.`,
  '',
  `Ogni riga ha 5 score visibili per locale [IT EN ES DE FR] — per scegliere il prossimo topic in modo informato.`,
  '',
  '---',
  '',
];
masterSorted.forEach(t => {
  const s = t.scores;
  const scoreStr = `[IT:${s.IT ?? '—'} EN:${s.EN ?? '—'} ES:${s.ES ?? '—'} DE:${s.DE ?? '—'} FR:${s.FR ?? '—'}]`;
  masterLines.push(`- ${t.text}  ${scoreStr}`);
});
const masterOut = path.join(ROOT, 'BLOG_TOPICS_TRIAGED.md');
fs.writeFileSync(masterOut, masterLines.join('\n') + '\n');
console.log(`✓ ${masterOut}`);

// === Backup BLOG_TOPICS.md and swap ===
const origPath = path.join(ROOT, 'BLOG_TOPICS.md');
const bakPath = path.join(ROOT, 'BLOG_TOPICS.md.bak');
if (fs.existsSync(origPath)) {
  fs.copyFileSync(origPath, bakPath);
  console.log(`✓ backup → ${bakPath}`);
}
// Build new BLOG_TOPICS.md: preserve original header (lines 1-7), then sorted topics
const origText = fs.existsSync(origPath) ? fs.readFileSync(origPath, 'utf8') : '';
const origLines = origText.split('\n');
const headerEnd = origLines.findIndex(l => l.trim() === '---');
const header = headerEnd >= 0 ? origLines.slice(0, headerEnd + 1).join('\n') : `# Blog topics queue — DopaHop\n\nCoda di topic per articoli del blog.\n\n---`;
const newQueueLines = [
  header,
  '',
  `<!-- Riordinata da /seo-triage il ${TODAY}. Master con score visibili in BLOG_TOPICS_TRIAGED.md. -->`,
  '',
];
masterSorted.forEach(t => {
  newQueueLines.push(`- ${t.text}`);
});
fs.writeFileSync(origPath, newQueueLines.join('\n') + '\n');
console.log(`✓ ${origPath} (riordinato)`);

// === Print final report ===
console.log('\n=== /seo-triage complete ===\n');
console.log('Top 10 priority globale:');
masterSorted.slice(0, 10).forEach((t, i) => {
  console.log(`  ${i + 1}. [${t.max}] ${t.text}  (leader: ${t.leader})`);
});
console.log('\nDistribuzione score per locale:');
console.log('Locale | Count | ≥70 | ≥80 | Mean | Median');
console.log('-------|-------|-----|-----|------|-------');
for (const loc of LOCALES) {
  const s = stats[loc];
  console.log(`${loc}     | ${s.count}   | ${s.over70.toString().padStart(3)} | ${s.over80.toString().padStart(3)} | ${s.mean} | ${s.median}`);
}
console.log('\nFile generati:');
LOCALES.forEach(loc => console.log(`  BLOG_TOPICS_${loc}.md`));
console.log('  BLOG_TOPICS_TRIAGED.md (master)');
console.log('  BLOG_TOPICS.md (riordinato, backup in BLOG_TOPICS.md.bak)');
