import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const serverDir = resolve(dist, 'server');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');
const { render, seoRoutes } = await import(pathToFileURL(resolve(serverDir, 'entry-server.js')));

const origin = 'https://www.ombatavia.com';
const person = {
  '@type': 'Person',
  '@id': `${origin}/#person`,
  name: 'Om Batavia',
  url: `${origin}/`,
  image: `${origin}/og-image.jpg`,
  jobTitle: 'AI systems builder and student entrepreneur',
  sameAs: [
    'https://www.linkedin.com/in/om-batavia-071bb0346/',
    'https://github.com/Om-Batavia',
    'https://www.instagram.com/omraces/'
  ]
};

function replaceMeta(html, route) {
  const url = `${origin}${route.path}`;
  const schema = route.path === '/'
    ? JSON.parse(html.match(/<script id="structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])
    : {
        '@context': 'https://schema.org',
        '@graph': [
          person,
          {
            '@type': 'WebPage',
            '@id': `${url}#webpage`,
            url,
            name: route.title,
            description: route.description,
            inLanguage: 'en-IN',
            author: { '@id': `${origin}/#person` },
            about: { '@type': 'SoftwareApplication', name: route.title.split(' — ')[0] },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
                { '@type': 'ListItem', position: 2, name: 'Projects', item: `${origin}/#projects` },
                { '@type': 'ListItem', position: 3, name: route.title.split(' — ')[0], item: url }
              ]
            }
          }
        ]
      };

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1${route.type}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${route.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${route.description}$2`)
    .replace(/<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="structured-data" type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);
}

for (const route of seoRoutes) {
  const file = route.path === '/' ? resolve(dist, 'index.html') : resolve(dist, route.path.slice(1), 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, replaceMeta(template, route));
}

await rm(serverDir, { recursive: true, force: true });
