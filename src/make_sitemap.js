const filehound = require('filehound');
const fs = require('fs');
const xml = require('xmlbuilder2');

const URL_ORIGIN = process.env.QISKIT_HOST ?? 'https://example.com';
const CONTENT_DIR = '../content';
const SITEMAP_PATH = '../app/packages/preview/public/sitemap.xml';

function visitToc(toc, urls) {
  if (toc.url && toc.url[0] === '/') {
    urls.push(toc.url);
  }
  if (toc.children) {
    for (const child of toc.children) {
      visitToc(child, urls);
    }
  }
}

function urlToPath(root, url) {
  for (const ext of ['md', 'mdx', 'ipynb']) {
    const path = `${root}${url}.${ext}`;
    if (fs.existsSync(path)) {
      return path;
    }
  }
  for (const index of ['index.md', 'index.mdx']) {
    const path = `${root}${url}/${index}`;
    if (fs.existsSync(path)) {
      return path;
    }
  }
  console.log(`Cannot find path for URL ${url}`);
  return null;
}

const tocs = filehound
  .create()
  .match('_toc.json')
  .discard(/dev|-new|[0-9]\.[0-9]+/)
  .paths(CONTENT_DIR)
  .findSync();
let urls = ['/docs/', '/learning/'];
for (const toc of tocs) {
  visitToc(JSON.parse(fs.readFileSync(toc)), urls);
}

let sitemap = xml.create({encoding: 'UTF-8'}).ele('urlset', {
  xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
});

for (const url of urls) {
  const path = urlToPath(CONTENT_DIR, url);
  if (path === null) continue;
  const date = fs.statSync(path).mtime;

  let item = sitemap.ele('url');
  item.ele('loc').txt(`${URL_ORIGIN}${url}`);
  item.ele('lastmod').txt(date.toISOString());
  item.ele('changefreq').txt('weekly');
}

fs.writeFileSync(SITEMAP_PATH, sitemap.end());
