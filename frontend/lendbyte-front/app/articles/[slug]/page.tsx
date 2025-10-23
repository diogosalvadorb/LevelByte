import { Container } from "@/components/Container";
import Image from "next/image";

interface ArticlePageProps {
  params: { slug: string };
}

const articles = [
  {
    slug: "titulo-1",
    title: "Titulo 1",
    date: "2025-05-01",
    content: `Texto completo do artigo 1.`,
  },
  {
    slug: "titulo-2",
    title: "Titulo 2",
    date: "2025-05-02",
    content: `Texto completo do artigo 2.`,
  },
  {
    slug: "titulo-3",
    title: "Titulo 3",
    date: "2025-05-10",
    content: `Texto completo do artigo 3.`,
  },
];


export default function ArticlePage({ params }: ArticlePageProps) {
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <Container>
        <p className="text-gray-300 mt-10">Post not found.</p>
      </Container>
    );
  }

  return (
    <main className="bg-gray-900 text-white flex flex-col items-center min-h-screen py-8">
      <Container>
        <div className="bg-white text-gray-900 rounded-md shadow-md p-6 flex flex-col w-[675px] mx-auto">
          <div className="relative w-full h-48 mb-4">
            <Image
              src="/notfound.gif"
              alt={article.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
          <p className="text-sm text-gray-500 mb-6">{article.date}</p>

          <div className="text-gray-800 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </Container>
    </main>
  );
}
