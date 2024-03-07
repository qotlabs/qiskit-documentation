'use strict';
const fs = require('fs');
const minify = require('minify');

fs.copyFile('./index.md', '../docs/docs/index.md', (err) => {
  if (err) throw err;
});
minify('custom.js').then((data) =>
  fs.writeFileSync(
    '../app/packages/preview/.next/static/chunks/custom.js',
    data
  )
);
