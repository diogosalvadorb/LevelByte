import axios from "axios";
import { getSession } from "next-auth/react";
import { Article } from "@/types/article";
import { LoginResponse } from "@/types/login.type";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const createArticle = async (
  title: string,
  theme: string,
  image?: File
): Promise<void> => {
  const formData = new FormData();
  formData.append("Title", title);
  formData.append("Theme", theme);
  if (image) formData.append("Image", image);

  await api.post("/api/Articles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateArticle = async (
  id: string,
  title: string,
  image?: File,
  removeImage?: boolean
): Promise<void> => {
  const formData = new FormData();
  formData.append("Title", title);
  if (image) formData.append("Image", image);
  if (removeImage) formData.append("RemoveImage", "true");

  await api.put(`/api/Articles/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateArticleLevel = async (
  articleId: string,
  levelId: string,
  text: string,
  audioUrl: string
): Promise<void> => {
  await api.put(`/api/Articles/${articleId}/levels/${levelId}`, {
    text,
    audioUrl,
  });
};

export const deleteArticle = async (id: string): Promise<void> => {
  await api.delete(`/api/Articles/${id}`);
};

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await api.get("/api/Articles");
  return response.data;
};

export const fetchArticleById = async (id: string): Promise<Article | null> => {
  try {
    const response = await api.get(`/api/Articles/${id}`);
    const article = response.data;

    if (!article || !article.levels || !Array.isArray(article.levels)) {
      console.error("Invalid article structure:", article);
      return null;
    }

    return article;
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    return null;
  }
};

export const getArticleImageUrl = (id: string, hasImage: boolean): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";
  return hasImage ? `${baseUrl}/api/Articles/${id}/Image` : "/placeholder.jpg";
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/api/users/login", { email, password });
  return response.data;
};