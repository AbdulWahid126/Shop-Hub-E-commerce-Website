"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Truck, Shield, CheckCircle, ArrowLeft, Lock, MapPin, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample order items - in a real app, this would come from cart state
const orderItems = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    quantity: 1,
    image: "/assets/wireless-bluetooth-headphones.png",
  },
  {
    id: 6,
    name: "Smartwatch Pro X",
    price: 129.99,
    quantity: 2,
    image: "/assets/smartwatch-series-x.webp",
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 149.99,
    quantity: 1,
    image: "/assets/leather-crossbody-bag.png",
  },
]

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Shipping Address
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Payment
  paymentMethod: string

  // Card Details (for credit card payment)
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Additional Options
  saveInfo: boolean
  newsletter: boolean
  specialInstructions: string
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveInfo: false,
    newsletter: false,
    specialInstructions: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Order Placed Successfully!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order #12345 has been confirmed and will be processed shortly.
              </p>
            </div>
            <div className="space-y-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
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
                <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
                <p className="text-muted-foreground mt-2">Complete your order securely</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/cart">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Cart
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipping Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Shipping Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="IL">Illinois</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleInputChange("country", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                        <Textarea
                          id="specialInstructions"
                          placeholder="Any special delivery instructions..."
                          value={formData.specialInstructions}
                          onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Method */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => handleInputChange("paymentMethod", value)}
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="h-4 w-4" />
                            Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Truck className="h-4 w-4" />
                            Cash on Delivery
                          </Label>
                        </div>
                      </RadioGroup>

                      {/* Credit Card Details */}
                      {formData.paymentMethod === "card" && (
                        <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              value={formData.cardName}
                              onChange={(e) => handleInputChange("cardName", e.target.value)}
                              required={formData.paymentMethod === "card"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={formData.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                              required={formData.paymentMethod === "card"}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={formData.expiryDate}
                                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                                required={formData.paymentMethod === "card"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => handleInputChange("cvv", e.target.value)}
                                required={formData.paymentMethod === "card"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Additional Options */}
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveInfo"
                          checked={formData.saveInfo}
                          onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                        />
                        <Label htmlFor="saveInfo" className="text-sm">
                          Save my information for faster checkout next time
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for exclusive offers and updates
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {orderItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3">
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {item.quantity}
                              </Badge>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      {/* Pricing Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Info */}
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>SSL Encrypted Checkout</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="h-4 w-4 text-green-600" />
                        <span>Secure Payment Processing</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>30-Day Return Policy</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Place Order Button */}
                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Place Order - ${total.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
