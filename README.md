# Directories

- `app` - application for serving documentation (from Docker image `qiskit/documentation` by IBM).
- `docs` - submodule with documentation content (GitHub repository).
- `search` - backend that implements searching.

# Environment
```bash
NODE_VERSION=18.14.2
YARN_VERSION=1.22.19
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
DOCS_DIR=../../docs
```