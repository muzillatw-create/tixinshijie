---
name: Production vs dev database
description: Dev and production PostgreSQL databases are separate instances; data added in dev does not appear in production automatically.
---

# Production vs Dev Database

Dev and production databases are **separate**. Records added via dev DB (e.g. `executeSql` or dev API calls) will NOT appear on the production site.

**Why:** Replit provisions a separate PostgreSQL instance for the deployed production environment.

**Production URL:** `https://tie-xin-shi-jie-wang-ye.replit.app`

**How to apply:** When the user reports missing videos/articles on the production site that exist in dev, use the production admin API to add them directly:

```bash
curl -X POST "https://tie-xin-shi-jie-wang-ye.replit.app/api/admin/videos" \
  -H "Content-Type: application/json" \
  -d '{"key":"admin2026","title":"...","youtubeUrl":"...","category":"happiness","published":true}'

curl -X POST "https://tie-xin-shi-jie-wang-ye.replit.app/api/admin/articles" \
  -H "Content-Type: application/json" \
  -d '{"key":"admin2026","category":"eat","title":"...","date":"...","heroImage":"...","summary":"...","content":"..."}'
```

Admin key: `admin2026`
