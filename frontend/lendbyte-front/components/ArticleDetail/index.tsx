"use client";

import { useState } from "react";
import Image from "next/image";
import { Article } from "@/types/article";
import { Container } from "../Container";

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  const [selectedLevel, setSelectedLevel] = useState(1);

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

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center py-10">
      <Container>

      
      <div className="w-full max-w-[700px]">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">

          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {article.title}
            </h1>

            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                {new Date(article.createdAt).toLocaleDateString("pt-BR")}
              </p>

              <div className="flex gap-2">
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
              </div>
            </div>
          </div>


          <div className="flex gap-4 mb-4">
            <div className="shrink-0 w-50 h-28 relative">
              <Image
                src="/notfound.gif"
                alt={article.title}
                fill
                className="object-cover rounded"
              />
            </div>

            {currentLevelData && (
              <div className="flex-1">
                <p className="text-gray-800 text-sm leading-relaxed">
                  {currentLevelData.text}
                </p>
              </div>
            )}
          </div>

          {currentLevelData && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <audio controls className="w-full">
                <source src={currentLevelData.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          
        </div>
      </div>
      </Container>
    </main>
  );
}
