import { notFound } from "next/navigation";
import { apiService } from "@/api/api";
import { ArticleDetail } from "@/components/ArticleDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  
  const article = await apiService.fetchArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-gray-900 min-h-screen">
        <div className="py-8 flex justify-center">
          <div className="w-full max-w-[700px]">
            <ArticleDetail article={article} />
          </div>
        </div>
    </main>
  );
}