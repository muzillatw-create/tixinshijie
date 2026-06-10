---
name: Expo workflow port health check workaround
description: Replit health checker can't detect new workflow ports; only API server (8080) works. Use configureWorkflow without waitForPort for Metro.
---

# Expo Metro Port Health Check Issue

## The Rule
Never use `restart_workflow` or `configureWorkflow` with `waitForPort` for the Expo/Metro server in this environment. The Replit workflow health checker cannot detect new workflow ports (only port 8080 from the pre-existing API server passes).

**Why:** The health checker appears to check from an external vantage point where only port 8080 is exposed. All other ports (3000, 5000, 8008, 9000) were tested — all fail even when confirmed open and serving from inside the container.

## How to Apply
- Metro runs via the "Metro Bundler" workflow (configureWorkflow, no waitForPort)
- Command: `PORT=5000 BASE_PATH=/mobile/ EXPO_PACKAGER_PROXY_URL=https://$REPLIT_EXPO_DEV_DOMAIN EXPO_PUBLIC_DOMAIN=$REPLIT_DEV_DOMAIN EXPO_PUBLIC_REPL_ID=$REPL_ID REACT_NATIVE_PACKAGER_HOSTNAME=$REPLIT_DEV_DOMAIN pnpm --filter @workspace/tixinshijie-mobile run dev`
- The Expo artifact workflow (`artifacts/tixinshijie-mobile: expo`) runs an echo command (exits cleanly) — this is intentional
- The artifact.toml keeps `localPort = 5000` so the proxy routes `/mobile/` to Metro
- `router = "expo-domain"` is set in artifact.toml for the QR code preview
