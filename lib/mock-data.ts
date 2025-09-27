export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  category: string
  inStock: boolean
  rating: number
  reviews: number
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image: "/modern-electronics.png",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    image: "/stylish-fashion-clothing.jpg",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    image: "/home-decor-and-garden-items.jpg",
  },
  {
    id: "4",
    name: "Sports",
    slug: "sports",
    image: "/sports-equipment-and-gear.jpg",
  },
  {
    id: "5",
    name: "Books",
    slug: "books",
    image: "/collection-of-books.jpg",
  },
  {
    id: "6",
    name: "Beauty",
    slug: "beauty",
    image: "/categories/beauty.png",
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    image: "/premium-wireless-headphones.png",
    category: "electronics",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199.99,
    description: "Advanced fitness tracking with heart rate monitoring and GPS.",
    image: "/smart-fitness-watch.png",
    category: "electronics",
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "3",
    name: "Designer Leather Jacket",
    price: 449.99,
    originalPrice: 599.99,
    description: "Premium leather jacket with modern design and superior craftsmanship.",
    image: "/designer-leather-jacket.jpg",
    category: "fashion",
    inStock: true,
    rating: 4.9,
    reviews: 67,
    featured: true,
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 349.99,
    description: "Comfortable office chair with lumbar support and adjustable height.",
    image: "/ergonomic-office-chair.png",
    category: "home-garden",
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "5",
    name: "Professional Tennis Racket",
    price: 179.99,
    description: "High-performance tennis racket used by professionals.",
    image: "/professional-tennis-racket.jpg",
    category: "sports",
    inStock: false,
    rating: 4.5,
    reviews: 43,
  },
  {
    id: "6",
    name: "Bestselling Novel Collection",
    price: 29.99,
    originalPrice: 49.99,
    description: "Collection of three bestselling novels from award-winning authors.",
    image: "/bestselling-novel-collection.jpg",
    category: "books",
    inStock: true,
    rating: 4.4,
    reviews: 234,
    featured: true,
  },
  {
    id: "7",
    name: "Luxury Skincare Set",
    price: 89.99,
    description: "Complete skincare routine with premium organic ingredients.",
    image: "/luxury-skincare-set.png",
    category: "beauty",
    inStock: true,
    rating: 4.8,
    reviews: 91,
  },
  {
    id: "8",
    name: "4K Ultra HD Monitor",
    price: 599.99,
    description: "32-inch 4K monitor perfect for gaming and professional work.",
    image: "/4k-ultra-hd-monitor.jpg",
    category: "electronics",
    inStock: true,
    rating: 4.7,
    reviews: 78,
  },
]

export const getFeaturedProducts = () => products.filter((p) => p.featured)
export const getProductsByCategory = (category: string) => products.filter((p) => p.category === category)
export const getProductById = (id: string) => products.find((p) => p.id === id)
