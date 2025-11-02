'use client';

import { Suspense } from "react";
import Image from "next/image";
import Link from 'next/link';

function NotFoundContent() {
  return (
    <main className="bg-gray-900 flex items-start justify-center min-h-screen pt-8">
      <div className="relative w-full max-w-[120vh] h-[80vh] mt-4 flex items-center justify-center text-center rounded-lg overflow-hidden">
        <Image
          src="/notfound.gif"
          alt="Página não encontrada"
          fill
          className="object-cover object-top opacity-80"
          priority
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center mt-10">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Page not found
          </h1>

          <p className="text-gray-300 mb-8 max-w-xl">
            Looks like you got lost... but that’s okay. You can go back to the
            home page.
          </p>
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-400">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
