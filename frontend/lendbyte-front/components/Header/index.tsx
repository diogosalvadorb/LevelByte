"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaBook,
  FaInfoCircle,
  FaEnvelope,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow overflow-hidden bg-gray-900">
              <Image
                src="/logo.png"
                alt="Level Byte Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>

            <div>
              <span className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Level Byte
              </span>
              <p className="text-xs text-gray-400 font-medium">
                Learn • Read • Master
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all font-medium"
            >
              <FaBook size={16} />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all font-medium"
            >
              <FaInfoCircle size={16} />
              About
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all font-medium"
            >
              <FaEnvelope size={16} />
              Contact
            </Link>

            {user?.role === "Admin" && (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all font-medium"
              >
                <FaTachometerAlt size={16} />
                Dashboard
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                <div className="w-9 h-9 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                  <FaUser size={16} className="text-white" />
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all font-medium shadow-sm hover:shadow-md cursor-pointer"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            )}
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none p-2 hover:bg-gray-800 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 px-4 py-3 rounded-lg transition-all font-medium"
            >
              <FaBook size={18} />
              Home
            </Link>
            <Link
              href="/about"
              onClick={closeMenu}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 px-4 py-3 rounded-lg transition-all font-medium"
            >
              <FaInfoCircle size={18} />
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 px-4 py-3 rounded-lg transition-all font-medium"
            >
              <FaEnvelope size={18} />
              Contact
            </Link>

            {user?.role === "Admin" && (
              <Link
                href="/dashboard"
                onClick={closeMenu}
                className="flex items-center gap-3 text-gray-300 hover:text-blue-400 hover:bg-gray-700 px-4 py-3 rounded-lg transition-all font-medium"
              >
                <FaTachometerAlt size={18} />
                Dashboard
              </Link>
            )}

            {user && (
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-700 px-4">
                <div className="w-10 h-10 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                  <FaUser size={18} className="text-white" />
                </div>
                <button
                  onClick={() => {
                    closeMenu();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all font-medium cursor-pointer flex-1 justify-center"
                >
                  <FaSignOutAlt size={14} />
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
