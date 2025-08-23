"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Extended product data with detailed information
const productData = {
  1: {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    images: [
      "/wireless-bluetooth-headphones.png",
      "/wireless-bluetooth-headphones-2.png",
      "/wireless-bluetooth-headphones-3.png",
      "/wireless-bluetooth-headphones-4.png",
    ],
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    badge: "Best Seller",
    description:
      "Experience premium sound quality with our wireless Bluetooth headphones featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 5 min = 3 hours",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm jack",
      Battery: "30 hours playback",
    },
    inStock: true,
    stockCount: 15,
  },
  6: {
    id: 6,
    name: "Smartwatch Pro X",
    price: 129.99,
    originalPrice: 149.99,
    images: [
      "/smartwatch-series-x.png",
      "/smartwatch-pro-x-2.png",
      "/smartwatch-pro-x-3.png",
      "/smartwatch-pro-x-4.png",
    ],
    rating: 4.8,
    reviews: 198,
    category: "Electronics",
    badge: "Featured",
    description:
      "Advanced smartwatch with fitness tracking, waterproof design, and 7-day battery life. Monitor your health, stay connected, and track your fitness goals with precision.",
    features: [
      "7-day battery life",
      "Waterproof design (IP68)",
      "Heart rate monitoring",
      "GPS tracking",
      "Sleep tracking",
      "50+ workout modes",
      "Smart notifications",
      "Always-on display",
    ],
    specifications: {
      Display: '1.4" AMOLED',
      Resolution: "454 x 454 pixels",
      Battery: "7 days typical use",
      "Water Resistance": "IP68",
      Connectivity: "Bluetooth 5.0, Wi-Fi",
      Sensors: "Heart rate, GPS, Accelerometer",
    },
    inStock: true,
    stockCount: 8,
  },
}

// Related products
const relatedProducts = [
  {
    id: 4,
    name: "Smartphone Pro Max",
    price: 899.99,
    image: "/smartphone-pro-max.png",
    rating: 4.7,
    category: "Electronics",
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    price: 69.99,
    image: "/wireless-gaming-mouse.png",
    rating: 4.7,
    category: "Electronics",
  },
  {
    id: 11,
    name: "Laptop Stand",
    price: 39.99,
    image: "/laptop-stand.png",
    rating: 4.5,
    category: "Electronics",
  },
  {
    id: 13,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/bluetooth-speaker.png",
    rating: 4.6,
    category: "Electronics",
  },
]

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const product = productData[productId as keyof typeof productData]

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Product Not Found</h1>
            <p className="text-muted-foreground">The product you are looking for does not exist.</p>
            <Button asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Added ${quantity} of product ${product.id} to cart`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-primary">
                Shop
              </Link>
              <span>/</span>
              <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.images[selectedImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                    {product.badge}
                  </Badge>

                  {/* Navigation arrows */}
                  {product.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                        onClick={() =>
                          setSelectedImageIndex(
                            selectedImageIndex === 0 ? product.images.length - 1 : selectedImageIndex - 1,
                          )
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                        onClick={() =>
                          setSelectedImageIndex(
                            selectedImageIndex === product.images.length - 1 ? 0 : selectedImageIndex + 1,
                          )
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedImageIndex === index ? "border-primary" : "border-transparent"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    {product.inStock ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        In Stock ({product.stockCount} left)
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>

                  <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-medium ml-2">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-primary">${product.price}</span>
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                <Separator />

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium">Quantity:</label>
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Shipping Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Free Shipping</p>
                      <p className="text-xs text-muted-foreground">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">2 Year Warranty</p>
                      <p className="text-xs text-muted-foreground">Full coverage</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">30-Day Returns</p>
                      <p className="text-xs text-muted-foreground">No questions asked</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border/50">
                          <span className="font-medium">{key}:</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Customer Reviews</h3>
                        <Button variant="outline">Write a Review</Button>
                      </div>
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Reviews feature coming soon!</p>
                        <p className="text-sm">Be the first to review this product.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Shipping Information</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Free standard shipping on orders over $50</li>
                          <li>• Express shipping available for $9.99</li>
                          <li>• Orders processed within 1-2 business days</li>
                          <li>• Delivery time: 3-7 business days</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Returns & Exchanges</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• 30-day return policy</li>
                          <li>• Items must be in original condition</li>
                          <li>• Free return shipping on defective items</li>
                          <li>• Refunds processed within 5-7 business days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <p className="text-sm text-muted-foreground">{relatedProduct.category}</p>
                      <h3 className="font-semibold text-sm">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">${relatedProduct.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-secondary text-secondary" />
                          <span className="text-xs">{relatedProduct.rating}</span>
                        </div>
                      </div>
                      <Button asChild size="sm" className="w-full">
                        <Link href={`/product/${relatedProduct.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
