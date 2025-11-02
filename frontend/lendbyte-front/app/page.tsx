"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardData } from "@/types/article";
import { fetchArticles, getArticleImageUrl } from "@/lib/api";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const [articles, setArticles] = useState<ArticleCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles(searchTerm || undefined);

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
  }, [searchTerm]);

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-8">
          {searchTerm
            ? `Search Results for "${searchTerm}"`
            : "Latest Articles"}
        </h1>

        {searchTerm && (
          <p className="text-center text-gray-400 mb-6">
            Found {articles.length} article{articles.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-400">Loading articles...</p>
      )}

      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-400 mb-4">
            {searchTerm
              ? `No articles found matching "${searchTerm}"`
              : "No articles found."}
          </p>
          {searchTerm && (
            <Link
              href="/"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Clear search and view all articles
            </Link>
          )}
        </div>
      )}

      <div className="flex flex-col gap-6 items-center pb-12">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </main>
  );
}