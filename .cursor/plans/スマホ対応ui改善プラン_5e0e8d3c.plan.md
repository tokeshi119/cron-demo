---
name: スマホ対応UI改善プラン
overview: スマホで見やすいようにレスポンシブデザインを改善。デモとして見れる範囲での最小限の変更で、パディング調整、ナビゲーション改善、テーブルのモバイル表示最適化を実施。
todos:
  - id: mobile-1
    content: ホームページのレスポンシブ対応（パディング、タイトル、ナビゲーション）
    status: completed
  - id: mobile-2
    content: ソース管理ページのレスポンシブ対応（パディング、ヘッダー、フォーム）
    status: completed
  - id: mobile-3
    content: 記事一覧ページのレスポンシブ対応（パディング、ヘッダー、記事カード）
    status: completed
  - id: mobile-4
    content: ジョブ履歴ページのレスポンシブ対応（パディング、ヘッダー）
    status: completed
  - id: mobile-5
    content: Outboxページのレスポンシブ対応（パディング、ヘッダー）
    status: completed
isProject: false
---

# スマホ対応UI改善プラン

## 改善方針

デモとして見れる範囲での最小限の変更に留め、以下の点を改善：

1. **パディング・マージンの調整**: スマホでは`p-8`を`p-4`に変更
2. **ヘッダーのレスポンシブ対応**: タイトルとボタンを縦並びに
3. **ナビゲーションの改善**: スマホでは縦並びまたはグリッド表示
4. **テーブルのモバイル表示**: 横スクロールを最小限に、またはカード表示に変更
5. **ボタン・フォームのサイズ調整**: タッチしやすいサイズに

## 改善対象ページ

### 1. ホームページ (`frontend/app/page.tsx`)

**変更内容:**

- パディング: `p-8` → `p-4 md:p-8`
- タイトルサイズ: `text-4xl` → `text-2xl md:text-4xl`
- ナビゲーション: 横並び → グリッド表示（スマホでは2列）

**実装:**

```tsx
// ナビゲーションをグリッドに変更
<nav className="grid grid-cols-2 md:flex md:space-x-4 gap-2 md:gap-0 mb-8">
```

### 2. ソース管理ページ (`frontend/app/sources/page.tsx`)

**変更内容:**

- パディング: `p-8` → `p-4 md:p-8`
- ヘッダー: 横並び → スマホでは縦並び
- タイトルサイズ: `text-4xl` → `text-2xl md:text-4xl`
- 一括取得セクション: ボタンをスマホでは縦並び
- テーブル: スマホではカード表示に変更（オプション、または横スクロール維持）

**実装:**

- ヘッダー: `flex flex-col md:flex-row md:justify-between md:items-center`
- 一括取得: `flex flex-col md:flex-row md:items-end gap-4`
- ボタン: `w-full md:w-auto`

### 3. 記事一覧ページ (`frontend/app/articles/page.tsx`)

**変更内容:**

- パディング: `p-8` → `p-4 md:p-8`
- ヘッダー: 横並び → スマホでは縦並び
- タイトルサイズ: `text-4xl` → `text-2xl md:text-4xl`
- 記事カード内の情報: スマホでは縦並び

**実装:**

- ヘッダー: `flex flex-col md:flex-row md:justify-between md:items-center`
- 記事情報: `flex flex-col md:flex-row md:gap-4 gap-2`

### 4. ジョブ履歴ページ (`frontend/app/jobs/page.tsx`)

**変更内容:**

- パディング: `p-8` → `p-4 md:p-8`
- ヘッダー: 横並び → スマホでは縦並び
- タイトルサイズ: `text-4xl` → `text-2xl md:text-4xl`
- 統計情報: 既に`grid-cols-1 md:grid-cols-4`で対応済み
- テーブル: 横スクロール維持（デモ範囲内）

**実装:**

- ヘッダー: `flex flex-col md:flex-row md:justify-between md:items-center`

### 5. Outboxページ (`frontend/app/outbox/page.tsx`)

**変更内容:**

- パディング: `p-8` → `p-4 md:p-8`
- ヘッダー: 横並び → スマホでは縦並び
- タイトルサイズ: `text-4xl` → `text-2xl md:text-4xl`
- テーブル: 横スクロール維持（デモ範囲内）

**実装:**

- ヘッダー: `flex flex-col md:flex-row md:justify-between md:items-center`

## 共通の改善パターン

### パディング調整

```tsx
// 変更前
<main className="min-h-screen p-8">

// 変更後
<main className="min-h-screen p-4 md:p-8">
```

### ヘッダー改善

```tsx
// 変更前
<div className="flex justify-between items-center mb-8">

// 変更後
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
```

### タイトルサイズ調整

```tsx
// 変更前
<h1 className="text-4xl font-bold">

// 変更後
<h1 className="text-2xl md:text-4xl font-bold">
```

### ボタンサイズ調整

```tsx
// スマホでは全幅、デスクトップでは自動幅
<button className="w-full md:w-auto px-4 py-2 ...">
```

## 実装ファイル一覧

1. `frontend/app/page.tsx` - ホームページ
2. `frontend/app/sources/page.tsx` - ソース管理ページ
3. `frontend/app/articles/page.tsx` - 記事一覧ページ
4. `frontend/app/jobs/page.tsx` - ジョブ履歴ページ
5. `frontend/app/outbox/page.tsx` - Outboxページ

## 変更の優先順位

### 高優先度（必須）

- パディング調整（全ページ）
- ヘッダーのレスポンシブ対応（全ページ）
- タイトルサイズ調整（全ページ）

### 中優先度（推奨）

- ナビゲーションの改善（ホームページ）
- ボタン・フォームのサイズ調整（ソース管理ページ）

### 低優先度（オプション）

- テーブルのカード表示化（デモ範囲外のため今回は対応しない）

## 検証方法

1. ブラウザの開発者ツールでモバイルビュー（375px, 414px等）で確認
2. 実際のスマホでアクセスして確認
3. 主要な操作（ソース追加、記事閲覧、ジョブ確認）が可能か確認