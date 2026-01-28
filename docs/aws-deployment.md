# AWS（S3 + CloudFront）フロントエンドデプロイ手順

対象: `frontend/`（Next.js 15 / App Router）

このフロントは全ページがクライアントコンポーネントで構成されているため、静的エクスポート（`output: 'export'`）してS3に配置し、CloudFrontで配信します。

## 1. 事前に用意するもの

- AWSアカウント
- GitHubアカウント
- Railway上で稼働しているバックエンドのURL（例: `https://your-api-url.up.railway.app`）

## 2. S3バケット作成（推奨: 非公開 + CloudFront経由）

1. S3でバケットを作成（例: `rss-frontend-xxxx`）
2. 「パブリックアクセスをすべてブロック」は **有効のまま**
3. バケットは静的ウェブサイトホスティングを使わず、CloudFrontをフロントにします

## 3. CloudFrontディストリビューション作成

1. オリジンに作成したS3バケットを指定
2. 推奨設定
   - Viewer protocol policy: **Redirect HTTP to HTTPS**
   - Default root object: **`index.html`**
3. SPAルーティング対応（重要）
   - Custom error responsesで **403/404** を追加
   - Response page path: **`/index.html`**
   - HTTP response code: **200**

補足: S3を非公開にする場合、OAC（Origin Access Control）を使ってCloudFrontからのみ読めるようにするのが推奨です。

## 4. フロントの環境変数（ビルド時）

フロントは `NEXT_PUBLIC_API_URL` を参照してバックエンドに接続します。

- 参照箇所: `frontend/src/lib/api.ts`
- 注意: `NEXT_PUBLIC_*` は **ビルド時に埋め込まれます**（デプロイ先で後から差し替えはできません）

## 5. 手動デプロイ（推奨: 学習用）

### 5.1 事前準備

1. **AWS CLIのインストール**
   - https://aws.amazon.com/cli/ からインストール
   - インストール後、`aws configure` で認証情報を設定

2. **環境変数の設定**

PowerShellで以下の環境変数を設定します：

```powershell
# RailwayのバックエンドURL
$env:NEXT_PUBLIC_API_URL = "https://your-api-url.up.railway.app"

# S3バケット名
$env:AWS_S3_BUCKET_NAME = "rss-frontend-xxxx"

# CloudFrontディストリビューションID
$env:AWS_CLOUDFRONT_DISTRIBUTION_ID = "E1234567890ABC"
```

または、スクリプト実行時にパラメータで指定することもできます。

### 5.2 デプロイスクリプトの実行

`frontend` ディレクトリに移動してスクリプトを実行します：

```powershell
cd frontend
.\scripts\deploy.ps1
```

パラメータで指定する場合：

```powershell
.\scripts\deploy.ps1 `
  -ApiUrl "https://your-api-url.up.railway.app" `
  -S3BucketName "rss-frontend-xxxx" `
  -CloudFrontDistributionId "E1234567890ABC"
```

### 5.3 デプロイスクリプトの動作

スクリプトは以下の手順を自動実行します：

1. 環境変数・AWS認証情報の確認
2. 依存関係のインストール（`npm ci`）
3. 静的エクスポートビルド（`npm run build:export`）
4. S3へのアップロード（`aws s3 sync`）
5. CloudFrontキャッシュ無効化（`aws cloudfront create-invalidation`）

### 5.4 トラブルシューティング

- **AWS CLIがインストールされていない**: エラーメッセージに従ってインストール
- **認証情報が設定されていない**: `aws configure` を実行
- **権限エラー**: IAMユーザーにS3とCloudFrontの適切な権限があるか確認

## 6. GitHub Actions（自動デプロイ）

ワークフロー: `.github/workflows/deploy-frontend.yml`

### 5.1 GitHub Secretsに登録する値

GitHubリポジトリの Settings → Secrets and variables → Actions → Secrets に以下を追加します。

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`（例: `ap-northeast-1`）
- `AWS_S3_BUCKET_NAME`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`
- `NEXT_PUBLIC_API_URL`（RailwayのバックエンドURL）

### 5.2 デプロイの流れ

- `main` に `frontend/` 配下の変更がpushされると
  - `frontend` をビルド（静的エクスポート）
  - `frontend/out` をS3に `sync --delete`
  - CloudFrontを `/*` でキャッシュ無効化

## 7. 動作確認

1. CloudFrontのドメイン（例: `xxxx.cloudfront.net`）へアクセスして画面が出る
2. 画面操作でAPI呼び出しが成功する（ネットワークタブで `NEXT_PUBLIC_API_URL` に向いていること）
3. 直リンクで `https://.../articles/` 等へアクセスしても表示できる（403/404の `index.html` フォールバックが効いていること）

## 8. よくあるハマりどころ

- **API URLがlocalhostのまま**: `NEXT_PUBLIC_API_URL` をSecretsに入れ、ビルドに渡しているか確認
- **直リンクで404/403**: CloudFrontのカスタムエラーレスポンス（403/404 → `/index.html` → 200）を設定
- **反映が遅い**: CloudFrontのinvalidations完了を待つ（数分かかることがあります）

