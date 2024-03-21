const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    filename: 'app/packages/preview/.next/static/chunks/custom.js',
    path: path.resolve(__dirname, '..'),
  },
  module: {
    rules: [
      {
        test: /\.(md|mdx|ipynb)/,
        type: 'asset/resource',
        generator: {
          filename: 'docs/docs/[file]',
          publicPath: '[name]',
        }
      },
    ],
  },
};
