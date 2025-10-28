import { notFound } from "next/navigation";
import { ArticleDetail } from "@/components/ArticleDetail";
import { fetchArticleById, getArticleImageUrl } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  
  const article = await fetchArticleById(id);

  if (!article) {
    notFound();
  }

  const imageUrl = getArticleImageUrl(article.id, article.hasImage);

  return (
    <main className="bg-gray-900 min-h-screen">
        <div className="py-8 flex justify-center">
          <div className="w-full max-w-[700px]">
            <ArticleDetail article={article} imageUrl={imageUrl} />
          </div>
        </div>
    </main>
  );
}