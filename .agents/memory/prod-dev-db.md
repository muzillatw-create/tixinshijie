---
name: Production vs dev database
description: Dev and production PostgreSQL databases are separate instances; data added in dev does not appear in production automatically.
---

# Production vs Dev Database

Dev and production databases are **separate**. Records added via dev DB (e.g. `executeSql` or dev API calls) will NOT appear on the production site.

**Why:** Replit provisions a separate PostgreSQL instance for the deployed production environment.

**Production URL:** `https://xn--rhqt44buwpwnv.com` (punycode for 貼心世界.com — the custom domain now used, superseding any older `*.replit.app` URL).

**How to apply:** When the user reports missing videos/articles on the production site that exist in dev:
1. Compare `GET /api/videos?category=<x>` (or the equivalent articles endpoint) between dev and prod to confirm the exact diff before writing anything.
2. Use the production admin API to add the missing records directly, or run the reusable script `pnpm --filter @workspace/scripts run sync-videos -- <category>` (see `scripts/src/sync-videos.ts`), which diffs by `youtubeUrl` and POSTs anything missing.

```bash
curl -X POST "https://xn--rhqt44buwpwnv.com/api/admin/videos" \
  -H "Content-Type: application/json" \
  -d '{"key":"admin2026","title":"...","youtubeUrl":"...","category":"happiness","published":true}'

curl -X POST "https://xn--rhqt44buwpwnv.com/api/admin/articles" \
  -H "Content-Type: application/json" \
  -d '{"key":"admin2026","category":"eat","title":"...","date":"...","heroImage":"...","summary":"...","content":"..."}'
```

Admin key: `admin2026` (this is the route's hardcoded fallback when the `ADMIN_KEY` env var isn't set — check `artifacts/api-server/src/routes/admin.ts` if it stops working).
