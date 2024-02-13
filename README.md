# Directories

- `app` - application for serving documentation (from Docker image `qiskit/documentation` by IBM).
- `docs` - submodule with documentation content (GitHub repository).
- `search` - backend that implements searching. Search index is implemented via [Xapian](https://xapian.org/).

# Prerequisites
1. Clone and update the subrepositoty `docs`:
```bash
git submodule update --init
```
2. Install Node.js 18.14.2 and Yarn 1.22.19. On Ubuntu you can run the following command for this:
```bash
sudo snap install node --channel 18/stable --classic
```
3. Install Node.js modules:
```bash
NODE_ENV=production yarn install
```
4. Install dependencies for the search backend:
```bash
sudo apt install python3-xapian python3-fastapi uvicorn
```
5. Build search index by running `search/make_index.py`. The first indexing may take several minutes. Successive runs will proceed much faster because `make_index.py` does not reindex files that are already up-to-date (based on file modification time `mtime`).

# Launch
Run the application and the search backend from the repository root directory:
```bash
./app.sh
cd search && uvicorn server:app
```