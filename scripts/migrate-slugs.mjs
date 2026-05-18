#!/usr/bin/env node
/**
 * Migrate scheduled-future articles to native slugs per locale.
 *
 * Reads SLUG_MIGRATION_MAPPING.tsv (translationKey + 5 native slugs per row)
 * 1. Renames files: <locale>/<english-key>.md → <locale>/<native-slug>.md
 * 2. Updates inter-blog links in ALL .md files (live + scheduled) to use
 *    the appropriate locale-native slug instead of the english key.
 * 3. translationKey in frontmatter is left untouched (stays english).
 *
 * Idempotent: re-running after success is a no-op (no english-key files
 * remain to rename, and links already point to native slugs).
 */

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BLOG_ROOT = path.join(ROOT, 'src', 'content', 'blog');
const TSV_PATH = path.join(ROOT, 'SLUG_MIGRATION_MAPPING.tsv');
const LOCALES = ['it', 'en', 'es', 'de', 'fr'];

function readMapping() {
  const lines = fs.readFileSync(TSV_PATH, 'utf8').split(/\r?\n/).filter(Boolean);
  const map = new Map(); // english-key → { it, en, es, de, fr }
  for (const line of lines) {
    const [key, slugIt, slugEn, slugEs, slugDe, slugFr] = line.split('\t');
    map.set(key, { it: slugIt, en: slugEn, es: slugEs, de: slugDe, fr: slugFr });
  }
  return map;
}

function renameFiles(map) {
  let renamed = 0;
  let skipped = 0;
  for (const [key, slugs] of map) {
    for (const locale of LOCALES) {
      const oldPath = path.join(BLOG_ROOT, locale, `${key}.md`);
      const newPath = path.join(BLOG_ROOT, locale, `${slugs[locale]}.md`);
      if (oldPath === newPath) {
        skipped++;
        continue;
      }
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        renamed++;
      } else if (fs.existsSync(newPath)) {
        skipped++;
      } else {
        console.warn(`[WARN] missing file: ${oldPath}`);
      }
    }
  }
  return { renamed, skipped };
}

function urlPrefixForLocale(locale) {
  return locale === 'it' ? '/blog/' : `/${locale}/blog/`;
}

function updateInterBlogLinks(map) {
  let filesScanned = 0;
  let replacementsMade = 0;
  for (const locale of LOCALES) {
    const dir = path.join(BLOG_ROOT, locale);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    const prefix = urlPrefixForLocale(locale);
    for (const file of files) {
      filesScanned++;
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      for (const [key, slugs] of map) {
        const target = slugs[locale];
        if (key === target) continue;
        const oldUrl = `${prefix}${key}/`;
        const newUrl = `${prefix}${target}/`;
        if (content.includes(oldUrl)) {
          // Count occurrences for stats
          const count = (content.match(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
          content = content.split(oldUrl).join(newUrl);
          replacementsMade += count;
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
    }
  }
  return { filesScanned, replacementsMade };
}

console.log('--- Slug migration ---');
const map = readMapping();
console.log(`Loaded ${map.size} translationKey → native-slug mappings`);

const renameStats = renameFiles(map);
console.log(`Renames: ${renameStats.renamed} done, ${renameStats.skipped} skipped (already in place)`);

const linkStats = updateInterBlogLinks(map);
console.log(`Inter-blog links: scanned ${linkStats.filesScanned} files, made ${linkStats.replacementsMade} replacements`);

console.log('Done.');
