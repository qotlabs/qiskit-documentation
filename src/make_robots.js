const fs = require('fs');

const HOST = process.env.QISKIT_HOST ?? 'https://example.com';
const ROBOTS_PATH = '../app/packages/preview/public/robots.txt';

const robots =
`User-agent: *
Allow: /
Host: ${HOST}
Sitemap: ${HOST}/sitemap.xml

Disallow: /docs/api/qiskit/0.*
Disallow: /docs/api/qiskit/1.*
Disallow: /docs/api/qiskit/dev

Disallow: /docs/api/qiskit-addon-cutting/0.*

Disallow: /docs/api/qiskit-ibm-runtime/0.*
Disallow: /docs/api/qiskit-ibm-runtime/dev

Disallow: /docs/api/qiskit-c/2.*
Disallow: /docs/api/qiskit-c/dev

Disallow: /docs/api/qiskit-addon-sqd/0.*

Disallow: /docs/api/qiskit-ibm-transpiler/0.*

Disallow: /docs/api/qiskit-addon-mpf/0.*

Disallow: /docs/api/qiskit-addon-obp/0.*

Disallow: /docs/api/qiskit-addon-aqc/0.*

Disallow: /docs/api/qiskit-addon-utils/0.*
`;

fs.writeFileSync(ROBOTS_PATH, robots)
