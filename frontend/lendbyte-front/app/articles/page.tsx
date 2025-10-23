import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/Container";

export default function ArticlesPage() {
  
  const articles = [
    {
      title: "Titulo 1",
      date: "2025-05-01",
      content: "Conteudo do blog 1",
      slug: "titulo-1",
    },
    {
      title: "Titulo 2",
      date: "2025-05-02",
      content: "Conteudo do blog 2",
      slug: "titulo-2",
    },
    {
      title: "Titulo 3",
      date: "2025-05-10",
      content: "Conteudo do blog 3",
      slug: "titulo-3", 
    },
  ];

  return (
    <main className="bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <Container>
        <h1 className="text-3xl font-bold text-center mt-8 mb-8">Latest Articles</h1>
        <div className="flex flex-col gap-6 items-center">
          {articles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </Container>
    </main>
  );
}
