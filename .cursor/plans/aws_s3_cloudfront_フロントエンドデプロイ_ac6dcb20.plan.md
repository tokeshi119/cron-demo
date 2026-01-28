---
name: AWS S3 CloudFront フロントエンドデプロイ
overview: Next.js 15のフロントエンドをAWS S3 + CloudFrontでデプロイし、Railway上のバックエンドAPIと接続する。無料枠内で運用可能な構成を構築する。
todos:
  - id: nextjs-static-export-config
    content: Next.jsの静的エクスポート設定を追加（next.config.ts）
    status: completed
  - id: build-scripts
    content: package.jsonに静的エクスポート用ビルドスクリプトを追加
    status: completed
  - id: github-actions-workflow
    content: GitHub Actionsワークフローを作成（S3デプロイ + CloudFrontキャッシュ無効化）
    status: completed
  - id: deploy-documentation
    content: AWSデプロイ手順ドキュメントを作成
    status: completed
  - id: env-example-update
    content: .env.exampleにNEXT_PUBLIC_API_URLの説明を追加
    status: completed
isProject: false
---

# AWS S3 + CloudFront フロントエンドデプロイプラン

## 概要

Next.js 15のフロントエンドアプリケーションをAWS S3 + CloudFrontでデプロイし、Railway上のバックエンドAPIと接続します。すべてのページがクライアントコンポーネント（`'use client'`）のため、静的エクスポートが可能です。

## 前提条件

- AWS、GitHubなど、本手順で利用する各種サービスのアカウントは取得済みであること

## アーキテクチャ

```
GitHub → GitHub Actions → S3 → CloudFront → ユーザー
                              ↓
                         Railway API
```

## AWS無料枠の確認

- **S3**: 5GBストレージ、20,000 GETリクエスト/月
- **CloudFront**: 1TB転送、10,000,000 HTTP/HTTPSリクエスト/月
- **Route 53**: 無料枠なし（オプション、独自ドメイン使用時のみ）

検証・個人利用であれば無料枠内で十分運用可能です。

## 実装手順

### 1. Next.jsの静的エクスポート設定

**ファイル**: `frontend/next.config.ts`

- `output: 'export'`を追加して静的エクスポートを有効化
- `trailingSlash: true`を設定（S3のパス解決を考慮）
- `images.unoptimized: true`を設定（静的エクスポート時は画像最適化が無効）

### 2. ビルドスクリプトの追加

**ファイル**: `frontend/package.json`

- `build:export`スクリプトを追加（静的エクスポート用ビルド）
- 環境変数`NEXT_PUBLIC_API_URL`をビルド時に設定可能にする

### 3. AWSリソースの準備

#### S3バケット作成

- バケット名: `rss-frontend-{ユーザー名}`（グローバルで一意）
- リージョン: `ap-northeast-1`（東京）
- パブリックアクセス: ブロック（CloudFront経由でのみアクセス）
- 静的ウェブサイトホスティング: 無効（CloudFrontを使用）

#### CloudFrontディストリビューション作成

- オリジン: 作成したS3バケット
- ビューアープロトコルポリシー: Redirect HTTP to HTTPS
- デフォルトルートオブジェクト: `index.html`
- エラーページ: 404エラー時も`index.html`を返す（SPAルーティング対応）
- キャッシュポリシー: CachingOptimized（静的コンテンツ用）

### 4. 環境変数の設定

**ファイル**: `.env.example`に追加

- `NEXT_PUBLIC_API_URL`: RailwayのバックエンドURL（例: `https://your-app.up.railway.app`）

ビルド時に環境変数を設定する必要があります（`NEXT_PUBLIC_*`はビルド時に埋め込まれます）。

### 5. デプロイ方法の選択

#### オプションA: GitHub Actions自動デプロイ（推奨）

**ファイル**: `.github/workflows/deploy-frontend.yml`

- トリガー: `main`ブランチへのプッシュ
- ステップ:

  1. Node.js環境セットアップ
  2. 依存関係インストール
  3. 環境変数設定（GitHub Secretsから取得）
  4. 静的エクスポートビルド
  5. AWS CLIでS3にアップロード
  6. CloudFrontキャッシュ無効化

**必要なGitHub Secrets**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- `NEXT_PUBLIC_API_URL`（RailwayのバックエンドURL）

#### オプションB: 手動デプロイ

**ファイル**: `frontend/scripts/deploy.sh`（Windowsの場合は`deploy.ps1`）

- ローカルでビルド
- AWS CLIでS3にアップロード
- CloudFrontキャッシュ無効化

### 6. SPAルーティング対応

CloudFrontで404エラー時に`index.html`を返すように設定します。これにより、Next.jsのクライアントサイドルーティングが正常に動作します。

**CloudFrontカスタムエラーレスポンス設定**:

- HTTPエラーコード: 403, 404
- レスポンスページパス: `/index.html`
- HTTPレスポンスコード: 200

### 7. CORS設定

バックエンド（Railway）でCORS設定を確認・更新します。

**確認事項**:

- `FRONTEND_URL`環境変数にCloudFrontのURLを設定
- CORS設定でCloudFrontのオリジンを許可

### 8. セキュリティ設定

- S3バケットポリシー: CloudFront OAC（Origin Access Control）を使用
- CloudFront: HTTPS強制
- セキュリティヘッダー: CloudFrontのレスポンスヘッダーポリシーで設定

## ファイル変更一覧

1. `frontend/next.config.ts` - 静的エクスポート設定
2. `frontend/package.json` - ビルドスクリプト追加
3. `.github/workflows/deploy-frontend.yml` - GitHub Actionsワークフロー（新規作成）
4. `.env.example` - 環境変数ドキュメント更新
5. `frontend/scripts/deploy.sh` - 手動デプロイスクリプト（オプション、新規作成）
6. `docs/aws-deployment.md` - デプロイ手順ドキュメント（新規作成）

## デプロイ後の確認事項

1. CloudFrontのURLでフロントエンドが表示されること
2. バックエンドAPIへのリクエストが正常に動作すること
3. ページ遷移（SPAルーティング）が正常に動作すること
4. HTTPSでアクセスできること

## コスト見積もり（無料枠内）

- **S3**: 無料（5GB以下、20,000リクエスト/月以下）
- **CloudFront**: 無料（1TB転送以下、10,000,000リクエスト/月以下）
- **合計**: 無料（検証・個人利用範囲内）

## 注意事項

1. `NEXT_PUBLIC_API_URL`はビルド時に埋め込まれるため、環境ごとにビルドが必要
2. CloudFrontのキャッシュ無効化には数分かかる場合がある
3. S3バケット名はグローバルで一意である必要がある
4. AWS認証情報はGitHub Secretsに保存し、リポジトリにコミットしないこと