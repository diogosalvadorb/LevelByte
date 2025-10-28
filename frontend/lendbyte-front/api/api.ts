import { Article } from "@/types/article";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createArticle(title: string, theme: string, image?: File): Promise<void> {
  const formData = new FormData();
  formData.append("Title", title);
  formData.append("Theme", theme);
  if (image) {
    formData.append("Image", image);
  }

  const response = await fetch(`${this.baseUrl}/api/Articles`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create article: ${errorText}`);
  }
}


  async fetchArticles(): Promise<Article[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Articles`);

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
      try {
        const response = await fetch(`${this.baseUrl}/api/Articles/${id}`);

        if (response.ok) {
          const article = await response.json();

          if (!article || !article.levels || !Array.isArray(article.levels)) {
            console.error("Invalid article structure:", article);
            return null;
          }

          return article;
        }
      } catch (directFetchError) {
        console.log("Direct fetch failed, trying to fetch from all articles...", directFetchError);
      }

      const articles = await this.fetchArticles();

      const article = articles.find((article) => article.id === id);

      if (!article) {
        return null;
      }

      return article;
    } catch (error) {
      console.error("Error fetching article by ID:", error);
      return null;
    }
  }

  getArticleImageUrl(id: string, hasImage: boolean): string {
    return hasImage
      ? `${this.baseUrl}/api/Articles/${id}/Image`
      : "/placeholder";
  }
}

export const apiService = new ApiService(API_BASE_URL);
