'use client';

import { useJobs, useRetryJob } from '@/src/hooks/useJobs';
import { useSources } from '@/src/hooks/useSources';
import { useState } from 'react';
import Link from 'next/link';
import type { GetJobsParams } from '@/src/lib/api';

export default function JobsPage() {
  const [filters, setFilters] = useState<GetJobsParams>({
    page: 1,
    limit: 20,
  });
  const [selectedStatus, setSelectedStatus] = useState<
    'success' | 'failed' | undefined
  >(undefined);
  const [selectedSourceId, setSelectedSourceId] = useState<string>('');

  const { data, isLoading, error } = useJobs(filters);
  const { data: sources } = useSources();
  const retryJob = useRetryJob();
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleStatusFilter = (status: 'success' | 'failed' | undefined) => {
    setSelectedStatus(status);
    setFilters((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  const handleSourceFilter = (sourceId: string) => {
    setSelectedSourceId(sourceId);
    setFilters((prev) => ({
      ...prev,
      sourceId: sourceId || undefined,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = async (jobId: string, sourceName: string) => {
    if (confirm(`"${sourceName}" のジョブをリトライしますか？`)) {
      setNotification(null);
      try {
        const result = await retryJob.mutateAsync(jobId);
        setNotification({
          type: 'success',
          message: `リトライ成功: ${result.message}`,
        });
        setTimeout(() => setNotification(null), 5000);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'リトライに失敗しました';
        setNotification({
          type: 'error',
          message: `リトライ失敗: ${errorMessage}`,
        });
        setTimeout(() => setNotification(null), 5000);
      }
    }
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
                : 'ジョブ履歴の取得に失敗しました。バックエンドサーバーが起動しているか確認してください。'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const jobs = data?.jobs || [];
  const pagination = data?.pagination;
  const statistics = data?.statistics;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">ジョブ履歴</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            ホーム
          </Link>
        </div>

        {notification && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              notification.type === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <p
              className={
                notification.type === 'success'
                  ? 'text-green-800'
                  : 'text-red-800'
              }
            >
              {notification.message}
            </p>
          </div>
        )}

        {/* 統計情報 */}
        {statistics && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">統計情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">総ジョブ数</p>
                <p className="text-2xl font-bold text-blue-600">
                  {statistics.totalJobs}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">成功</p>
                <p className="text-2xl font-bold text-green-600">
                  {statistics.successCount}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">失敗</p>
                <p className="text-2xl font-bold text-red-600">
                  {statistics.failedCount}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">平均実行時間</p>
                <p className="text-2xl font-bold text-purple-600">
                  {statistics.averageDuration !== null
                    ? `${(statistics.averageDuration / 1000).toFixed(2)}秒`
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* フィルタ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ステータスフィルタ */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium mb-2"
              >
                ステータスでフィルタ
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusFilter(undefined)}
                  className={`px-3 md:px-4 py-2 rounded text-sm ${
                    selectedStatus === undefined
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => handleStatusFilter('success')}
                  className={`px-3 md:px-4 py-2 rounded text-sm ${
                    selectedStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  成功
                </button>
                <button
                  onClick={() => handleStatusFilter('failed')}
                  className={`px-3 md:px-4 py-2 rounded text-sm ${
                    selectedStatus === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  失敗
                </button>
              </div>
            </div>

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
                value={selectedSourceId}
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
          </div>
        </div>

        {/* ジョブ一覧 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    実行日時
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ソース
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    実行時間
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    取得記事数
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    エラー
                  </th>
                  <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                      {new Date(job.createdAt).toLocaleString('ja-JP', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-xs md:text-sm font-medium text-gray-900">
                        {job.source.name}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 hidden sm:block">
                        <a
                          href={job.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {job.source.url.length > 30
                            ? `${job.source.url.substring(0, 30)}...`
                            : job.source.url}
                        </a>
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          job.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {job.status === 'success' ? '成功' : '失敗'}
                      </span>
                      <div className="sm:hidden text-xs text-gray-500 mt-1">
                        {job.duration !== null
                          ? `${(job.duration / 1000).toFixed(2)}秒`
                          : 'N/A'}
                        {' / '}
                        {job.articleCount !== null ? job.articleCount : 'N/A'}件
                      </div>
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden sm:table-cell">
                      {job.duration !== null
                        ? `${(job.duration / 1000).toFixed(2)}秒`
                        : 'N/A'}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                      {job.articleCount !== null ? job.articleCount : 'N/A'}
                    </td>
                    <td className="px-3 md:px-6 py-4 text-xs md:text-sm text-gray-500 hidden lg:table-cell">
                      {job.error ? (
                        <details className="cursor-pointer">
                          <summary className="text-red-600 hover:text-red-800">
                            エラー詳細
                          </summary>
                          <div className="mt-2 p-2 bg-red-50 rounded text-xs break-words">
                            {job.error}
                          </div>
                        </details>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                      {job.status === 'failed' && (
                        <button
                          onClick={() => handleRetry(job.id, job.source.name)}
                          disabled={retryJob.isPending}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {retryJob.isPending ? 'リトライ中...' : 'リトライ'}
                        </button>
                      )}
                      {job.error && (
                        <details className="lg:hidden text-xs text-gray-500 mt-1">
                          <summary className="cursor-pointer text-red-600">
                            エラー
                          </summary>
                          <div className="mt-1 p-2 bg-red-50 rounded text-xs break-words">
                            {job.error}
                          </div>
                        </details>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {jobs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              ジョブ履歴がありません
            </div>
          )}
        </div>

        {/* ページネーション */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center items-center gap-2">
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
