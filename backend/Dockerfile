# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 依存関係をインストール
RUN npm install --legacy-peer-deps

# Prismaクライアントを生成（package.jsonで指定されたバージョンを使用）
RUN npm run prisma:generate

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 実行ステージ
FROM node:20-alpine AS runner

WORKDIR /app

# 本番環境用の依存関係のみインストール
ENV NODE_ENV=production

# 依存関係ファイルをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 本番用依存関係のみインストール
RUN npm install --legacy-peer-deps --only=production && npm cache clean --force

# ビルド済みアプリケーションとPrismaクライアントをコピー
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# 非rootユーザーで実行
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

# デフォルトコマンド（docker-compose.ymlで上書き可能）
CMD ["node", "dist/src/main"]
