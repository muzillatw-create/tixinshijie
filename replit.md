# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

- **圖片壓縮**：上傳的圖片若為 PNG 檔，一律用 ImageMagick 壓縮轉成 JPG（目標大小 200–500KB，quality ~80–85）。網站瀏覽不需要極高畫質，載入速度優先。

## Gotchas

- **開發環境與正式環境資料庫是分開的兩個獨立資料庫。** 透過開發環境後台（如管理 API）新增的內容（影片、商品等）**不會自動同步**到正式環境，必須手動同步，否則正式網站會缺資料。
- **新增影片後的同步流程**：
  1. 呼叫開發環境 `GET /api/videos?category=<分類>` 記錄目前資料（title、youtubeUrl、category、published）。
  2. 呼叫正式環境同一個 API，比對筆數與內容，找出正式環境缺少的項目。
  3. 對每一筆缺少的影片，呼叫正式環境的 `POST /api/admin/videos`（需帶 `key`=ADMIN_KEY，預設 `admin2026`，正式環境路徑為 `https://貼心世界.com/api/admin/videos`），欄位與開發環境一致。
  4. 重新呼叫正式環境 `GET /api/videos?category=<分類>` 確認筆數與內容一致。
  - 已提供可重複使用腳本 `scripts/src/sync-videos.ts`（`pnpm --filter @workspace/scripts run sync-videos -- <分類>`），會自動比對開發與正式環境差異並補上缺少的影片，需設定 `ADMIN_KEY` 環境變數。

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
