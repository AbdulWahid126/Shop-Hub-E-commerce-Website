"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// Product data - at least 12 products as required
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/assets/wireless-bluetooth-headphones.png",
    rating: 4.8,
    reviews: 124,
    category: "electronics",
    badge: "Best Seller",
    description: "Premium wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/assets/premium-cotton-t-shirt.png",
    rating: 4.6,
    reviews: 89,
    category: "clothing",
    badge: "New Arrival",
    description: "Comfortable 100% cotton t-shirt in various colors",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 149.99,
    originalPrice: 199.99,
    image: "/assets/leather-crossbody-bag.png",
    rating: 4.9,
    reviews: 67,
    category: "accessories",
    badge: "Limited Edition",
    description: "Genuine leather crossbody bag with adjustable strap",
  },
  {
    id: 4,
    name: "Smartphone Pro Max",
    price: 899.99,
    originalPrice: 999.99,
    image: "/assets/smartphone-pro-max.webp",
    rating: 4.7,
    reviews: 256,
    category: "electronics",
    badge: "Popular",
    description: "Latest smartphone with advanced camera system",
  },
  {
    id: 5,
    name: "Designer Jeans",
    price: 89.99,
    originalPrice: 120.0,
    image: "/assets/designer-jeans.png",
    rating: 4.5,
    reviews: 143,
    category: "clothing",
    badge: "Sale",
    description: "Premium denim jeans with perfect fit",
  },
  {
    id: 6,
    name: "Smartwatch Series X",
    price: 299.99,
    originalPrice: 349.99,
    image: "/assets/smartwatch-series-x.webp",
    rating: 4.8,
    reviews: 198,
    category: "electronics",
    badge: "Featured",
    description: "Advanced smartwatch with health monitoring",
  },
  {
    id: 7,
    name: "Luxury Sunglasses",
    price: 159.99,
    originalPrice: 199.99,
    image: "/assets/luxury-sunglasses.png",
    rating: 4.6,
    reviews: 87,
    category: "accessories",
    badge: "Trending",
    description: "UV protection sunglasses with premium frames",
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    price: 69.99,
    originalPrice: 89.99,
    image: "/assets/wireless-gaming-mouse.png",
    rating: 4.7,
    reviews: 234,
    category: "electronics",
    badge: "Gaming",
    description: "High-precision wireless gaming mouse",
  },
  {
    id: 9,
    name: "Casual Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    image: "/assets/casual-hoodie.webp",
    rating: 4.4,
    reviews: 156,
    category: "clothing",
    badge: "Comfort",
    description: "Soft and comfortable hoodie for everyday wear",
  },
  {
    id: 10,
    name: "Leather Wallet",
    price: 79.99,
    originalPrice: 99.99,
    image: "/assets/leather-wallet.png",
    rating: 4.8,
    reviews: 112,
    category: "accessories",
    badge: "Classic",
    description: "Genuine leather wallet with RFID protection",
  },
  {
    id: 11,
    name: "Laptop Stand",
    price: 39.99,
    originalPrice: 59.99,
    image: "/assets/laptop-stand.png",
    rating: 4.5,
    reviews: 89,
    category: "electronics",
    badge: "Ergonomic",
    description: "Adjustable laptop stand for better posture",
  },
  {
    id: 12,
    name: "Running Shoes",
    price: 119.99,
    originalPrice: 149.99,
    image: "/assets/running-shoes.png",
    rating: 4.7,
    reviews: 203,
    category: "clothing",
    badge: "Athletic",
    description: "Lightweight running shoes with superior comfort",
  },
  {
    id: 13,
    name: "Bluetooth Speaker",
    price: 59.99,
    originalPrice: 79.99,
    image: "/assets/bluetooth-speaker.png",
    rating: 4.6,
    reviews: 167,
    category: "electronics",
    badge: "Portable",
    description: "Waterproof Bluetooth speaker with rich sound",
  },
  {
    id: 14,
    name: "Silk Scarf",
    price: 34.99,
    originalPrice: 49.99,
    image: "/assets/silk-scarf.png",
    rating: 4.5,
    reviews: 78,
    category: "accessories",
    badge: "Elegant",
    description: "Premium silk scarf with beautiful patterns",
  },
  {
    id: 15,
    name: "Winter Jacket",
    price: 179.99,
    originalPrice: 229.99,
    image: "/assets/winter-jacket.png",
    rating: 4.8,
    reviews: 134,
    category: "clothing",
    badge: "Warm",
    description: "Insulated winter jacket for cold weather",
  },
]

const categories = [
  { value: "all", label: "All Categories" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [selectedCategory, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Shop All Products</h1>
              <p className="text-xl text-muted-foreground">
                Discover our complete collection of electronics, clothing, and accessories
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="space-y-2 w-full sm:w-auto">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 w-full sm:w-auto">
                  <label className="text-sm font-medium text-foreground">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} products
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-6"
              }
            >
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-md ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  <CardContent className={`p-0 ${viewMode === "list" ? "flex flex-col sm:flex-row w-full" : ""}`}>
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-full sm:w-48 flex-shrink-0" : "rounded-t-lg"
                      }`}
                    >
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === "list" ? "w-full h-48 sm:w-48 sm:h-48" : "w-full h-64"
                        }`}
                      />
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                        {product.badge}
                      </Badge>
                      <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-secondary text-secondary" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`space-y-4 ${
                        viewMode === "list" ? "p-6 flex-1 flex flex-col justify-between" : "p-6"
                      }`}
                    >
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground capitalize">{product.category}</p>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>
                        {viewMode === "list" && <p className="text-sm text-muted-foreground">{product.description}</p>}
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">${product.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                      </div>

                      <div className={`flex flex-col sm:flex-row gap-3 ${viewMode === "list" ? "mt-auto" : ""}`}>
                        <Button asChild className="flex-1">
                          <Link href={`/product/${product.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="icon" className="sm:w-auto w-full bg-transparent">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("all")
                    setSortBy("featured")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
