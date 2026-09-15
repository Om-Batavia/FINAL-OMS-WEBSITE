import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = [
  ['/', 'dist/index.html'],
  ['/projects/smart-invoices/', 'dist/projects/smart-invoices/index.html'],
  ['/projects/altself/', 'dist/projects/altself/index.html'],
  ['/projects/ai-lost-and-found/', 'dist/projects/ai-lost-and-found/index.html']
];

for (const [path, file] of pages) {
  const html = await readFile(resolve(root, file), 'utf8');
  assert(!html.includes('<div id="root"></div>'), `${path} must be prerendered`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path} must have one h1`);
  assert(html.includes(`<link rel="canonical" href="https://www.ombatavia.com${path}"`), `${path} canonical missing`);
  assert(/<meta name="description" content=".{80,180}"/.test(html), `${path} description length invalid`);
  const json = html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert(json, `${path} structured data missing`);
  JSON.parse(json[1]);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${path} has duplicate element IDs`);
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert(ids.includes(id), `${path} links to missing section #${id}`);
  }
}

const robots = await readFile(resolve(root, 'dist/robots.txt'), 'utf8');
const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8');
assert(robots.includes('Sitemap: https://www.ombatavia.com/sitemap.xml'));
for (const [path] of pages) assert(sitemap.includes(`<loc>https://www.ombatavia.com${path}</loc>`));
console.log(`SEO verification passed for ${pages.length} prerendered pages.`);
