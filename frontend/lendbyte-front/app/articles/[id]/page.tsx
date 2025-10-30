"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { ArticleDetail } from "@/components/ArticleDetail";
import { fetchArticleById, getArticleImageUrl } from "@/lib/api";
import { Article } from "@/types/article";

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  const loadArticle = async () => {
    setLoading(true);
    const data = await fetchArticleById(id);
    setArticle(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchArticleById(id);
        setArticle(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading article...</div>
      </main>
    );
  }

  if (!article) {
    notFound();
  }

  const imageUrl = getArticleImageUrl(article.id, article.hasImage);

  return (
    <ArticleDetail
      article={article}
      imageUrl={imageUrl}
      onLevelUpdate={loadArticle}
    />
  );
}
