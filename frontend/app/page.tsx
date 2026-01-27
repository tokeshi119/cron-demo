import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8">
          RSS記事取得システム
        </h1>
        <nav className="grid grid-cols-2 md:flex md:space-x-4 gap-2 md:gap-0 mb-6 md:mb-8">
          <Link
            href="/sources"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            ソース管理
          </Link>
          <Link
            href="/articles"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            記事一覧
          </Link>
          <Link
            href="/jobs"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            ジョブ履歴
          </Link>
          <Link
            href="/outbox"
            className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base"
          >
            Outboxタスク
          </Link>
        </nav>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            RSSフィードから技術記事を取得・管理するシステムです。
          </p>
        </div>
      </div>
    </main>
  );
}
