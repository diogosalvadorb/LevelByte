'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaUser } from 'react-icons/fa';

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="bg-gray-950 border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
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
    </header>
  );
}
