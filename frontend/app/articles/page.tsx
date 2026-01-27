'use client';

import { useArticles } from '@/src/hooks/useArticles';
import Link from 'next/link';

export default function ArticlesPage() {
  const { data: articles, isLoading, error } = useArticles();

  if (isLoading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <p>読み込み中...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-bold mb-2">エラーが発生しました</p>
            <p className="text-red-600 text-sm">
              {error instanceof Error
                ? error.message
                : '記事の取得に失敗しました。バックエンドサーバーが起動しているか確認してください。'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">記事一覧</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ホーム
          </Link>
        </div>

        <div className="space-y-4">
          {articles?.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h2 className="text-2xl font-bold mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {article.title}
                </a>
              </h2>
              {article.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {article.description}
                </p>
              )}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  公開日:{' '}
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleString('ja-JP')
                    : '不明'}
                </span>
                <span>
                  取得日:{' '}
                  {new Date(article.createdAt).toLocaleString('ja-JP')}
                </span>
              </div>
            </div>
          ))}
          {articles?.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center text-gray-500">
              記事がありません
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
