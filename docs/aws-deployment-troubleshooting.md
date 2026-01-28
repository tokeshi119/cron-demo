# AWS S3 + CloudFront デプロイ トラブルシューティングガイド

このドキュメントは、AWS S3 + CloudFrontでのフロントエンドデプロイ時に発生しやすい問題とその解決方法をまとめています。

## 目次

- [PowerShellスクリプト関連](#powershellスクリプト関連)
- [IAMポリシー関連](#iamポリシー関連)
- [S3バケット関連](#s3バケット関連)
- [CloudFront関連](#cloudfront関連)
- [CORS設定関連](#cors設定関連)
- [デプロイ後の確認事項](#デプロイ後の確認事項)

---

## PowerShellスクリプト関連

### エラー: `文字列に終端記号 " がありません` / `ParserError`

**症状:**
- PowerShellで `deploy.ps1` を実行すると、文字列の終端記号エラーが発生する
- 日本語が文字化けして表示される

**原因:**
- PowerShellスクリプトが **UTF-8 without BOM** で保存されている
- PowerShellは **UTF-8 with BOM** を期待する

**解決方法:**

1. **Cursor/VSCodeでUTF-8 with BOMで保存**
   - ファイルを開く
   - 右下のエンコーディング表示（例: `UTF-8`）をクリック
   - **「Save with Encoding」** → **「UTF-8 with BOM」** を選択

2. **または、スクリプト内の日本語を英語に変更**
   - エラーメッセージなどの日本語文字列を英語に変更する

### エラー: `代入式が無効です` / `InvalidLeftHandSide`

**症状:**
- `param()` ブロック内でエラーが発生する
- 例: `[string]$ApiUrl = ""` でエラー

**原因:**
- `param()` ブロックがファイルの先頭（コメント以外）にない
- PowerShellでは `param()` は **ファイルの最初の実行可能な文** である必要がある

**解決方法:**

```powershell
# 正しい順序
# コメントはOK
# フロントエンドをS3 + CloudFrontに手動デプロイするスクリプト

param(
    [string]$ApiUrl,  # = "" は不要（スクリプト内でチェックする）
    [string]$S3BucketName,
    [string]$CloudFrontDistributionId,
    [string]$AwsRegion = "ap-northeast-1"
)

# エンコーディング設定は param() の後に置く
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
```

**注意:** `param()` ブロック内のデフォルト値 `= ""` は削除し、スクリプト内で `[string]::IsNullOrEmpty()` を使ってチェックする方が安全です。

---

## IAMポリシー関連

### エラー: `AccessDenied` / `s3:ListBucket` 権限がない

**症状:**
- S3へのアップロード時に `AccessDenied` エラーが発生する
- `User: arn:aws:iam::... is not authorized to perform: s3:ListBucket`

**原因:**
- IAMポリシーのバケット名が実際のバケット名と一致していない
- ポリシーがユーザーにアタッチされていない

**解決方法:**

1. **IAMポリシーのバケット名を確認**
   - AWSコンソール → IAM → ポリシー → `cron-learning` を開く
   - JSONタブで `Resource` のバケット名を確認
   - 実際のS3バケット名と一致しているか確認

2. **ポリシーを修正**
   ```json
   {
     "Sid": "S3ListBucket",
     "Effect": "Allow",
     "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
     "Resource": "arn:aws:s3:::実際のバケット名"  // ← ここを確認
   },
   {
     "Sid": "S3SyncObjects",
     "Effect": "Allow",
     "Action": [...],
     "Resource": "arn:aws:s3:::実際のバケット名/*"  // ← ここも確認
   }
   ```

3. **ポリシーがユーザーにアタッチされているか確認**
   - IAM → ユーザー → `cron-learning` → 許可タブ
   - `cron-learning` ポリシーが表示されているか確認

**よくある間違い:**
- バケット名が `cron-learning` なのに、実際は `cron-learning0129` を作成していた
- S3バケット名は **グローバルで一意** なので、既に使われている場合は別の名前にする必要がある

---

## S3バケット関連

### エラー: バケット名が既に使用されている

**症状:**
- S3バケット作成時に「バケット名は既に使用されています」エラー

**原因:**
- S3バケット名は **グローバルで一意** である必要がある
- 他のAWSアカウントで既に使用されている名前は使えない

**解決方法:**
- バケット名に **ユニークな識別子を追加**
  - 例: `cron-learning-707236141338`（アカウントIDを追加）
  - 例: `cron-learning0129`（日付や数字を追加）

**注意:** バケット名を変更した場合、IAMポリシーとデプロイスクリプトの環境変数も更新が必要です。

---

## CloudFront関連

### 問題: `/articles/` などの直リンクで404エラー

**症状:**
- トップページは表示されるが、`/articles/` などの直リンクで404エラーになる
- SPAのクライアントサイドルーティングが動作しない

**原因:**
- CloudFrontのカスタムエラーレスポンスが設定されていない
- S3に `/articles/index.html` が存在しないため、S3が404を返す

**解決方法:**

1. CloudFrontコンソール → ディストリビューション → **エラーページ** タブ
2. **カスタムエラーレスポンスを作成** をクリック
3. 以下の2つを作成：

   **403 Forbidden:**
   - HTTP error code: `403`
   - Customize error response: `Yes`
   - Response page path: `/index.html`
   - HTTP Response code: `200`
   - Error caching minimum TTL: `10`（秒）

   **404 Not Found:**
   - HTTP error code: `404`
   - Customize error response: `Yes`
   - Response page path: `/index.html`
   - HTTP Response code: `200`
   - Error caching minimum TTL: `10`（秒）

4. 保存後、**数分待つ**（CloudFrontの設定反映に時間がかかる）

**確認方法:**
- `https://your-cloudfront-url.cloudfront.net/articles/` に直接アクセス
- 404エラーではなく、Next.jsアプリが表示されればOK

---

## CORS設定関連

### エラー: `CORS error` / `バックエンドサーバーに接続できません`

**症状:**
- フロントエンドは表示されるが、API呼び出しが失敗する
- ブラウザのNetworkタブで `CORS error` が表示される
- エラーメッセージ: 「バックエンドサーバーに接続できません」

**原因:**
- バックエンド（Railway）のCORS設定で、CloudFrontのオリジンが許可されていない
- `FRONTEND_URL` 環境変数にCloudFrontのURLが設定されていない

**解決方法:**

1. **Railwayの環境変数を確認・設定**
   - Railway → `cron-demo`（API本体）サービス → **Variables** タブ
   - `FRONTEND_URL` を確認
   - CloudFrontのURLを設定: `https://d1k4qaci6fxrdk.cloudfront.net`
     - （実際のCloudFrontドメインに置き換える）

2. **バックエンドコードの確認**
   - `backend/src/main.ts` でCORS設定を確認：
   ```typescript
   app.enableCors({
     origin: process.env.FRONTEND_URL || 'http://localhost:3003',
     credentials: true,
   });
   ```
   - `FRONTEND_URL` が正しく設定されていれば、自動的にCloudFrontのオリジンが許可される

3. **環境変数変更後の再デプロイ**
   - Railwayは環境変数を変更すると自動で再デプロイされる
   - または手動で再起動

**確認方法:**
- ブラウザで直接バックエンドAPIにアクセス: `https://cron-demo-production.up.railway.app/healthz`
- 200 OKが返れば、バックエンドは動いている（CORSの問題）
- Networkタブで `CORS error` が消え、通常のHTTPステータス（200/4xxなど）になればOK

**注意:** 複数のオリジン（ローカル開発 + CloudFront）を許可したい場合は、配列形式に変更する必要があります。

---

## デプロイ後の確認事項

### 1. CloudFrontのURLでアクセスできるか

```
https://d1k4qaci6fxrdk.cloudfront.net
```

- トップページが表示されるか
- 日本語が正しく表示されるか

### 2. SPAルーティングが動作するか

```
https://d1k4qaci6fxrdk.cloudfront.net/articles/
https://d1k4qaci6fxrdk.cloudfront.net/sources/
```

- 直リンクでアクセスしても404にならないか
- Next.jsのクライアントサイドルーティングが動作するか

### 3. API呼び出しが正常に動作するか

- ブラウザの開発者ツール → Networkタブを開く
- `/sources` や `/articles` などのAPIリクエストを確認
- `CORS error` ではなく、200/4xxなどの通常のHTTPステータスが返るか

### 4. CloudFrontキャッシュの反映

- デプロイ後、**数分待つ**（CloudFrontのキャッシュ無効化に時間がかかる）
- すぐに反映されない場合は、ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）

---

## よくある質問

### Q: デプロイスクリプトを実行する前にpushする必要がある？

**A:** いいえ、pushは必須ではありません。ローカルで実行するだけなら、pushしなくても動作します。ただし、GitHub Actions自動デプロイに切り替える場合は、pushが必要です。

### Q: IAMユーザーとIAM Identity Center (SSO) どちらを使うべき？

**A:** 
- **IAMユーザー**: 個人利用・検証環境に適している。設定が簡単。
- **IAM Identity Center (SSO)**: 企業環境・セキュリティ重視・複数AWSアカウント管理に適している。

検証・個人利用であればIAMユーザーで問題ありませんが、アクセスキーの管理には注意してください。

### Q: S3バケットをパブリックにしないとダメ？

**A:** いいえ、**パブリックにする必要はありません**。CloudFrontの **OAC（Origin Access Control）** を使って、CloudFrontからのみアクセスできるようにするのが推奨です。これにより、S3を非公開のまま安全に配信できます。

### Q: CloudFrontのキャッシュ無効化に時間がかかる

**A:** CloudFrontのキャッシュ無効化（invalidation）は通常 **数分かかります**。デプロイ後すぐに反映されない場合は、数分待ってから再度アクセスしてください。

---

## まとめ

今回のデプロイで特に注意すべきポイント：

1. **PowerShellスクリプトはUTF-8 with BOMで保存**
2. **IAMポリシーのバケット名を実際のバケット名と一致させる**
3. **CloudFrontのSPAフォールバック設定（403/404 → /index.html）を忘れない**
4. **RailwayのCORS設定（FRONTEND_URL）をCloudFrontのURLに設定**
5. **S3バケット名はグローバルで一意にする**

これらのポイントを押さえれば、スムーズにデプロイできるはずです！
