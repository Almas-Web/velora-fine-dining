export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  is_active: boolean;
}

export interface MenuItem {
  id: number;
  category_id: number;
  category_name?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  is_featured: boolean;
  is_popular?: boolean;
  is_available: boolean;
}

export interface Testimonial {
  id: number;
  guest_name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface GalleryPhoto {
  id: number;
  title: string;
  category: "Interior" | "Cuisine" | "Chef & Kitchen" | "Experience";
  src: string;
  aspect?: "tall" | "wide" | "square";
}