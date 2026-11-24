import { Category, MenuItem, Testimonial, GalleryPhoto } from "@/types";

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1920&auto=format&fit=crop";

export const CHEF_SPECIAL_IMAGE =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=85&w=1400&auto=format&fit=crop";

export const RESERVATION_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=85&w=1800&auto=format&fit=crop";

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Starters",
    description: "Delicate opening courses crafted to awaken the palate.",
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=85&w=1000&auto=format&fit=crop",
    is_active: true,
  },
  {
    id: 2,
    name: "Main Courses",
    description: "Dry-aged cuts, roasted reductions, and wood-fired depth.",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=85&w=1000&auto=format&fit=crop",
    is_active: true,
  },
  {
    id: 3,
    name: "Seafood",
    description: "Wild-caught coastal delicacies plated with citrus and sea herbs.",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=85&w=1000&auto=format&fit=crop",
    is_active: true,
  },
  {
    id: 4,
    name: "Desserts",
    description: "Sculptural pastry creations balancing cacao, fruit, and warmth.",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=85&w=1000&auto=format&fit=crop",
    is_active: true,
  },
  {
    id: 5,
    name: "Beverages",
    description: "Cellar vintages, botanical infusions, and evening digestifs.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=85&w=1000&auto=format&fit=crop",
    is_active: true,
  },
];

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 101,
    category_id: 2,
    category_name: "Main Courses",
    name: "A5 Wagyu Ribeye & Black Garlic Jus",
    description:
      "Seared over white binchotan charcoal with smoked bone marrow emulsion, charred baby leeks, and aged jus.",
    price: 94,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: true,
    is_available: true,
  },
  {
    id: 102,
    category_id: 3,
    category_name: "Seafood",
    name: "Butter-Poached Maine Lobster & Scallop",
    description:
      "Hokkaido sea scallop and sweet lobster tail glazed in saffron champagne butter with sea fennel.",
    price: 78,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: true,
    is_available: true,
  },
  {
    id: 103,
    category_id: 4,
    category_name: "Desserts",
    name: "72% Valrhona Noir Ganache & Gold Leaf",
    description:
      "Dark chocolate sphere with roasted hazelnut praline, espresso crémeux, and warm cacao nib tuile.",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: true,
    is_available: true,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  ...SIGNATURE_DISHES,
  {
    id: 104,
    category_id: 1,
    category_name: "Starters",
    name: "Bluefin Tuna Crudo & Yuzu Kosho",
    description:
      "Line-caught bluefin slices dressed with cold-pressed olive oil, crispy shallots, and white soy.",
    price: 34,
    image:
      "https://images.unsplash.com/photo-1541014741259-de529411b96a?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: false,
    is_available: true,
  },
  {
    id: 105,
    category_id: 2,
    category_name: "Main Courses",
    name: "Herb-Crusted Rack of Lamb",
    description:
      "Served with parsnip silk, confit garlic, wilted swiss chard, and rosemary lamb reduction.",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: false,
    is_available: true,
  },
  {
    id: 106,
    category_id: 3,
    category_name: "Seafood",
    name: "Pan-Seared Black Cod & Miso Glaze",
    description:
      "Flaky sablefish finished with sweet white miso, pickled daikon, and ginger dashi broth.",
    price: 62,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=85&w=1200&auto=format&fit=crop",
    is_featured: true,
    is_popular: true,
    is_available: true,
  },
  {
    id: 107,
    category_id: 5,
    category_name: "Beverages",
    name: "Smoked Velvet Negroni",
    description:
      "Small-batch gin, sweet vermouth, bitter aperitivo, and cedarwood smoke infused tableside.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=85&w=1200&auto=format&fit=crop",
    is_featured: false,
    is_popular: true,
    is_available: true,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    guest_name: "Eleanor Vance",
    role: "Culinary Critic",
    quote:
      "VELORA captures quiet authority from the very first course. Every plate feels composed, unhurried, and deeply memorable.",
    rating: 5,
  },
  {
    id: 2,
    guest_name: "Julian Mercer",
    role: "Private Dining Guest",
    quote:
      "Warm candlelight, impeccable pacing, and a Wagyu course that easily rivals the finest dining rooms we have visited.",
    rating: 5,
  },
  {
    id: 3,
    guest_name: "Clara Sterling",
    role: "Architectural Designer",
    quote:
      "From the dark obsidian dining room to the delicate gold-dusted pastry finish, every detail feels intentional.",
    rating: 5,
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 1,
    title: "Candlelit Dining Room",
    category: "Interior",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=85&w=1400&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    id: 2,
    title: "Charcoal Wagyu Preparation",
    category: "Cuisine",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1200&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    id: 3,
    title: "Coastal Seafood Platter",
    category: "Cuisine",
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=85&w=1200&auto=format&fit=crop",
    aspect: "square",
  },
  {
    id: 4,
    title: "Evening Cellar Pour",
    category: "Experience",
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=85&w=1200&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    id: 5,
    title: "Dark Cacao Finale",
    category: "Cuisine",
    src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=85&w=1200&auto=format&fit=crop",
    aspect: "square",
  },
  {
    id: 6,
    title: "Chef’s Pass & Plating",
    category: "Chef & Kitchen",
    src: "https://images.unsplash.com/photo-1558030006-450675393462?q=85&w=1400&auto=format&fit=crop",
    aspect: "wide",
  },
];