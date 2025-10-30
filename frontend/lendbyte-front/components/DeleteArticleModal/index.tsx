"use client";

import { FaTimes } from "react-icons/fa";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  articleTitle: string;
  isDeleting: boolean;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  articleTitle,
  isDeleting,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 bg-opacity-40 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Delete Article</h2>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-2">
            Are you sure you want to delete this article?
          </p>
          <p className="text-white font-semibold mb-4">{articleTitle}</p>
          <p className="text-red-400 text-sm">
            This action cannot be undone. The article and all its content will
            be permanently deleted.
          </p>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t border-gray-700">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Delete Article"}
          </button>
        </div>
      </div>
    </div>
  );
}