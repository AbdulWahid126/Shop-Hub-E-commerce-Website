"use client"

import { useState } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Cart item interface
interface CartItem {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  category: string
  quantity: number
  inStock: boolean
  maxQuantity: number
}

// Sample cart data - in a real app, this would come from state management
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    originalPrice: 99.99,
    image: "/assets/wireless-bluetooth-headphones.png",
    category: "Electronics",
    quantity: 1,
    inStock: true,
    maxQuantity: 15,
  },
  {
    id: 6,
    name: "Smartwatch Pro X",
    price: 129.99,
    originalPrice: 149.99,
    image: "/assets/smartwatch-series-x.webp",
    category: "Electronics",
    quantity: 2,
    inStock: true,
    maxQuantity: 8,
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 149.99,
    originalPrice: 199.99,
    image: "/assets/leather-crossbody-bag.png",
    category: "Accessories",
    quantity: 1,
    inStock: true,
    maxQuantity: 5,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const quantity = Math.max(1, Math.min(newQuantity, item.maxQuantity))
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const shipping = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground">
                  Looks like you have not added any items to your cart yet. Start shopping to fill it up!
                </p>
              </div>
              <div className="space-y-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/shop">Start Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-muted/30 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
                <p className="text-muted-foreground mt-2">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/shop">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 p-4 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="space-y-1">
                                <Badge variant="outline" className="text-xs w-fit">
                                  {item.category}
                                </Badge>
                                <h3 className="font-semibold text-foreground">
                                  <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                                    {item.name}
                                  </Link>
                                </h3>
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-primary">${item.price}</span>
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${item.originalPrice}
                                  </span>
                                </div>
                                {!item.inStock && (
                                  <Badge variant="destructive" className="text-xs">
                                    Out of Stock
                                  </Badge>
                                )}
                              </div>

                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive self-start"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Quantity Controls and Price */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm font-medium">Quantity:</span>
                                <div className="flex items-center border rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="px-3 py-1 text-sm min-w-[2rem] text-center">{item.quantity}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.maxQuantity}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <span className="text-xs text-muted-foreground">({item.maxQuantity} available)</span>
                              </div>

                              <div className="text-right">
                                <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">
                                  Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalItems} items)</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>

                      {savings > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Savings</span>
                          <span>-${savings.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                      </div>

                      {shipping === 0 && <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>}

                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>

                      <Separator />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button asChild size="lg" className="w-full">
                        <Link href="/checkout">Proceed to Checkout</Link>
                      </Button>

                      <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                        <Link href="/shop">Continue Shopping</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Info */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h4 className="font-semibold">Shipping Information</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Free shipping on orders over $50</p>
                      <p>• Standard delivery: 3-7 business days</p>
                      <p>• Express delivery available at checkout</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Info */}
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h4 className="font-semibold">Secure Checkout</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• SSL encrypted checkout</p>
                      <p>• 30-day return policy</p>
                      <p>• Customer support available 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
