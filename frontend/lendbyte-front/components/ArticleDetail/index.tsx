"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import { Article, ArticleLevel } from "@/types/article";
import EditLevelModal from "../EditLevelModal";


interface ArticleDetailProps {
  article: Article;
  imageUrl: string;
  onLevelUpdate?: () => void;
}

export function ArticleDetail({ article, imageUrl, onLevelUpdate }: ArticleDetailProps) {
  const { data: session } = useSession();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [levelToEdit, setLevelToEdit] = useState<ArticleLevel | null>(null);

  const currentLevelData = article.levels.find(
    (lvl) => lvl.level === selectedLevel
  );

  const availableLevels = article.levels
    .map((lvl) => lvl.level)
    .sort((a, b) => a - b);

  const getLevelLabel = (level: number) => {
    const labels: { [key: number]: string } = {
      1: "Article Basic",
      2: "Article Advanced",
    };
    return labels[level] || `Level ${level}`;
  };

  const handleEditLevel = (level: ArticleLevel) => {
    setLevelToEdit(level);
    setIsEditModalOpen(true);
  };

  const handleLevelUpdateSuccess = () => {
    setIsEditModalOpen(false);
    setLevelToEdit(null);
    if (onLevelUpdate) {
      onLevelUpdate();
    }
  };

  const isAdmin = session?.user?.role === "Admin";

  return (
    <>
      <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
        <div className="w-full max-w-[700px]">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {article.title}
              </h1>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
              <p className="text-gray-600 text-sm">
                {new Date(article.createdAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              <div className="flex gap-2 items-center">
                {availableLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-all cursor-pointer ${
                      selectedLevel === level
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {getLevelLabel(level)}
                  </button>
                ))}
                
                {isAdmin && currentLevelData && (
                  <button
                    onClick={() => handleEditLevel(currentLevelData)}
                    className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded transition-all cursor-pointer flex items-center gap-1"
                    title="Edit this level"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                )}
              </div>
            </div>

            {currentLevelData && (
              <div className="text-gray-800 text-[15px] leading-relaxed">
                <div className="relative w-48 h-32 float-left mr-4 mb-2">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover rounded-md"
                  />
                </div>

                {currentLevelData.text
                  .split(/\n+/)
                  .map((paragraph, index) => {
                    const cleanParagraph = paragraph.trim();

                    if (!cleanParagraph) return null;

                    return (
                      <p key={index} className="mb-4">
                        {cleanParagraph}
                      </p>
                    );
                  })}

                <div className="clear-both" />
              </div>
            )}

            {currentLevelData?.audioUrl && (
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <audio controls className="w-full">
                  <source src={currentLevelData.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
          </div>
        </div>
      </main>

      {levelToEdit && (
        <EditLevelModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setLevelToEdit(null);
          }}
          onSuccess={handleLevelUpdateSuccess}
          articleId={article.id}
          level={levelToEdit}
        />
      )}
    </>
  );
}