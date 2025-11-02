'use client';

import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useState, useCallback, FormEvent } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((e: FormEvent) => {
    e.preventDefault();
    const term = searchTerm.trim();
    router.push(term ? `/?search=${encodeURIComponent(term)}` : "/");
  }, [searchTerm, router]);

  return (
    <header className="bg-gray-950 border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white cursor-pointer hover:text-blue-400 transition">
            LevelByte
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition"
            >
              Contact
            </Link>

            {user?.role === "Admin" && (
              <Link 
                href="/dashboard" 
                className="text-gray-300 hover:text-white hover:bg-gray-600 px-3 py-2 rounded transition"
                >
                Dashboard
              </Link>
            )}

            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              />
              <button 
              type="submit" 
              className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                <FaSearch size={20} className="text-white" />
              </button>
            </form>

            {user && (
              <div className="flex items-center gap-3 ml-4">
                <FaUser size={28} className="text-green-600" />
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}