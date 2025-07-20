export interface User {
  id: number;
  name: string;
  phone: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Prompt {
  id: number;
  prompt: string;
  response: string;
  createdAt: string;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  category?: Category;
  subCategory?: SubCategory;
  user?: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}