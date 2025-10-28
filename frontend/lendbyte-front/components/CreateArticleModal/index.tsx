"use client";

import { apiService } from "@/api/api";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import Image from "next/image";

interface CreateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateArticleModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateArticleModalProps) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!theme.trim()) {
      setError("Theme is required");
      return;
    }

    if (theme.length > 5000) {
      setError("Theme cannot exceed 5000 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiService.createArticle(
        title.trim(),
        theme.trim(),
        image ?? undefined
      );

      setTitle("");
      setTheme("");
      setImage(null);
      setImagePreview("");

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle("");
      setTheme("");
      setImage(null);
      setImagePreview("");
      setError("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 bg-opacity-40 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Create New Article</h2>
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
              <label
                htmlFor="image"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-650 transition-colors"
              >
                <FaUpload className="text-gray-400" />
                <span className="text-gray-300">
                  {image ? image.name : "Choose an image"}
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

          <div>
            <label
              htmlFor="theme"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Theme *
            </label>
            <textarea
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-y"
              placeholder="Enter a phrase or text (max 5000 characters)"
              disabled={isSubmitting}
              maxLength={5000}
            />
            <p className="text-sm text-gray-400 mt-2">
              {theme.length} / 5000 characters
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
              {isSubmitting ? "Creating..." : "Create Article"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
