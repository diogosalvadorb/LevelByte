export interface ArticleLevel {
  id: string;
  level: number;
  text: string;
  audioUrl: string;
  wordCount: number;
}

export interface Article {
  id: string;
  title: string;
  createdAt: string;
  levels: ArticleLevel[];
}

export interface ArticleCardData {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
}