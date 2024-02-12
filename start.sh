#!/bin/bash
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export DOCS_DIR=../../../docs/docs

node app/packages/preview/start.js &

cd search
uvicorn server:app --reload
