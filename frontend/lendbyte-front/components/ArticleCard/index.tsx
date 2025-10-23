import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
}

export function ArticleCard({ id, title, date, content }: ArticleCardProps) {
  return (
    <div className="bg-white text-gray-900 rounded-md shadow-md p-4 flex w-[675px] gap-4 hover:scale-[1.02] transition-transform">
      <div className="shrink-0 w-52 h-32 relative">
        <Image
          src="/notfound.gif"
          alt={title}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <Link href={`/articles/${id}`}>
            <h2 className="font-medium text-lg text-blue-500 hover:underline">{title}</h2>
          </Link>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-gray-700 text-sm mt-2">{content}</p>
        </div>
      </div>
    </div>
  );
}