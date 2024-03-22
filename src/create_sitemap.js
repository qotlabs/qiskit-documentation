const filehound = require('filehound');
const fs = require('fs');
const xml = require('xmlbuilder2');

const JSON_EXT = 'json';
const SOURCE_DIR = '../docs/docs';
const FILE = '_toc.json';
const VERSION_REGEX = new RegExp(/^$|dev|-new|[0-9]\.[0-9]+/);
const ROOT = '/';
const URL = 'https://qiskit.qotlabs.org';
const results = [''];
const extensions = Object.freeze(['md', 'mdx', 'ipynb']);
const indexes = Object.freeze(['index.md', 'index.mdx']);
const XMLNS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const WEEKLY_UPDATE = 'weekly';
const XML_PATH = '../app/packages/preview/public/sitemap.xml';

const visitToc = (toc, results) => {
  if (toc.url && toc.url[0] === ROOT) {
    results.push(toc.url);
  }
  if (toc.children) {
    toc.children.forEach((child) => visitToc(child, results));
  }
};

const searchTocFiles = filehound
  .create()
  .ext(JSON_EXT)
  .paths(SOURCE_DIR)
  .findSync((err) => {
    if (err) {
      throw err;
    }
  })
  .filter((item) => item.match(FILE) && !item.match(VERSION_REGEX));

const urlToPath = (root, url) => {
  let filePath = '';
  extensions.forEach((ext) => {
    let path = `${root}${url}.${ext}`;
    if (fs.existsSync(path)) {
      filePath = path;
    }
  });
  indexes.forEach((index) => {
    let path = `${root}${url}/${index}`;
    if (fs.existsSync(path)) {
      filePath = path;
    }
  });
  if (!filePath) {
    throw new Error(`Cannot find path for URL ${url}`);
  }
  return filePath;
};

const formatDate = (date = new Date()) => {
  const year = date.toLocaleString('default', {year: 'numeric'});
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', {day: '2-digit'});
  return [year, month, day].join('-');
};

const xmlFile = xml.create().ele('urlset', {
  xmlns: XMLNS,
});
searchTocFiles.forEach((file) =>
  visitToc(JSON.parse(fs.readFileSync(file)), results)
);
results.forEach((result) => {
  const item = xmlFile.ele('url');
  const loc = item.ele('loc');
  loc.txt(`${URL}${result}`);
  const lastmod = item.ele('lastmod');
  const path = urlToPath(SOURCE_DIR, result);
  const date = fs.statSync(path).mtime;
  lastmod.txt(formatDate(date));
  const changefreq = item.ele('changefreq');
  changefreq.txt(WEEKLY_UPDATE);
});

fs.writeFileSync(XML_PATH, xmlFile.end({prettyPrint: true}));
