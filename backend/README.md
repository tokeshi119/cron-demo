<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 概要

RSS記事取得システムのバックエンドAPIです。NestJSフレームワークを使用して構築されています。

## プロジェクトセットアップ

```bash
$ npm install
```

## コンパイルと実行

```bash
# 開発モード
$ npm run start

# ウォッチモード（ファイル変更を自動検知）
$ npm run start:dev

# 本番モード
$ npm run start:prod
```

## テスト実行

```bash
# ユニットテスト
$ npm run test

# E2Eテスト
$ npm run test:e2e

# テストカバレッジ
$ npm run test:cov
```

## 動作確認

### ヘルスチェックエンドポイント (`/healthz`)

アプリケーションが正常に起動しているか確認します。

**ブラウザでの確認:**
```
http://localhost:3000/healthz
```

**curlコマンドでの確認:**
```bash
curl http://localhost:3000/healthz
```

正常な場合、以下のようなJSONレスポンスが返ります:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Swagger UI

APIの仕様を確認・テストできます。

**ブラウザでの確認:**
```
http://localhost:3000/api
```

ブラウザで上記URLにアクセスすると、Swagger UIが表示され、以下の操作が可能です:
- 利用可能なAPIエンドポイントの一覧確認
- 各エンドポイントの詳細仕様（リクエスト/レスポンス）の確認
- エンドポイントの直接実行とテスト

## デプロイ

本番環境にデプロイする準備ができたら、効率的に実行するための重要なステップがあります。詳細については、[デプロイメントドキュメント](https://docs.nestjs.com/deployment)を参照してください。

NestJSアプリケーションをデプロイするクラウドベースのプラットフォームをお探しの場合は、AWS上でNestJSアプリケーションをデプロイする公式プラットフォームである[Mau](https://mau.nestjs.com)を確認してください。Mauを使用すると、わずか数ステップでデプロイが簡単かつ迅速に行えます:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Mauを使用すると、数クリックでアプリケーションをデプロイでき、インフラの管理ではなく機能の構築に集中できます。

## リソース

NestJSで作業する際に役立つリソースをいくつか紹介します:

- [NestJS Documentation](https://docs.nestjs.com)にアクセスして、フレームワークの詳細を学びましょう。
- 質問やサポートが必要な場合は、[Discord channel](https://discord.gg/G7Qnnhy)にアクセスしてください。
- より深く学び、実践的な経験を得るには、公式の動画[コース](https://courses.nestjs.com/)を確認してください。
- [NestJS Mau](https://mau.nestjs.com)の助けを借りて、数クリックでAWSにアプリケーションをデプロイできます。
- [NestJS Devtools](https://devtools.nestjs.com)を使用して、アプリケーショングラフを可視化し、NestJSアプリケーションとリアルタイムで対話できます。
- プロジェクトのヘルプが必要ですか（パートタイムからフルタイムまで）？公式の[エンタープライズサポート](https://enterprise.nestjs.com)を確認してください。
- 最新情報を入手するには、[X](https://x.com/nestframework)と[LinkedIn](https://linkedin.com/company/nestjs)でフォローしてください。
- 仕事を探している、または仕事を提供したい場合は、公式の[Jobs board](https://jobs.nestjs.com)を確認してください。

## サポート

NestはMITライセンスのオープンソースプロジェクトです。スポンサーと素晴らしい支援者のサポートにより成長しています。参加したい場合は、[こちら](https://docs.nestjs.com/support)で詳細を確認してください。

## 連絡先

- 作者 - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- ウェブサイト - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## ライセンス

Nestは[MITライセンス](https://github.com/nestjs/nest/blob/master/LICENSE)の下で公開されています。
