import Link from "next/link";

export default function About() {
  return (
    <main className="bg-gray-900 text-white min-h-screen pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-400 text-center sm:text-left ">
          About — Level Byte
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg text-center sm:text-left">
            Level Byte is a learning platform designed to help people improve their English 
            while exploring the world of technology.
          </p>

          <p className="text-center sm:text-left">
            We transform complex tech topics into clear and accessible articles
            written in two levels:
          </p>

          <div className="bg-gray-800 rounded-lg p-5 sm:p-6 space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Basic Level</h2>
              <p>
                Simple English for beginners and intermediate learners. Each article uses short sentences 
                and easy vocabulary.
              </p>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Advanced Level</h2>
              <p>
                A more detailed and technical version for developers, IT students, and professionals 
                who want to master English used in the tech industry.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-700 text-center sm:text-left">
            <p className="text-lg mb-4">Have suggestions or feedback?</p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Send us your suggestions
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}