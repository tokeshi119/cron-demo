'use client';

import {
  useSources,
  useCreateSource,
  useDeleteSource,
  useUpdateSource,
  useFetchSource,
} from '@/src/hooks/useSources';
import { useState } from 'react';
import Link from 'next/link';

export default function SourcesPage() {
  const { data: sources, isLoading, error } = useSources();
  const createSource = useCreateSource();
  const deleteSource = useDeleteSource();
  const updateSource = useUpdateSource();
  const fetchSource = useFetchSource();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    enabled: true,
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [fetchingSourceId, setFetchingSourceId] = useState<string | null>(
    null,
  );
  const [selectedSourceForFetch, setSelectedSourceForFetch] = useState<string>(
    '',
  );
  const [isBulkFetching, setIsBulkFetching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSource.mutateAsync(formData);
      setFormData({ url: '', name: '', enabled: true });
      setShowForm(false);
    } catch (error) {
      console.error('ソースの作成に失敗しました:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('このソースを削除しますか？')) {
      try {
        await deleteSource.mutateAsync(id);
      } catch (error) {
        console.error('ソースの削除に失敗しました:', error);
      }
    }
  };

  const handleToggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      await updateSource.mutateAsync({
        id,
        data: { enabled: !currentEnabled },
      });
    } catch (error) {
      console.error('ソースの更新に失敗しました:', error);
    }
  };

  const handleFetch = async (id: string, name: string) => {
    setFetchingSourceId(id);
    setNotification(null);
    try {
      const result = await fetchSource.mutateAsync(id);
      setNotification({
        type: 'success',
        message: `${name}: ${result.message} (${result.articleCount}件の記事を取得)`,
      });
      // 3秒後に通知を自動的に非表示
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'RSS取得に失敗しました';
      setNotification({
        type: 'error',
        message: `${name}: ${errorMessage}`,
      });
      // 5秒後に通知を自動的に非表示
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setFetchingSourceId(null);
    }
  };

  const handleBulkFetch = async () => {
    if (!selectedSourceForFetch) {
      setNotification({
        type: 'error',
        message: 'ソースを選択してください',
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const selectedSource = sources?.find(
      (s) => s.id === selectedSourceForFetch,
    );
    if (!selectedSource) {
      return;
    }

    setIsBulkFetching(true);
    setNotification(null);
    try {
      const result = await fetchSource.mutateAsync(selectedSourceForFetch);
      setNotification({
        type: 'success',
        message: `${selectedSource.name}: ${result.message} (${result.articleCount}件の記事を取得)`,
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'RSS取得に失敗しました';
      setNotification({
        type: 'error',
        message: `${selectedSource.name}: ${errorMessage}`,
      });
      setTimeout(() => setNotification(null), 5000);
    } finally {
      setIsBulkFetching(false);
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
                : 'ソースの取得に失敗しました。バックエンドサーバーが起動しているか確認してください。'}
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
          <h1 className="text-2xl md:text-4xl font-bold">ソース管理</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base text-center sm:text-left"
            >
              ホーム
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              {showForm ? 'キャンセル' : '新規追加'}
            </button>
          </div>
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

        {/* 一括取得セクション */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">RSS取得</h2>
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-1">
              <label
                htmlFor="source-select"
                className="block text-sm font-medium mb-2"
              >
                ソースを選択して取得
              </label>
              <select
                id="source-select"
                value={selectedSourceForFetch}
                onChange={(e) => setSelectedSourceForFetch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isBulkFetching}
              >
                <option value="">ソースを選択してください</option>
                {sources
                  ?.filter((s) => s.enabled)
                  .map((source) => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              onClick={handleBulkFetch}
              disabled={!selectedSourceForFetch || isBulkFetching}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            >
              {isBulkFetching ? '取得中...' : '選択したソースを取得'}
            </button>
          </div>
          <p className="mt-2 text-xs md:text-sm text-gray-500">
            ※ Cronジョブは5分ごとに自動実行されます（検証用設定）
          </p>
        </div>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              新しいソースを追加
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2">
                  名前
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="url" className="block mb-2">
                  RSSフィードURL
                </label>
                <input
                  type="url"
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) =>
                      setFormData({ ...formData, enabled: e.target.checked })
                    }
                    className="mr-2"
                  />
                  有効
                </label>
              </div>
              <button
                type="submit"
                disabled={createSource.isPending}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 w-full md:w-auto"
              >
                {createSource.isPending ? '作成中...' : '作成'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  名前
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  URL
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状態
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  作成日時
                </th>
                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sources?.map((source) => (
                <tr key={source.id}>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {source.name}
                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        {source.url.length > 40
                          ? `${source.url.substring(0, 40)}...`
                          : source.url}
                      </a>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {source.url}
                    </a>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        handleToggleEnabled(source.id, source.enabled)
                      }
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        source.enabled
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {source.enabled ? '有効' : '無効'}
                    </button>
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {new Date(source.createdAt).toLocaleString('ja-JP')}
                  </td>
                  <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-1 md:space-x-2">
                    <button
                      onClick={() => handleFetch(source.id, source.name)}
                      disabled={
                        fetchingSourceId === source.id || !source.enabled
                      }
                      className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm font-medium ${
                        source.enabled
                          ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {fetchingSourceId === source.id
                        ? '取得中...'
                        : '取得'}
                    </button>
                    <button
                      onClick={() => handleDelete(source.id)}
                      className="text-red-600 hover:text-red-900 text-xs md:text-sm"
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {sources?.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              ソースが登録されていません
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
