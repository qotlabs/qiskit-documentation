# Directories

- `app` - application for serving documentation (from Docker image `qiskit/documentation` by IBM).
- `docs` - submodule with documentation content (GitHub repository).
- `search` - backend that implements searching.

# Prerequisites
Clone and update the subrepositoty `docs`:
```bash
git submodule update --init
```
Install Node.js 18.14.2 and Yarn 1.22.19. On Ubuntu you can run the following command for this:
```bash
sudo snap install node --channel 18/stable --classic
```
Ensure the following environment:
```bash
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export DOCS_DIR=../../../docs/docs
```
Run `yarn install` to install dependencies.

# Launch
Ensure the same environment as in [Prerequisites](#Prerequisites) section and run the application from the repository root directory:
```bash
node app/packages/preview/start.js
```