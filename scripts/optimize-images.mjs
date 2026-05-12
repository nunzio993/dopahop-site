// One-off image optimizer: generates .webp (and .avif) siblings for PNG/JPG files
// in public/img/, preserving the originals for URL/OG/JSON-LD references.
// Run: node scripts/optimize-images.mjs

import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const IMG_ROOT = new URL('../public/img/', import.meta.url).pathname.replace(/^\/(\w:)/, '$1');
const SUPPORTED = new Set(['.png', '.jpg', '.jpeg']);
const WEBP_QUALITY = 82;
const AVIF_QUALITY = 60;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function optimizeOne(path) {
  const ext = extname(path).toLowerCase();
  if (!SUPPORTED.has(ext)) return null;
  const base = path.slice(0, -ext.length);
  const webpPath = `${base}.webp`;
  const avifPath = `${base}.avif`;
  const origSize = (await stat(path)).size;

  let webpSize = null;
  let avifSize = null;

  if (!existsSync(webpPath)) {
    await sharp(path).webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath);
    webpSize = (await stat(webpPath)).size;
  } else {
    webpSize = (await stat(webpPath)).size;
  }

  if (!existsSync(avifPath)) {
    try {
      await sharp(path).avif({ quality: AVIF_QUALITY, effort: 6 }).toFile(avifPath);
      avifSize = (await stat(avifPath)).size;
    } catch (e) {
      // avif optional; skip on failure
    }
  } else {
    avifSize = (await stat(avifPath)).size;
  }

  return {
    file: path.replace(IMG_ROOT, ''),
    orig: origSize,
    webp: webpSize,
    avif: avifSize,
  };
}

function fmtKb(bytes) {
  return bytes == null ? '   -' : `${(bytes / 1024).toFixed(1).padStart(5)} KB`;
}

const results = [];
for await (const file of walk(IMG_ROOT)) {
  const r = await optimizeOne(file);
  if (r) results.push(r);
}

console.log('\nFile'.padEnd(36) + 'orig'.padStart(10) + 'webp'.padStart(11) + 'avif'.padStart(11) + '  savings');
console.log('-'.repeat(80));
let totalOrig = 0,
  totalBest = 0;
for (const r of results) {
  totalOrig += r.orig;
  const best = Math.min(r.webp ?? r.orig, r.avif ?? r.orig);
  totalBest += best;
  const pct = (((r.orig - best) / r.orig) * 100).toFixed(0);
  console.log(
    r.file.padEnd(36) +
      fmtKb(r.orig).padStart(10) +
      fmtKb(r.webp).padStart(11) +
      fmtKb(r.avif).padStart(11) +
      `  -${pct}%`.padStart(8),
  );
}
console.log('-'.repeat(80));
const totalPct = (((totalOrig - totalBest) / totalOrig) * 100).toFixed(0);
console.log(
  'TOTAL'.padEnd(36) +
    fmtKb(totalOrig).padStart(10) +
    ' '.repeat(11) +
    fmtKb(totalBest).padStart(11) +
    `  -${totalPct}%`.padStart(8),
);
