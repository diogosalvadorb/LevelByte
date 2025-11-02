"use client";
import { useEffect, useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardData } from "@/types/article";
import { fetchArticles, getArticleImageUrl } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const termFromUrl = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(termFromUrl);
  const [articles, setArticles] = useState<ArticleCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles(termFromUrl || undefined);

        const levelOneArticles: ArticleCardData[] = data
          .map((article) => {
            const levelOne = article.levels.find((lvl) => lvl.level === 1);
            if (!levelOne) return null;

            const imageUrl = getArticleImageUrl(article.imageUrl);

            return {
              id: article.id,
              title: article.title,
              date: new Date(article.createdAt).toLocaleDateString("pt-BR"),
              content: levelOne.text,
              image: imageUrl,
            };
          })
          .filter((a): a is ArticleCardData => Boolean(a));

        setArticles(levelOneArticles);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [termFromUrl]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    router.push(trimmed ? `/?search=${encodeURIComponent(trimmed)}` : "/");
  };

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
          {termFromUrl ? `Results for "${termFromUrl}"` : "Latest Articles"}
        </h1>

        {loading && (
          <p className="text-center text-gray-400">Loading articles...</p>
        )}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && !error && articles.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">
              {termFromUrl
                ? `No articles found matching "${termFromUrl}".`
                : "No articles found."}
            </p>
            {termFromUrl && (
              <Link
                href="/"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Clear search and view all articles
              </Link>
            )}
          </div>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">

              <div className="flex-1">
                <ArticleCard {...articles[0]} />
              </div>

              <form
                onSubmit={handleSearch}
                className="flex gap-2 mt-4 md:mt-2 md:w-94 md:self-start"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {articles.slice(1).map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}