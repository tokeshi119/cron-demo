# RSS記事取得システム

技術記事のメタ情報を定期取得し、DBに冪等保存。解析などの重い処理はワーカーで非同期実行するシステムです。

## 技術スタック

### Backend
- Node.js / TypeScript
- NestJS
- PostgreSQL
- Prisma (DBアクセス)
- @nestjs/schedule (Cron)
- @nestjs/swagger (OpenAPI)

### Frontend
- Next.js (App Router) / TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query (React Query)
- openapi-typescript (型生成)

### Infrastructure
- Docker Compose (app / worker / postgres)

## セットアップ

### 前提条件
- Node.js 18以上
- Docker & Docker Compose
- Git

### セットアップ手順

1. リポジトリのクローン
```bash
git clone <repository-url>
cd cron-larning
```

2. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

3. Docker Composeでサービス起動
```bash
docker-compose up -d
```

4. バックエンドのセットアップ
```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

5. フロントエンドのセットアップ
```bash
cd frontend
npm install
npm run dev
```

## 開発コマンド

### Backend
- `npm run start:dev` - 開発サーバー起動
- `npm run start:worker` - ワーカー起動
- `npm run build` - ビルド
- `npx prisma studio` - Prisma Studio起動
- `npx prisma migrate dev` - マイグレーション実行

### Frontend
- `npm run dev` - 開発サーバー起動
- `npm run build` - ビルド
- `npm run generate:types` - OpenAPIから型生成

## API エンドポイント

- `GET /healthz` - ヘルスチェック
- `GET /api` - Swagger UI
- `GET /sources` - Sources一覧
- `POST /sources` - Source登録
- `POST /sources/:id/fetch` - 手動取得
- `GET /articles` - 記事一覧
- `GET /jobs` - ジョブ履歴
- `GET /outbox` - Outbox一覧

詳細は Swagger UI (`http://localhost:3002/api`) を参照してください。

## プロジェクト構造

```
cron-larning/
├── backend/          # NestJS バックエンド
├── frontend/         # Next.js フロントエンド
├── docker-compose.yml
└── README.md
```

## ライセンス

MIT
