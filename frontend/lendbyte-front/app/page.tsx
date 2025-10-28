"use client";
import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCardData } from "@/types/article";
import { fetchArticles, getArticleImageUrl } from "@/lib/api";

export default function Home() {
  const [articles, setArticles] = useState<ArticleCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles(); 

        const levelOneArticles: ArticleCardData[] = data
          .map((article) => {
            const levelOne = article.levels.find((lvl) => lvl.level === 1);
            if (!levelOne) return null;

            const imageUrl = getArticleImageUrl(article.id, article.hasImage);

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
  }, []);

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mt-8 mb-8">
        Latest Articles
      </h1>

      {loading && (
        <p className="text-center text-gray-400">Loading articles...</p>
      )}

      {error && (
        <p className="text-center text-red-400">{error}</p>
      )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-gray-400">No articles found.</p>
      )}

      <div className="flex flex-col gap-6 items-center pb-12">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </main>
  );
}