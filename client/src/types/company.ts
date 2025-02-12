export interface Company {
  id: string;
  name: string;
  rating: number;
  logo_url?: string;
  description?: string;
  categories?: string[];
  reviews_count?: number;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface CompanyReview {
  id: string;
  title: string;
  content: string;
  rating: number;
  user: {
    name: string;
    avatar?: string;
  };
  created_at: string;
  helpful_count?: number;
  reply?: {
    content: string;
    created_at: string;
  };
}

export interface RecentCompany {
  id: string;
  name: string;
  rating: number;
  logo_url?: string;
  viewedAt: string;
}
