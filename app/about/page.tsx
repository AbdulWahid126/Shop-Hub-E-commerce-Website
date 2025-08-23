import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Truck, Shield, Heart, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Products Sold", value: "200,000+", icon: Award },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Years Experience", value: "8+", icon: Heart },
  ]

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks to ensure you receive only the best.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable shipping with real-time tracking for your peace of mind.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help every step of the way.",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing with regular deals and discounts to give you the best value.",
    },
  ]

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/assets/professional-ceo-portrait.jpg",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/assets/professional-operations-manager.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience Lead",
      image: "/assets/professional-woman-customer-service-manager.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About ShopHub
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Trusted Shopping
            <span className="text-primary"> Destination</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Since 2016, ShopHub has been committed to bringing you the finest selection of electronics, clothing, and
            accessories with unmatched quality and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className=" mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                ShopHub was founded with a simple mission: to make quality products accessible to everyone. What started
                as a small online store has grown into a trusted marketplace serving customers worldwide.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that shopping should be enjoyable, convenient, and trustworthy. Thats why we have built our
                platform with cutting-edge technology and a customer-first approach.
              </p>
              <p className="text-muted-foreground">
                Today, we hare proud to offer thousands of products from trusted brands, backed by our commitment to
                quality, fast shipping, and exceptional customer service.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/assets/modern-ecommerce-warehouse.jpg"
                alt="ShopHub warehouse and operations"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose ShopHub?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are more than just an online store. We are your partners in finding exactly what you need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind ShopHub who work tirelessly to bring you the best shopping experience.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <Image
                    src={member.image || "/assets/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-muted rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Start Shopping?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ShopHub for their shopping needs.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Explore Products</Link>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
