# フロントエンド

RSS記事取得システムのフロントエンドアプリケーションです。

## 技術スタック

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)
- Axios

## セットアップ

1. 依存関係のインストール
```bash
npm install
```

2. 環境変数の設定
`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

3. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:3003` を開いてください。

## 開発コマンド

- `npm run dev` - 開発サーバー起動
- `npm run build` - プロダクションビルド
- `npm run start` - プロダクションサーバー起動
- `npm run lint` - ESLintの実行
- `npm run generate:types` - OpenAPIから型生成（バックエンドサーバーが起動している必要があります）

## プロジェクト構造

```
frontend/
├── app/              # Next.js App Router
│   ├── page.tsx      # ホームページ
│   ├── sources/      # ソース管理ページ
│   └── articles/     # 記事一覧ページ
├── src/
│   ├── lib/          # ユーティリティ
│   │   └── api.ts    # APIクライアント
│   └── hooks/        # React Hooks
│       ├── useSources.ts
│       └── useArticles.ts
└── package.json
```
