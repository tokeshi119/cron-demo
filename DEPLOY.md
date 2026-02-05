# Railway デプロイガイド

## 前提条件

- GitHubアカウント
- Railwayアカウント（https://railway.app）
- リポジトリがGitHubにプッシュ済み

## デプロイ手順

### 1. PostgreSQLデータベースの作成

1. Railwayダッシュボードで「New Project」をクリック
2. 「Add Database」→「PostgreSQL」を選択
3. 作成後、`DATABASE_URL`をコピー（後で使用）

### 2. バックエンドAPIのデプロイ

1. Railwayダッシュボードで「New Service」→「GitHub Repo」を選択
2. リポジトリを選択
3. 設定:
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Service Name**: `cron-larning-api`
4. 環境変数を設定:
   ```
   NODE_ENV=production
   DATABASE_URL=<PostgreSQLのDATABASE_URL>
   PORT=3000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```
5. デプロイ開始

### 3. マイグレーション実行

Railway CLIを使用:

```bash
# Railway CLIをインストール
npm i -g @railway/cli

# Railwayにログイン
railway login

# プロジェクトをリンク
railway link

# マイグレーション実行
cd backend
railway run npx prisma migrate deploy
```

または、Railwayの「Deploy Logs」で直接実行:

```bash
railway run --service cron-larning-api npx prisma migrate deploy
```

### 4. ワーカーサービスのデプロイ

1. Railwayダッシュボードで「New Service」→「GitHub Repo」を選択
2. 同じリポジトリを選択
3. 設定:
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Service Name**: `cron-larning-worker`
4. 環境変数を設定（バックエンドと同じ）:
   ```
   NODE_ENV=production
   DATABASE_URL=<PostgreSQLのDATABASE_URL>
   ```
5. 「Settings」→「Deploy」→「Start Command」に以下を設定:
   ```
   node dist/src/worker.js
   ```
6. デプロイ開始

### 5. フロントエンドのデプロイ（Vercel推奨）

1. Vercelにアクセス: https://vercel.com
2. GitHubリポジトリをインポート
3. 設定:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. 環境変数を設定:
   ```
   NEXT_PUBLIC_API_URL=https://cron-larning-api.up.railway.app
   ```
5. デプロイ開始

### 6. 動作確認

1. **API**: `https://your-api-url.up.railway.app/healthz`
2. **Swagger UI**: `https://your-api-url.up.railway.app/api`
3. **フロントエンド**: VercelのURL
4. **Cronジョブ**: Railwayのログで12時間ごとの実行を確認

## トラブルシューティング

### マイグレーションエラー

```bash
# Prismaクライアントを再生成
railway run --service cron-larning-api npm run prisma:generate
```

### ワーカーが起動しない

- 「Start Command」が正しく設定されているか確認
- ログでエラーを確認

### CORSエラー

- `FRONTEND_URL`環境変数が正しく設定されているか確認
- フロントエンドの`NEXT_PUBLIC_API_URL`が正しいか確認

## コスト

- **Railway**: 無料枠あり（$5/月から）
- **Vercel**: 無料枠あり（個人プロジェクトは無料）

## 参考リンク

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
