"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Article } from "@/types/article";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import CreateArticleModal from "@/components/CreateArticleModal";
import { fetchArticles } from "@/lib/api";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== "Admin") {
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user.role === "Admin") {
      loadArticles();
    }
  }, [session]);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await fetchArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (articleId: string) => {
    console.log("Edit article:", articleId);
  };

  const handleDelete = (articleId: string) => {
    console.log("Delete article:", articleId);
  };

  if (status === "loading") {
    return <div className="text-center mt-10 text-white">Carregando...</div>;
  }

  if (session?.user.role !== "Admin") {
    return null;
  }

  const handleCreateArticle = () => {
    setIsModalOpen(false);
    loadArticles();
  };

  const getPreviewText = (article: Article): string => {
    const basicLevel = article.levels.find((level) => level.level === 1);
    if (basicLevel) {
      return basicLevel.text.substring(0, 150) + "...";
    }
    return "No preview available";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            <FaPlus />
            New Article
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">
            Loading articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No articles found. Create your first article!
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full table-fixed">
              <thead className="bg-gray-700">
                <tr>
                  <th className="w-1/5 px-4 py-3 text-left text-sm font-semibold text-gray-200">
                    Title
                  </th>
                  <th className="w-1/6 px-4 py-3 text-left text-sm font-semibold text-gray-200">
                    Date
                  </th>
                  <th className="w-1/2 px-4 py-3 text-left text-sm font-semibold text-gray-200">
                    Preview
                  </th>
                  <th className="w-[100px] px-2 py-3 text-center text-sm font-semibold text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium truncate">
                      {article.title}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">
                      {formatDate(article.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm line-clamp-2 truncate">
                      {getPreviewText(article)}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(article.id)}
                          className="text-blue-400 hover:text-blue-300 transition-colors p-2 cursor-pointer"
                          title="Edit"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                          title="Delete"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CreateArticleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreateArticle}
      />
    </div>
  );
}