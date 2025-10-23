import { Article } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${this.baseUrl}/api/Articles`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}


  async fetchArticleById(id: string): Promise<Article | null> {
    try {
      if (!id || typeof id !== 'string') {
        console.error("Invalid article ID provided:", id);
        return null;
      }

      const articles = await this.fetchArticles();
      
      return articles.find((article) => article.id === id) || null;
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      return null;
    }
  }
}

export const apiService = new ApiService(API_BASE_URL);