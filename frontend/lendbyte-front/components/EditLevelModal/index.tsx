"use client";

import { useState, useEffect, FormEvent } from "react";
import { FaTimes } from "react-icons/fa";
import { updateArticleLevel } from "@/lib/api";
import { ArticleLevel } from "@/types/article";

interface EditLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  articleId: string;
  level: ArticleLevel;
}

export default function EditLevelModal({
  isOpen,
  onClose,
  onSuccess,
  articleId,
  level,
}: EditLevelModalProps) {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && level) {
      setText(level.text);
      setAudioUrl(level.audioUrl);
      setError("");
    }
  }, [isOpen, level]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Text is required");
      return;
    }

    if (!audioUrl.trim()) {
      setError("Audio URL is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateArticleLevel(articleId, level.id, text.trim(), audioUrl.trim());
      onSuccess();
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setText("");
      setAudioUrl("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  const getLevelName = (levelNumber: number) => {
    return levelNumber === 1 ? "Basic" : "Advanced";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 bg-opacity-40 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Edit {getLevelName(level.level)} Level
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Article Text *
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] resize-y font-mono text-sm"
              placeholder="Enter the article text"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-400 mt-2">
              Word count: {text.split(/\s+/).filter(Boolean).length}
            </p>
          </div>

          <div>
            <label
              htmlFor="audioUrl"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Audio URL *
            </label>
            <input
              type="text"
              id="audioUrl"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/audio/article_basic.mp3"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-400 mt-2">
              Enter the path or URL for the audio file
            </p>
          </div>

          <div className="bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              <strong>Note:</strong> Editing the text or audio URL will only
              update this specific level. The word count will be automatically
              recalculated.
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}