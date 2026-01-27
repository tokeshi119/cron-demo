'use client';

import { useArticles } from '@/src/hooks/useArticles';
import { useSources } from '@/src/hooks/useSources';
import { useState } from 'react';
import Link from 'next/link';
import type { GetArticlesParams } from '@/src/lib/api';

export default function ArticlesPage() {
  const [filters, setFilters] = useState<GetArticlesParams>({
    page: 1,
    limit: 20,
    sort: 'createdAt',
    order: 'desc',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useArticles(filters);
  const { data: sources } = useSources();

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      query: searchQuery || undefined,
      page: 1, // 検索時は1ページ目に戻る
    }));
  };

  const handleSourceFilter = (sourceId: string) => {
    setFilters((prev) => ({
      ...prev,
      sourceId: sourceId || undefined,
      page: 1, // フィルタ変更時は1ページ目に戻る
    }));
  };

  const handleSortChange = (sort: 'createdAt' | 'publishedAt' | 'title') => {
    setFilters((prev) => ({
      ...prev,
      sort,
      page: 1,
    }));
  };

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setFilters((prev) => ({
      ...prev,
      order,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
    // ページ変更時にスクロールをトップに戻す
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const articles = data?.articles || [];
  const pagination = data?.pagination;

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

        {/* フィルタ・検索・ソート */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            {/* 検索 */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                検索（タイトル/URL）
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="検索キーワードを入力..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  検索
                </button>
              </div>
            </div>

            {/* フィルタとソート */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ソースフィルタ */}
              <div>
                <label
                  htmlFor="source"
                  className="block text-sm font-medium mb-2"
                >
                  ソースでフィルタ
                </label>
                <select
                  id="source"
                  value={filters.sourceId || ''}
                  onChange={(e) => handleSourceFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">すべて</option>
                  {sources?.map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ソート */}
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium mb-2"
                >
                  ソート
                </label>
                <select
                  id="sort"
                  value={filters.sort}
                  onChange={(e) =>
                    handleSortChange(
                      e.target.value as 'createdAt' | 'publishedAt' | 'title',
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="createdAt">取得日</option>
                  <option value="publishedAt">公開日</option>
                  <option value="title">タイトル</option>
                </select>
              </div>

              {/* ソート方向 */}
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium mb-2"
                >
                  並び順
                </label>
                <select
                  id="order"
                  value={filters.order}
                  onChange={(e) =>
                    handleOrderChange(e.target.value as 'asc' | 'desc')
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="desc">降順（新しい順）</option>
                  <option value="asc">昇順（古い順）</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 記事一覧 */}
        <div className="space-y-4 mb-6">
          {articles.map((article) => (
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
                <div className="flex gap-4">
                  {article.source && (
                    <span>ソース: {article.source.name}</span>
                  )}
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
            </div>
          ))}
          {articles.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center text-gray-500">
              記事がありません
            </div>
          )}
        </div>

        {/* ページネーション */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              前へ
            </button>
            <span className="px-4 py-2">
              {pagination.page} / {pagination.totalPages} ページ
              （全 {pagination.total} 件）
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              次へ
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
