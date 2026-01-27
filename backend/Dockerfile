# ビルドステージ
FROM node:20-alpine AS builder

WORKDIR /app

# 依存関係ファイルをコピー
COPY package*.json ./
COPY prisma ./prisma/

# 依存関係をインストール
RUN npm ci

# Prismaクライアントを生成
RUN npx prisma generate

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
RUN npm ci --only=production && npm cache clean --force

# Prismaクライアントを生成
RUN npx prisma generate

# ビルド済みアプリケーションをコピー
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 非rootユーザーで実行
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

USER nestjs

EXPOSE 3000

# デフォルトコマンド（docker-compose.ymlで上書き可能）
CMD ["node", "dist/main"]
