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

### 2.1 重要: S3を「非公開」にするなら OAC を使う（推奨）

S3バケットをパブリックにせず、**CloudFront経由でのみ配信**したい場合は、CloudFrontの **OAC（Origin Access Control）** を使って、CloudFrontからのアクセスだけを許可するのが推奨です。

- **OAC（推奨）**: 新しい方式。S3オリジンを安全に保護しやすい
- **OAI（レガシー）**: 旧方式。機能制約があり、AWSとしてはOACを推奨

AWS公式: [Amazon S3 オリジンへのアクセスを制限する（OAC）](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html)

補足:
- S3を「Webサイトエンドポイント」にすると OAC/OAI が使えないため、**通常のS3バケットオリジン**として使います（この手順はその前提です）

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

### 3.1 OAC利用時のポイント（ざっくり）

- CloudFront側で **OAC を作成**し、ディストリビューションのS3オリジンに **OAC をアタッチ**
- S3バケットポリシーで `cloudfront.amazonaws.com` を許可し、`AWS:SourceArn` で **特定ディストリビューションID** に限定する
- OACの署名動作は **Sign requests（推奨）/ always** を選ぶ（S3へのアクセスが安定）

（バケットポリシー例は上記AWS公式ドキュメントに掲載されています）

## 4. フロントの環境変数（ビルド時）

フロントは `NEXT_PUBLIC_API_URL` を参照してバックエンドに接続します。

- 参照箇所: `frontend/src/lib/api.ts`
- 注意: `NEXT_PUBLIC_*` は **ビルド時に埋め込まれます**（デプロイ先で後から差し替えはできません）

## 5. 手動デプロイ（推奨: 学習用）

### 5.1 事前準備

1. **AWS CLIのインストール**

#### Windowsの場合

**方法A: MSIインストーラー（推奨）**

1. https://awscli.amazonaws.com/AWSCLIV2.msi からインストーラーをダウンロード
2. ダウンロードした `AWSCLIV2.msi` を実行してインストール
3. インストール後、新しいPowerShellウィンドウを開く
4. インストール確認：
   ```powershell
   aws --version
   ```
   バージョンが表示されればOK（例: `aws-cli/2.x.x`）

**方法B: コマンドラインからインストール（MSIが使えない場合）**

```powershell
# PowerShellを管理者権限で実行
# インストールスクリプトをダウンロードして実行
$url = "https://awscli.amazonaws.com/AWSCLIV2.msi"
$output = "$env:TEMP\AWSCLIV2.msi"
Invoke-WebRequest -Uri $url -OutFile $output
Start-Process msiexec.exe -ArgumentList "/i $output /quiet" -Wait
```

**方法C: Chocolateyを使用（Chocolateyがインストール済みの場合）**

```powershell
choco install awscli
```

#### macOSの場合

```bash
# Homebrewを使用
brew install awscli

# または、公式インストーラーを使用
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

#### Linuxの場合

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

#### インストール後の設定

AWS CLIの認証方法には2つあります：

##### 方法A: IAM Identity Center (SSO) - 推奨

**メリット**:
- **セキュリティが高い**: 一時的な認証情報を使用（通常1時間程度で期限切れ）
- **アクセスキーの漏洩リスクが低い**: 長期間有効なアクセスキーを保存しない
- **一元管理**: 企業環境では複数のAWSアカウントを一元管理できる
- **最小権限の原則**: 必要な権限のみを付与しやすい

**デメリット**:
- 個人利用や検証環境では設定がやや複雑
- 定期的に再ログインが必要（`aws sso login`）

**設定手順**:

1. IAM Identity Centerが有効化されているAWSアカウントで、SSO Start URLとSSO Regionを取得
   - AWSアクセスポータルから「アクセスキー」リンクを選択
   - 「IAM Identity Center認証情報」タブで `SSO Start URL` と `SSO Region` を確認

2. SSOプロファイルを設定：

```powershell
aws configure sso
```

以下の情報を入力します：

- **SSO session name**: 任意の名前（例: `my-sso`）
- **SSO start URL**: IAM Identity Centerの開始URL（例: `https://your-sso-portal.awsapps.com/start`）
- **SSO region**: IAM Identity Centerのリージョン（例: `us-east-1`）
- **SSO registration scopes**: `sso:account:access`（そのままEnterでOK）

3. ブラウザが開くので、AWSアカウントとロールを選択

4. デフォルトリージョンとプロファイル名を設定

5. SSOにログイン：

```powershell
aws sso login --profile <プロファイル名>
```

**設定の確認**:

```powershell
aws sts get-caller-identity --profile <プロファイル名>
```

##### 方法B: IAMユーザー（アクセスキー） - 検証・個人利用向け

**メリット**:
- 設定が簡単（`aws configure` のみ）
- 個人利用や検証環境に適している
- 再ログイン不要

**デメリット・注意点**:
- **セキュリティリスク**: 長期間有効なアクセスキーを保存するため、漏洩リスクが高い
- **アクセスキーの管理**: 漏洩した場合、手動で無効化する必要がある
- **権限管理**: 必要最小限の権限のみを付与すること（例: S3とCloudFrontのみ）

**設定手順**:

```powershell
aws configure
```

以下の情報を入力します：

- **AWS Access Key ID**: IAMユーザーのアクセスキーID
- **AWS Secret Access Key**: IAMユーザーのシークレットアクセスキー
- **Default region name**: `ap-northeast-1`（東京リージョン）など
- **Default output format**: `json`（そのままEnterでOK）

**注意**: `aws configure` はどのディレクトリで実行してもOKです。設定はユーザー単位で保存されます。

**設定の確認**:

```powershell
aws sts get-caller-identity
```

正しく設定されていれば、IAMユーザー情報が表示されます。

**IAMユーザー使用時のセキュリティ推奨事項**:

1. **最小権限の原則**: デプロイに必要な権限のみを付与
   - S3: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` など
   - CloudFront: `cloudfront:CreateInvalidation` など
2. **アクセスキーの定期ローテーション**: 定期的にアクセスキーを更新
3. **アクセスキーの保護**: `.aws/credentials` ファイルをGitにコミットしない（`.gitignore`に追加済み）
4. **MFAの有効化**: 可能であれば多要素認証を有効化

**どちらを選ぶべきか**:

- **IAM Identity Center (SSO)**: 企業環境、複数AWSアカウント管理、セキュリティ重視の場合
- **IAMユーザー**: 個人利用、検証環境、シンプルな設定を希望する場合

検証・個人利用であればIAMユーザーでも問題ありませんが、アクセスキーの管理には注意してください。

2. **環境変数の設定（AWS CLI設定後）**

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

