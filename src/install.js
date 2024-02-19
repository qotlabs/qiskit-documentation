"use strict";
const import_path = require("path");
const fs = require("fs");
const minify = require("minify");

const docsDirParam = process.env.DOCS_DIR ?? "docs";
const docs = (0, import_path.isAbsolute)(docsDirParam) ? docsDirParam : (0, import_path.join)(process.cwd(), docsDirParam);
const srcDirParam = process.env.SRC_DIR ?? "src";
const src = (0, import_path.isAbsolute)(srcDirParam) ? srcDirParam : (0, import_path.join)(process.cwd(), srcDirParam);
const chunksDirParam = process.env.CHUNKS_DIR ?? "app/app/packages/preview/.next/static/chunks";
const chunk = (0, import_path.isAbsolute)(chunksDirParam) ? chunksDirParam : (0, import_path.join)(process.cwd(), chunksDirParam);

fs.copyFile(`${src}/index.md`, `${docs}/index.md`, err => {
    if(err) throw err;
});


(minify(`${src}/custom.js`)).then(
    (data) => fs.writeFileSync(`${chunk}/custom.js`, data)
);
