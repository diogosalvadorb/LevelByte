'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gray-950 border-b border-gray-800 fixed w-full z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition">
          LevelByte
        </Link>

        <button
          onClick={toggleMenu}
          className="text-gray-300 hover:text-white focus:outline-none md:hidden"
          aria-label="Abrir menu"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-3">
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
              <FaUser size={24} className="text-green-600" />
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
            {/* Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 py-4 px-6 flex flex-col gap-2">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition"
          >
            Contact
          </Link>

          {user?.role === 'Admin' && (
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded transition"
            >
              Dashboard
            </Link>
          )}

          {user && (
            <div className="flex items-center gap-3 mt-3">
              <FaUser size={22} className="text-green-600" />
              <button
                onClick={() => {
                  closeMenu();
                  signOut({ callbackUrl: '/login' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
