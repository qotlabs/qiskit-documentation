# Qiskit documentation mirror

This project is a [Qiskit](https://github.com/Qiskit/qiskit) documentation mirror site. It is hosted at [qiskit.qotlabs.org](https://qiskit.qotlabs.org).

The [original IBM Quantum site](https://docs.quantum.ibm.com/) serving the documentation is prohibited in certain countries. Since Qiskit and its documentation are open source, the idea is to provide the community with the documentation mirror without geo-blocking restrictions.

Source code is largely based on the documentation-preview Docker image by IBM. Some custom modifications were made to add navigation panels and search capabilities lacking in the Docker preview.

# Directories

- `app` – main application for serving documentation. It is based on the Docker image [qiskit/documentation](https://hub.docker.com/r/qiskit/documentation) by IBM.
- `docs` – submodule with documentation content. It points to the official Qiskit GitHub repository [Qiskit/documentation](https://github.com/Qiskit/documentation).
- `search` – backend that implements searching. Search index is realized via [Xapian](https://xapian.org/).
- `src` – additional modifications for the main application that are absent in the Docker image.

# Prerequisites

1. Clone and update the subrepositoty `docs`:
```bash
git submodule update --init
```
2. Install Node.js 18.20.3 and Yarn 1.22.19. On Ubuntu, you can run the following command for this:
```bash
sudo snap install node --channel 18/stable --classic
```
3. Install Node.js modules in `app/` and `src/` directories:
```bash
NODE_ENV=production yarn install --cwd app
yarn install --cwd src
```
4. Build sources from the `src/` directory by executing `yarn run build`.
5. Install dependencies for the search backend:
```bash
sudo apt install python3-xapian python3-fastapi uvicorn
```
6. Build a search index by running `search/make_index.py`. The first indexing may take several minutes. Successive runs will proceed much faster because `make_index.py` does not reindex files that are already up-to-date (based on file modification time `mtime`).

# Launch

Run the application and the search backend from the repository root directory:
```bash
./app.sh
cd search && uvicorn server:app
```

# License

Different parts of the project are subject to different copyrights and license agreements.
- `app` – copyright IBM, non-exclusive license according to [Docker Terms of Service](https://www.docker.com/legal/docker-terms-service/), paragraph 6.4.
- `docs` – copyright IBM, the Apache License Version 2.0.
- `search` and `src` – copyright Quantum Optical Technologies Laboratories, GNU General Public License v3.0 or later.
