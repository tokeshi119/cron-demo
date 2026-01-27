import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">RSS記事取得システム</h1>
        <nav className="space-x-4 mb-8">
          <Link
            href="/sources"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ソース管理
          </Link>
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            記事一覧
          </Link>
        </nav>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-700 dark:text-gray-300">
            RSSフィードから技術記事を取得・管理するシステムです。
          </p>
        </div>
      </div>
    </main>
  );
}
