import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // S3 + CloudFront配信を前提に、静的エクスポートを有効化
  output: 'export',
  // S3上でのパス解決を安定させる（/articles -> /articles/ -> /articles/index.html）
  trailingSlash: true,
  // 静的エクスポートではNext.jsの画像最適化（サーバー）が使えないため無効化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
