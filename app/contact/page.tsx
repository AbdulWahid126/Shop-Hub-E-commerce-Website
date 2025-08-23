"use client"

import type React from "react"

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Thank you for your message! We'll get back to you within 24 hours.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["123 Commerce Street", "New York, NY 10001", "United States"],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "Mon-Fri: 9AM-6PM EST", "Sat-Sun: 10AM-4PM EST"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@shophub.com", "sales@shophub.com", "We reply within 24 hours"],
      action: "Send Email",
    },
  ]

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our customer service",
      availability: "Mon-Fri: 9AM-6PM EST",
      action: "Call Support",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your inquiry",
      availability: "Response within 24 hours",
      action: "Send Email",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            We are Here to
            <span className="text-primary"> Help</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Have a question, need support, or want to share feedback? Our team is ready to assist you with anything you
            need.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    {info.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form and Support Options */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Options */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Other Ways to Reach Us</h2>
              <p className="text-muted-foreground mb-6">
                Choose the support method that works best for you. We are committed to providing excellent customer
                service through all channels.
              </p>
            </div>

            <div className="space-y-4">
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <option.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {option.availability}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Quick answers to common questions. Can not find what you are looking for? Contact us directly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What are your shipping options?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer standard (3-5 days), express (1-2 days), and overnight shipping. Free standard shipping on
                  orders over $50.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">What is your return policy?</h3>
                <p className="text-sm text-muted-foreground">
                  30-day return policy for most items. Items must be in original condition. Electronics have a 15-day
                  return window.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">Do you offer international shipping?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we ship to over 25 countries. International shipping rates and times vary by destination.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">How can I track my order?</h3>
                <p className="text-sm text-muted-foreground">
                  You all receive a tracking number via email once your order ships. You can also track orders in your
                  account dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Business Hours */}
        <section className="text-center bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Business Hours</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Customer Support</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                <p>Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Available 24/7</p>
                <p>Average response time: 2 minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
