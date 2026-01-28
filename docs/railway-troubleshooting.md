# Railway デプロイ詰まりポイント集（再発防止メモ）

このドキュメントは、`cron-larning` を Railway にデプロイする際に実際に発生した詰まりポイントと、その解決手順をまとめたリファレンスです。

## 前提（構成）
$body = '{"url":"https://example.com/rss","name":"example","enabled":true}'
curl.exe -X POST "https://cron-demo-production.up.railway.app/sources" -H "Content-Type: application/json" -d $body
- **DB**: Railway の Postgres サービス
- **API**: Railway のアプリサービス（例: `cron-demo`）
- **Worker**: Railway のアプリサービス（例: `cron-larning-worker`）

各サービスは独立してデプロイされますが、**DBのテーブル（スキーマ）はマイグレーションで作成される**ため、マイグレーションが未実行だと API/Worker は起動しても DB 操作でエラーになります。

---

## 1. 「Dockerfile Path が見つからない」問題

### 症状
- Railway のサービス Settings 画面で **Dockerfile Path** の入力欄が見つからない

### 原因
- **Build の Builder が Dockerfile になっていない**（Railpack Default など）

### 対処
- サービス → **Settings** → **Build** → **Builder** を `Dockerfile` に変更  
  すると **Dockerfile Path** が表示されることがあります。

---

## 2. Start Command のパス違い（`Cannot find module /app/dist/worker.js`）

### 症状
- `Error: Cannot find module '/app/dist/worker.js'`

### 原因
- NestJS のビルド出力が `dist/src/*.js` なのに、Start Command が `dist/*.js` を指している

### 対処
- Worker の Start Command を以下にする：

```bash
node dist/src/worker.js
```

（同様に API 側の起動が `dist/src/main.js` なら `node dist/src/main` を使用）

---

## 3. `DATABASE_URL` が無い / 間違っている（Prisma P1012 / Initialization Error）

### 症状
- `Environment variable not found: DATABASE_URL`
- Prisma 初期化エラー

### 原因
- Railway のサービス側（API/Worker）に `DATABASE_URL` が設定されていない

### 対処
- サービス（API/Worker）→ **Variables** に以下を設定
  - `NODE_ENV=production`
  - `DATABASE_URL=<PostgresサービスのDATABASE_URL>`

ポイント：
- Railway 内のサービスから Postgres へ接続する場合は、通常 **internal の `DATABASE_URL`**（例: `postgres.railway.internal`）を使います。

---

## 4. `relation "outbox" does not exist` / `You have no tables`

### 症状
- Worker ログで以下が出る：
  - `The table public.outbox does not exist`
  - `relation "outbox" does not exist`
  - `public.sources does not exist`
- Postgres → **Database** タブで `You have no tables` と表示される

### 原因
- **Prisma マイグレーション未実行**（DBにテーブルが作られていない）

### 対処（基本）
- `prisma migrate deploy` を実行してテーブルを作成する

### マイグレーションファイルの場所
- `backend/prisma/migrations/**/migration.sql`
  - `outbox` テーブルを含む初期マイグレーションがここに入っています

---

## 5. PowerShell で `railway run ...` が DB に繋がらない（P1001）

### 症状
- `P1001: Can't reach database server at postgres.railway.internal:5432`

### 原因
- `postgres.railway.internal` は **Railway 内部ネットワーク専用**
  - PC（ローカル）からは到達できません

### 対処（ローカルから migrate する場合）
1. Postgres サービス → **Variables** の **`DATABASE_PUBLIC_URL`**（TCP Proxy）を使う
2. PowerShell で一時的に `DATABASE_URL` を差し替えて実行する

```powershell
cd C:\Users\渡慶次裕太\dev\cron-larning\backend

# 一時的に PUBLIC の URL を入れる（値は Railway からコピー）
$env:DATABASE_URL="<DATABASE_PUBLIC_URL>"

# マイグレーション実行
npx prisma migrate deploy
```

#### 注意（料金）
- `DATABASE_PUBLIC_URL` は **外部公開（TCP Proxy）経由**なので、接続の仕方によっては **egress（外向き通信）課金**の注意が表示されます。
- 通常運用（Railway上のサービス→DB）は internal の `DATABASE_URL` を使うのが基本です。

#### PowerShellのよくあるミス
- 代入は `=`（`==` ではない）

---

## 6. Postgres のテーブル作成が成功したか確認する

### 確認方法（Railway UI）
- Postgres サービス → **Database** → **Tables** に以下が出ていればOK：
  - `sources`
  - `articles`
  - `fetch_jobs`
  - `outbox`
  - `_prisma_migrations`

---

## 7. 「有効なソースがありません」ログ

### 症状
- Worker / Cron のログに `有効なソースがありません`

### 意味
- `sources` テーブルに `enabled = true` のレコードが 0 件
  - まだRSS取得対象が登録されていない/無効になっている

### 次にやること
- `POST /sources` でソースを登録する（フロント or API）

---

## 8. API の Public URL と Private URL の違い

### Private Networking（内部向け）
- `cron-demo.railway.internal` のようなドメイン
- **Railway 内のサービス同士**の通信で使用
- PC の `curl` からは基本アクセス不可

### Public Networking（外部向け）
- `xxxx.up.railway.app` のようなドメイン
- **ブラウザ / PC から叩く**ときに使用

確認：
- API サービス → Settings → Networking → Public Networking に表示されるドメインがベースURL

---

## 9. PowerShell で `curl` がうまくいかない（JSONが壊れる）

### 症状
- `Expected property name or '}' in JSON at position 1`
- `curl: (3) unmatched close brace/bracket ...`

### 原因
- PowerShell のエスケープ/クォートの癖で JSON が壊れやすい

### 対処（推奨）
PowerShell では `Invoke-RestMethod` が安全です：

```powershell
$body = @{
  url = "https://example.com/rss"
  name = "example"
  enabled = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://<API_PUBLIC_DOMAIN>/sources" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

---

## 10. Cron 実行間隔（5分→1時間）でリソース消費を抑える

### 目的
- 5分ごと実行（1日288回）だと、無料枠/リソース消費が気になりやすい

### 対処
- `backend/src/cron/cron.service.ts` の `@Cron(...)` を 1時間間隔へ

（例：`CronExpression.EVERY_HOUR`）

---

## 最終チェックリスト

- [ ] Postgres の **Tables** に `outbox` などが表示される（マイグレーション済）
- [ ] Worker のログから `outbox does not exist` が消えている
- [ ] API の `/healthz` が `status: ok` を返す
- [ ] `sources` に有効なソースを登録できる（フロント or API）

