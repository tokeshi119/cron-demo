# ブランチ戦略

## 推奨アプローチ

### オプション1: ブランチを切らない（推奨）

**理由:**
- デプロイ用の設定ファイル（`DEPLOY.md`、`railway.json`）は本番環境のドキュメントなので、`main`ブランチに含めても問題ない
- 環境変数は`.env`で管理されていて、`.gitignore`で除外されている（安全）
- ローカル開発用の設定（`docker-compose.yml`）と本番用の設定（`railway.json`）は共存できる

**運用:**
- `main`ブランチで開発・デプロイの両方を行う
- ローカル開発時は`.env`ファイルを使用
- Railwayデプロイ時はRailwayの環境変数を使用

---

### オプション2: ブランチを切る場合

もしブランチを切りたい場合は、以下の戦略を推奨します：

#### ブランチ構成

```
main (本番用)
  ├── DEPLOY.md
  ├── railway.json
  └── 本番環境用の設定

develop (開発用)
  ├── docker-compose.yml
  └── ローカル開発用の設定
```

#### 運用フロー

1. **開発時**: `develop`ブランチで作業
   ```bash
   git checkout -b develop
   # 開発作業
   git commit -m "feat: 新機能追加"
   ```

2. **デプロイ時**: `main`ブランチにマージ
   ```bash
   git checkout main
   git merge develop
   git push origin main
   # Railwayが自動デプロイ
   ```

3. **ローカル開発**: `develop`ブランチを使用
   ```bash
   git checkout develop
   docker-compose up -d
   ```

---

## 実際の推奨

**ブランチを切らない方がシンプルです！**

理由：
- 設定ファイルは環境変数で制御できる
- `.env`ファイルは`.gitignore`で除外されている
- `DEPLOY.md`はドキュメントなので、どのブランチにあっても問題ない
- Railwayは`main`ブランチを監視して自動デプロイできる

---

## 環境変数の管理

### ローカル開発
`.env`ファイルを作成（`.env.example`をコピー）:
```bash
cp .env.example .env
# .envファイルを編集
```

### 本番環境（Railway）
Railwayダッシュボードで環境変数を設定:
- `NODE_ENV=production`
- `DATABASE_URL` (PostgreSQLサービスから自動生成)
- `FRONTEND_URL` (VercelのURL)

### 本番環境（Vercel）
Vercelダッシュボードで環境変数を設定:
- `NEXT_PUBLIC_API_URL` (RailwayのAPI URL)

---

## 結論

**ブランチを切らなくても大丈夫です！**

現在の構成で十分に管理できます：
- ✅ `.env`ファイルでローカル開発環境を管理
- ✅ Railwayの環境変数で本番環境を管理
- ✅ `DEPLOY.md`はドキュメントなので、どのブランチにあっても問題ない

もしブランチを切りたい場合は、`develop`ブランチを作成して開発用として使用することを推奨します。
