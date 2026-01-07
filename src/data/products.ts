export interface Product {
  id: string;
  name: string;
  price: number;
  category: "candles" | "trays" | "decor";
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  featured: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Lavender Dreams",
    price: 34.99,
    category: "candles",
    description: "Transport yourself to the serene lavender fields of Provence with this calming scented candle. Hand-poured with natural soy wax and infused with pure lavender essential oil, this candle creates a peaceful ambiance perfect for relaxation and meditation. Burns for approximately 45 hours.",
    shortDescription: "Calming lavender scented soy candle",
    image: "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 25
  },
  {
    id: "2",
    name: "Vanilla Bourbon",
    price: 38.99,
    category: "candles",
    description: "Rich and indulgent, our Vanilla Bourbon candle combines warm Madagascar vanilla with subtle notes of caramel and aged bourbon. Perfect for creating a cozy atmosphere on cold evenings. Made with premium coconut-soy blend wax.",
    shortDescription: "Warm vanilla with bourbon notes",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 18
  },
  {
    id: "3",
    name: "Cedar & Sage",
    price: 42.99,
    category: "candles",
    description: "Embrace the essence of a forest retreat with our Cedar & Sage candle. Earthy cedarwood mingles with fresh sage and hints of eucalyptus for a grounding, nature-inspired fragrance. Ideal for home offices and living spaces.",
    shortDescription: "Earthy cedar with fresh sage",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 22
  },
  {
    id: "4",
    name: "Rose Petals",
    price: 36.99,
    category: "candles",
    description: "A romantic and elegant fragrance featuring Bulgarian rose petals with undertones of peony and soft musk. This candle brings a touch of sophistication to any room. Hand-poured in small batches for exceptional quality.",
    shortDescription: "Elegant Bulgarian rose scent",
    image: "https://images.unsplash.com/photo-1608181831718-2501deb73c57?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608181831718-2501deb73c57?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 30
  },
  {
    id: "5",
    name: "Ocean Breeze",
    price: 32.99,
    category: "candles",
    description: "Capture the essence of a seaside escape with notes of sea salt, driftwood, and white tea. This refreshing candle evokes memories of coastal mornings and gentle ocean waves.",
    shortDescription: "Fresh sea salt and driftwood",
    image: "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 15
  },
  {
    id: "6",
    name: "Amber Noir",
    price: 44.99,
    category: "candles",
    description: "A sophisticated blend of warm amber, black pepper, and sandalwood. This luxurious candle creates an intimate atmosphere perfect for evening gatherings or quiet moments of reflection.",
    shortDescription: "Sophisticated amber and sandalwood",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1602607434689-660d58a90333?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 12
  },
  {
    id: "7",
    name: "Marble Candle Tray",
    price: 28.99,
    category: "trays",
    description: "Elevate your candle display with this elegant white marble tray. Features subtle gray veining and a polished finish. Perfect for grouping multiple candles or displaying with decorative accents. Measures 12 inches in diameter.",
    shortDescription: "White marble display tray",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 20
  },
  {
    id: "8",
    name: "Brass Geometric Tray",
    price: 35.99,
    category: "trays",
    description: "Modern meets classic with this geometric brass tray featuring a hexagonal design. The brushed brass finish adds warmth to any space while providing a stylish base for your candle collection.",
    shortDescription: "Hexagonal brushed brass tray",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 14
  },
  {
    id: "9",
    name: "Wooden Oval Tray",
    price: 32.99,
    category: "trays",
    description: "Crafted from sustainable acacia wood, this oval tray features natural grain patterns that make each piece unique. The raised edges keep candles secure while adding organic warmth to your decor.",
    shortDescription: "Natural acacia wood tray",
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 18
  },
  {
    id: "10",
    name: "Glass Cloche",
    price: 24.99,
    category: "decor",
    description: "Protect and showcase your favorite candles with this elegant glass cloche. The dome shape creates a beautiful display piece while helping to preserve your candle's fragrance when not in use.",
    shortDescription: "Elegant glass display dome",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 25
  },
  {
    id: "11",
    name: "Wicker Candle Holder",
    price: 19.99,
    category: "decor",
    description: "Add texture and bohemian charm to your space with this handwoven wicker candle holder. Perfect for pillar candles, this holder brings natural warmth and artisanal character to any room.",
    shortDescription: "Handwoven bohemian holder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 30
  },
  {
    id: "12",
    name: "Ceramic Match Striker",
    price: 16.99,
    category: "decor",
    description: "A beautiful and functional addition to your candle ritual. This ceramic match striker features a textured striking surface and comes with a set of decorative matches. Available in matte cream finish.",
    shortDescription: "Ceramic striker with matches",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 40
  },
  {
    id: "13",
    name: "Wick Trimmer Set",
    price: 22.99,
    category: "decor",
    description: "Keep your candles burning perfectly with this elegant brass wick trimmer set. Includes a precision trimmer and snuffer, both designed to maintain optimal candle performance and presented in a gift box.",
    shortDescription: "Brass trimmer and snuffer set",
    image: "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602523961358-f9f03dd557db?w=800&h=800&fit=crop"
    ],
    featured: true,
    stock: 22
  },
  {
    id: "14",
    name: "Honey & Tobacco",
    price: 39.99,
    category: "candles",
    description: "A unique and captivating blend of golden honey, rich tobacco leaf, and warm spices. This complex fragrance evolves as it burns, revealing new layers of depth and sophistication.",
    shortDescription: "Rich honey and tobacco blend",
    image: "https://images.unsplash.com/photo-1599446220523-7559e6ee75be?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1599446220523-7559e6ee75be?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 16
  },
  {
    id: "15",
    name: "Concrete Tray",
    price: 26.99,
    category: "trays",
    description: "Industrial meets elegant with this handcrafted concrete tray. The minimalist rectangular design features smooth edges and a subtle matte finish, perfect for modern and Scandinavian-inspired interiors.",
    shortDescription: "Minimalist concrete display",
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800&h=800&fit=crop"
    ],
    featured: false,
    stock: 12
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product["category"]): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
