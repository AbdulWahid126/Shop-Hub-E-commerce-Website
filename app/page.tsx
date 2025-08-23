import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowRight, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Featured products data
const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/assets/wireless-bluetooth-headphones.png",
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    image: "/assets/premium-cotton-t-shirt.png",
    rating: 4.6,
    reviews: 89,
    category: "Clothing",
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 149.99,
    originalPrice: 199.99,
    image: "/assets/leather-crossbody-bag.png",
    rating: 4.9,
    reviews: 67,
    category: "Accessories",
    badge: "Limited Edition",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 lg:px-20 py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium">
                    Limited Time Offer
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                    Flat <span className="text-primary">20% Off</span> on Electronics
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Discover amazing deals on the latest gadgets, smartphones, laptops, and more. Shop now and save big
                    on your favorite electronics!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6">
                    <Link href="/shop?category=electronics">
                      Shop Electronics <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                    <Link href="/shop">Browse All Products</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/assets/3dWork.jpg"
                  alt="Electronics Sale"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
                  <Zap className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Free Shipping</h3>
                <p className="text-muted-foreground">Free shipping on orders over $50. Fast and reliable delivery.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Secure Payment</h3>
                <p className="text-muted-foreground">Your payment information is safe and secure with us.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Easy Returns</h3>
                <p className="text-muted-foreground">30-day return policy. No questions asked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Trending Products</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our most popular items loved by thousands of customers worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-primary">${product.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                      </div>

                      <div className="flex gap-3">
                        <Button asChild className="flex-1">
                          <Link href={`/product/${product.id}`}>Shop Now</Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">
                  View All Products <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
                <p className="text-xl text-muted-foreground">
                  Subscribe to our newsletter and be the first to know about new products and exclusive offers
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="lg" className="px-8">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
