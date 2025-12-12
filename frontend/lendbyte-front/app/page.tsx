"use client";
import { useEffect, useState, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardData } from "@/types/article";
import { fetchArticles, getArticleImageUrl } from "@/lib/api";
import Link from "next/link";
import { FaSearch, FaNewspaper, FaGraduationCap } from "react-icons/fa";
import { Pagination } from "@/components/Pagination";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termFromUrl = searchParams.get("search") || "";
  const pageFromUrl = parseInt(searchParams.get("page") || "1");

  const [searchTerm, setSearchTerm] = useState(termFromUrl);
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [articles, setArticles] = useState<ArticleCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const pageSize = 9;

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles(
          termFromUrl || undefined,
          pageFromUrl,
          pageSize
        );

        const levelOneArticles: ArticleCardData[] = data.items
          .map((article) => {
            const levelOne = article.levels.find((lvl) => lvl.level === 1);
            if (!levelOne) return null;

            const imageUrl = getArticleImageUrl(article.imageUrl);

            return {
              id: article.id,
              title: article.title,
              date: new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
              content: levelOne.text,
              image: imageUrl,
            };
          })
          .filter((a): a is ArticleCardData => Boolean(a));

        setArticles(levelOneArticles);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
        setHasPreviousPage(data.hasPreviousPage);
        setHasNextPage(data.hasNextPage);
        setCurrentPage(data.pageNumber);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [termFromUrl, pageFromUrl]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();

    const params = new URLSearchParams();
    if (trimmed) params.set("search", trimmed);
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (termFromUrl) params.set("search", termFromUrl);
    params.set("page", page.toString());

    router.push(`/?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-900 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        {!termFromUrl && currentPage === 1 && (
          <div className="mb-12">
            <div className="bg-linear-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Master English Through Technology
                </h1>
                <p className="text-xl text-blue-100 mb-6">
                  Read real tech news adapted to your level. Learn naturally, stay informed, and level up your English.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <FaNewspaper className="text-blue-200" />
                    <span className="text-sm font-medium">Daily Tech News</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <FaGraduationCap className="text-blue-200" />
                    <span className="text-sm font-medium">2 Difficulty Levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 px-5 py-4 pr-24 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <FaSearch size={18} />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {termFromUrl ? `Search Results` : "Latest Articles"}
            </h2>
            {termFromUrl && (
              <p className="text-gray-400 mt-1">
                Found <span className="font-semibold text-blue-400">{totalCount}</span> articles for &quot;{termFromUrl}&quot;
              </p>
            )}
          </div>
          {totalCount > 0 && !termFromUrl && (
            <p className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
              {totalCount} articles available
            </p>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-200 px-6 py-4 rounded-xl text-center">
            {error}
          </div>
        )}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 shadow-xl max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">
                {termFromUrl
                  ? `No articles match "${termFromUrl}". Try a different search term.`
                  : "No articles available at the moment."}
              </p>
              {termFromUrl && (
                <Link
                  href="/"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium"
                >
                  View all articles
                </Link>
              )}
            </div>
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  hasPreviousPage={hasPreviousPage}
                  hasNextPage={hasNextPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="bg-gray-900 min-h-screen flex items-center justify-center pt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}