const fs = require('fs');

const HOST = process.env.QISKIT_HOST ?? 'https://example.com';
const ROBOTS_PATH = '../app/packages/preview/public/robots.txt';

const robots =
`User-agent: *
Allow: /
Host: ${HOST}
Sitemap: ${HOST}/sitemap.xml

Disallow: /api/qiskit/0.*
Disallow: /api/qiskit/1.*
Disallow: /api/qiskit/dev

Disallow: /api/qiskit-ibm-runtime/0.*
Disallow: /api/qiskit-ibm-runtime/dev

Disallow: /api/qiskit-ibm-transpiler/0.*
Disallow: /api/qiskit-ibm-transpiler/dev
`;

fs.writeFileSync(ROBOTS_PATH, robots)
