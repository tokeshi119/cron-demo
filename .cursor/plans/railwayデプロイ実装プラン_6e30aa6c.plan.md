---
name: Railwayデプロイ実装プラン
overview: RailwayでRSS記事取得システムを本番環境にデプロイするための包括的なプラン。PostgreSQL、バックエンドAPI、ワーカー、フロントエンドのデプロイ手順と設定を網羅。
todos:
  - id: prep-1
    content: GitHubリポジトリにプッシュ（DEPLOY.md、railway.json、.env.exampleを含む）
    status: pending
  - id: prep-2
    content: Railwayアカウント作成・ログイン
    status: pending
  - id: db-1
    content: RailwayでPostgreSQLデータベースを作成し、DATABASE_URLを確認
    status: pending
  - id: api-1
    content: "RailwayでバックエンドAPIサービスを作成（Root Directory: backend）"
    status: pending
  - id: api-2
    content: APIサービスの環境変数を設定（NODE_ENV, DATABASE_URL, PORT, FRONTEND_URL）
    status: pending
  - id: api-3
    content: APIサービスのデプロイを開始し、ビルドログを確認
    status: pending
  - id: migrate-1
    content: Railway CLIをインストールしてログイン
    status: pending
  - id: migrate-2
    content: Prismaマイグレーションを実行（railway run npx prisma migrate deploy）
    status: pending
  - id: worker-1
    content: "Railwayでワーカーサービスを作成（Root Directory: backend）"
    status: pending
  - id: worker-2
    content: ワーカーサービスの環境変数を設定（NODE_ENV, DATABASE_URL）
    status: pending
  - id: worker-3
    content: ワーカーサービスのStart Commandを設定（node dist/worker.js）
    status: pending
  - id: worker-4
    content: ワーカーサービスのデプロイを開始し、ログを確認
    status: pending
  - id: frontend-1
    content: Vercelでプロジェクトを作成（GitHubリポジトリをインポート）
    status: pending
  - id: frontend-2
    content: "Vercelの設定（Root Directory: frontend, Framework: Next.js）"
    status: pending
  - id: frontend-3
    content: Vercelの環境変数を設定（NEXT_PUBLIC_API_URL）
    status: pending
  - id: frontend-4
    content: Vercelでデプロイを開始
    status: pending
  - id: cors-1
    content: RailwayのAPIサービスでFRONTEND_URLをVercelのURLに更新
    status: pending
  - id: verify-1
    content: APIのヘルスチェックとSwagger UIを確認
    status: pending
  - id: verify-2
    content: フロントエンドからAPIにアクセスできるか確認
    status: pending
  - id: verify-3
    content: Cronジョブが5分ごとに実行されているかログで確認
    status: pending
  - id: verify-4
    content: ワーカーがOutboxタスクを処理しているかログで確認
    status: pending
isProject: false
---

# Railwayデプロイ実装プラン

## アーキテクチャ概要

```
┌─────────────────────────────────────────┐
│  Railway Project                        │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ PostgreSQL Database              │  │
│  │ (自動生成 DATABASE_URL)          │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Backend API Service              │  │
│  │ - NestJS API                    │  │
│  │ - Cronジョブ (5分ごと)          │  │
│  │ - Port: 3000                    │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Worker Service                   │  │
│  │ - Outbox処理                     │  │
│  │ - 非同期タスク処理               │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
                    │
                    │ API呼び出し
                    ↓
┌─────────────────────────────────────────┐
│  Vercel (Frontend)                      │
│  - Next.js App                          │
│  - NEXT_PUBLIC_API_URL設定              │
└─────────────────────────────────────────┘
```

## デプロイ手順

### Phase 1: 事前準備と確認

**確認事項:**

- GitHubリポジトリがプッシュ済み
- Railwayアカウント作成済み
- 必要なファイルが存在:
  - `backend/Dockerfile` ✓
  - `backend/package.json` ✓
  - `backend/prisma/schema.prisma` ✓
  - `backend/prisma/migrations/` ✓
  - `railway.json` ✓

**必要な環境変数リスト:**

- Backend API: `NODE_ENV`, `DATABASE_URL`, `PORT`, `FRONTEND_URL`
- Worker: `NODE_ENV`, `DATABASE_URL`
- Frontend: `NEXT_PUBLIC_API_URL`

### Phase 2: PostgreSQLデータベース作成

1. Railwayダッシュボードで「New Project」作成
2. 「Add Database」→「PostgreSQL」選択
3. データベース作成後、`DATABASE_URL`をコピー

   - 形式: `postgresql://postgres:password@host:port/database`
   - Railwayが自動生成

**注意点:**

- `DATABASE_URL`は後でAPIとWorkerの両方で使用
- RailwayのPostgreSQLサービスから自動的に環境変数として利用可能

### Phase 3: バックエンドAPIサービスのデプロイ

**設定手順:**

1. Railwayプロジェクトで「New Service」→「GitHub Repo」選択
2. リポジトリを選択
3. サービス設定:

   - **Root Directory**: `backend`
   - **Dockerfile Path**: `backend/Dockerfile` (自動検出される可能性あり)
   - **Service Name**: `cron-larning-api`

4. 環境変数設定 (Variablesタブ):
   ```
   NODE_ENV=production
   DATABASE_URL=<PostgreSQLのDATABASE_URL>
   PORT=3000
   FRONTEND_URL=https://your-frontend.vercel.app
   ```


   - `DATABASE_URL`はPostgreSQLサービスをリンクすると自動設定される可能性あり

5. デプロイ設定確認:

   - `railway.json`が正しく読み込まれているか確認
   - Start Command: `node dist/main` (railway.jsonで設定済み)

6. デプロイ開始

   - Railwayが自動的にビルド・デプロイを開始

**確認ポイント:**

- ビルドログでPrismaクライアント生成が成功しているか
- ビルドログで`npm run build`が成功しているか
- デプロイログでアプリケーションが起動しているか

### Phase 4: Prismaマイグレーション実行

**方法1: Railway CLI使用（推奨）**

```bash
# Railway CLIインストール
npm i -g @railway/cli

# Railwayにログイン
railway login

# プロジェクトをリンク（プロジェクトディレクトリで実行）
railway link

# マイグレーション実行
cd backend
railway run npx prisma migrate deploy
```

**方法2: Railwayダッシュボードから実行**

1. APIサービスの「Deploy Logs」を開く
2. 「Run Command」または「Shell」を開く
3. 以下を実行:
   ```bash
   npx prisma migrate deploy
   ```


**確認:**

- マイグレーションが正常に適用されたか確認
- `prisma migrate status`で状態確認可能

### Phase 5: ワーカーサービスのデプロイ

1. Railwayプロジェクトで「New Service」→「GitHub Repo」選択
2. 同じリポジトリを選択
3. サービス設定:

   - **Root Directory**: `backend`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Service Name**: `cron-larning-worker`

4. 環境変数設定:
   ```
   NODE_ENV=production
   DATABASE_URL=<PostgreSQLのDATABASE_URL>
   ```


   - PostgreSQLサービスをリンクすると`DATABASE_URL`が自動設定される

5. 起動コマンド設定:

   - 「Settings」→「Deploy」→「Start Command」に以下を設定:
   ```
   node dist/src/worker.js
   ```

   - または、`railway.json`をサービスごとに設定（要確認）

6. デプロイ開始

**確認ポイント:**

- ワーカーのログで「🚀 Outboxワーカーが起動しました」が表示されるか
- エラーがないか確認

### Phase 6: フロントエンドのデプロイ（Vercel）

1. Vercelにアクセス: https://vercel.com
2. GitHubリポジトリをインポート
3. プロジェクト設定:

   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (自動検出)
   - **Output Directory**: `.next` (自動検出)

4. 環境変数設定:
   ```
   NEXT_PUBLIC_API_URL=https://cron-larning-api.up.railway.app
   ```


   - RailwayのAPI URLを設定（デプロイ後に確定）

5. デプロイ開始

**注意点:**

- RailwayのAPI URLはデプロイ後に確定する
- Vercelデプロイ後、環境変数を更新して再デプロイが必要な場合あり

### Phase 7: CORS設定の更新

1. RailwayのAPIサービスで環境変数を確認
2. `FRONTEND_URL`にVercelのURLを設定:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```

3. サービスを再起動（または自動再デプロイ）

### Phase 8: 動作確認とテスト

**API確認:**

1. ヘルスチェック: `https://your-api.up.railway.app/healthz`
2. Swagger UI: `https://your-api.up.railway.app/api`
3. APIエンドポイントテスト:

   - `GET /sources`
   - `GET /articles`
   - `GET /jobs`

**フロントエンド確認:**

1. VercelのURLにアクセス
2. ソース管理ページでソース追加
3. 記事一覧ページで記事が表示されるか確認

**Cronジョブ確認:**

1. RailwayのAPIサービスログを確認
2. 5分ごとに「Cronジョブ開始: 有効なソースのRSS取得」が表示されるか確認
3. ジョブ履歴ページで実行履歴を確認

**ワーカー確認:**

1. Railwayのワーカーサービスログを確認
2. Outboxタスクが処理されているか確認
3. Outbox一覧ページでタスクの状態を確認

## トラブルシューティング

### ビルドエラー

**Prismaクライアント生成エラー:**

- Dockerfileで`npm run prisma:generate`が実行されているか確認
- `prisma/schema.prisma`が正しくコピーされているか確認

**依存関係エラー:**

- `--legacy-peer-deps`フラグが使用されているか確認
- `package.json`の依存関係を確認

### マイグレーションエラー

**エラー: "Migration engine connect error"**

- `DATABASE_URL`が正しく設定されているか確認
- PostgreSQLサービスが起動しているか確認

**エラー: "Migration not found"**

- `prisma/migrations`ディレクトリがDockerfileでコピーされているか確認
- マイグレーションファイルがGitに含まれているか確認

### ワーカーが起動しない

**エラー: "Cannot find module"**

- `dist/worker.js`が存在するか確認
- ビルドが正常に完了しているか確認

**エラー: "Database connection error"**

- `DATABASE_URL`が正しく設定されているか確認
- PostgreSQLサービスが起動しているか確認

### CORSエラー

**フロントエンドからAPIにアクセスできない:**

- `FRONTEND_URL`環境変数が正しく設定されているか確認
- VercelのURLと一致しているか確認
- APIサービスのログでCORSエラーを確認

### Cronジョブが実行されない

**ログにCronジョブの実行記録がない:**

- APIサービスが起動しているか確認
- ログでエラーがないか確認
- `@nestjs/schedule`が正しくインポートされているか確認

## 最適化と改善

### 環境変数の管理

- Railwayの「Variables」タブで一元管理
- PostgreSQLサービスをリンクすると`DATABASE_URL`が自動設定される
- サービス間で環境変数を共有可能

### ログ確認

- Railwayダッシュボードの「Deploy Logs」でリアルタイムログ確認
- JSON形式のログが出力される（`JsonLogger`使用）

### パフォーマンス

- Railwayの無料枠ではリソース制限あり
- 必要に応じて有料プランにアップグレード
- データベース接続プールの設定を検討

## デプロイ後のメンテナンス

### 定期的な確認項目

1. Railwayの使用量を確認
2. ログでエラーがないか確認
3. Cronジョブが正常に実行されているか確認
4. データベースのサイズを確認

### 更新手順

1. コードを変更
2. GitHubにプッシュ
3. Railwayが自動的に再デプロイ
4. マイグレーションが必要な場合は手動実行

## コスト見積もり

- **Railway**: 無料枠あり（$5/月から）
  - PostgreSQL: 無料枠で利用可能
  - API + Worker: 無料枠で利用可能
- **Vercel**: 無料枠あり（個人プロジェクトは無料）

## 参考リソース

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Migrate Deploy](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-production#deploying-migrations)