export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
}

export type TeachersResponse = Record<string, Omit<Teacher, 'id'>>;

export interface TeachersFilters {
  language?: string;
  level?: string;
  price?: number;
}

export interface GetTeachersParams {
  page?: number;
  limit?: number;
  filters?: TeachersFilters;
}

export interface GetTeachersResult {
  teachers: Teacher[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  availableLanguages: string[];
  availableLevels: string[];
  availablePrices: number[];
}
