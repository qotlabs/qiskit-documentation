#!/bin/bash
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export TURBO_TELEMETRY_DISABLED=1
export CONTENT_DIR=../../../content

node app/packages/preview/server.js
