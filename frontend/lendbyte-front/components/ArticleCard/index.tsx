import Image from "next/image";
import Link from "next/link";
import { FaClock, FaArrowRight } from "react-icons/fa";

interface ArticleCardProps {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
}

export function ArticleCard({ id, title, date, content, image }: ArticleCardProps) {
  return (
    <Link href={`/articles/${id}`}>
      <article className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col group cursor-pointer">
        <div className="relative w-full h-48 overflow-hidden bg-gray-900">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

   
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
            <FaClock size={12} />
            <time>{date}</time>
          </div>

          <h3 className="font-bold text-lg text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {content}
          </p>

          <div className="flex items-center gap-2 text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
            <span>Read article</span>
            <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}