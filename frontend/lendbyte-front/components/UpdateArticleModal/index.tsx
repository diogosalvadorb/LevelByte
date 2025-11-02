"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import Image from "next/image";
import { updateArticle } from "@/lib/api";
import { Article } from "@/types/article";

interface UpdateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  article: Article;
}

export default function UpdateArticleModal({
  isOpen,
  onClose,
  onSuccess,
  article,
}: UpdateArticleModalProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [removeImage, setRemoveImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && article) {
      setTitle(article.title);
      setImagePreview("");
      setImage(null);
      setRemoveImage(false);
      setError("");
    }
  }, [isOpen, article]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should not exceed 5MB");
        return;
      }

      setImage(file);
      setRemoveImage(false);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview("");
    setRemoveImage(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateArticle(
        article.id,
        title.trim(),
        image ?? undefined,
        removeImage
      );

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
      setTitle("");
      setImage(null);
      setImagePreview("");
      setRemoveImage(false);
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 bg-opacity-40 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Update Article</h2>
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
              htmlFor="title"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter article title"
              disabled={isSubmitting}
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Image (Optional)
            </label>
            <div className="flex flex-col gap-4">
              {!removeImage && article.imageUrl && !imagePreview && (
                <div className="relative">
                  <Image
                    src={article.imageUrl}
                    alt="Current"
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              )}

              <label
                htmlFor="image"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-650 transition-colors"
              >
                <FaUpload className="text-gray-400" />
                <span className="text-gray-300">
                  {image ? image.name : "Choose a new image"}
                </span>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>

              {imagePreview && (
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={800}
                    height={400}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    disabled={isSubmitting}
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Accepted formats: JPG, PNG, GIF. Max size: 5MB
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
              {isSubmitting ? "Updating..." : "Update Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
