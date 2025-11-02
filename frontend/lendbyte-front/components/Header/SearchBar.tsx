"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const currentSearch = params.get("search") || "";
  const [term, setTerm] = useState(currentSearch);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = term.trim();
    router.push(trimmed ? `/?search=${encodeURIComponent(trimmed)}` : "/");
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search articles..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
      />
      <button
        type="submit"
        className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition"
      >
        <FaSearch size={20} className="text-white" />
      </button>
    </form>
  );
}
