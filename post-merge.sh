#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push 2>/dev/null || true
pnpm --filter @workspace/scripts run github-push
