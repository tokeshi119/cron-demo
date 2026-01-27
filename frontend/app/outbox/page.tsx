'use client';

import { useOutbox, useRetryOutboxTask } from '@/src/hooks/useOutbox';
import { useState } from 'react';
import Link from 'next/link';

export default function OutboxPage() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data: tasks, isLoading, error } = useOutbox(
    statusFilter || undefined,
  );
  const retryTask = useRetryOutboxTask();

  const handleRetry = async (id: string) => {
    if (confirm('このタスクをリトライしますか？')) {
      try {
        await retryTask.mutateAsync(id);
      } catch (error) {
        console.error('リトライに失敗しました:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return '待機中';
      case 'processing':
        return '処理中';
      case 'done':
        return '完了';
      case 'failed':
        return '失敗';
      default:
        return status;
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
                : 'Outboxタスクの取得に失敗しました。バックエンドサーバーが起動しているか確認してください。'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Outboxタスク一覧</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            ホーム
          </Link>
        </div>

        {/* フィルタ */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6">
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
              ステータスでフィルタ
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">すべて</option>
              <option value="pending">待機中</option>
              <option value="processing">処理中</option>
              <option value="done">完了</option>
              <option value="failed">失敗</option>
            </select>
          </div>
        </div>

        {/* タスク一覧 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  タイプ
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  リトライ回数
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  作成日時
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  処理日時
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks?.map((task) => (
                <tr key={task.id}>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-mono text-gray-500">
                    {task.id.substring(0, 8)}...
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {task.type}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {getStatusLabel(task.status)}
                    </span>
                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                      リトライ: {task.retryCount}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden sm:table-cell">
                    {task.retryCount}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                    {new Date(task.createdAt).toLocaleString('ja-JP', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden lg:table-cell">
                    {task.processedAt
                      ? new Date(task.processedAt).toLocaleString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                    {task.status === 'failed' && task.retryCount < 3 && (
                      <button
                        onClick={() => handleRetry(task.id)}
                        disabled={retryTask.isPending}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                      >
                        リトライ
                      </button>
                    )}
                    {task.error && (
                      <details className="text-xs text-gray-500">
                        <summary className="cursor-pointer hover:text-gray-700">
                          エラー詳細
                        </summary>
                        <div className="mt-2 p-2 bg-red-50 rounded text-red-800 break-words">
                          {task.error}
                        </div>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {tasks?.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              タスクがありません
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
