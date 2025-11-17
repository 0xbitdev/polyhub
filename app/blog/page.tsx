"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, TrendingUp, Shield, Rocket, Users } from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "product", "crypto", "technology", "zk-privacy", "markets"]

  const blogPosts = [
    {
      id: 1,
      title: "Introducing Zero-Knowledge Privacy for Prediction Markets",
      excerpt: "Learn how PolyHub leverages ZK technology to provide unparalleled privacy and security for all your trading activities.",
      category: "zk-privacy",
      author: "Sarah Chen",
      date: "Nov 15, 2025",
      readTime: "5 min read",
      image: "/zero-knowledge-technology.jpg"
    },
    {
      id: 2,
      title: "The Future of Decentralized Prediction Markets",
      excerpt: "Exploring how blockchain technology is revolutionizing the way we predict and trade on future events.",
      category: "markets",
      author: "Michael Brown",
      date: "Nov 12, 2025",
      readTime: "7 min read",
      image: "/blockchain-prediction-markets.jpg"
    },
    {
      id: 3,
      title: "PolyHub Token Launch: What You Need to Know",
      excerpt: "Everything about our upcoming token launch, tokenomics, and how you can participate as an early adopter.",
      category: "product",
      author: "Alex Johnson",
      date: "Nov 10, 2025",
      readTime: "6 min read",
      image: "/cryptocurrency-token-launch.jpg"
    },
    {
      id: 4,
      title: "How to Get Started with Prediction Trading on Solana",
      excerpt: "A comprehensive guide for beginners to start trading predictions on the Solana blockchain using PolyHub.",
      category: "technology",
      author: "Emily Davis",
      date: "Nov 8, 2025",
      readTime: "8 min read",
      image: "/solana-blockchain-trading.jpg"
    },
    {
      id: 5,
      title: "Understanding Market Liquidity in Prediction Markets",
      excerpt: "Deep dive into how liquidity pools work and why they're crucial for successful prediction market trading.",
      category: "markets",
      author: "David Kim",
      date: "Nov 5, 2025",
      readTime: "6 min read",
      image: "/market-liquidity-trading.jpg"
    },
    {
      id: 6,
      title: "Community Spotlight: Top Traders of November",
      excerpt: "Meet the traders who made the most accurate predictions this month and learn their strategies.",
      category: "product",
      author: "Jessica Lee",
      date: "Nov 3, 2025",
      readTime: "4 min read",
      image: "/trading-success-winners.jpg"
    },
    {
      id: 7,
      title: "Crypto Market Predictions: Q4 2025 Analysis",
      excerpt: "Our analysts break down the current crypto market trends and what to expect in the coming quarter.",
      category: "crypto",
      author: "Robert Martinez",
      date: "Oct 30, 2025",
      readTime: "10 min read",
      image: "/crypto-market-analysis.png"
    },
    {
      id: 8,
      title: "Building Trust Through Transparency: Our ZK Approach",
      excerpt: "How Zero-Knowledge proofs ensure privacy without sacrificing the transparency that makes prediction markets work.",
      category: "zk-privacy",
      author: "Sarah Chen",
      date: "Oct 28, 2025",
      readTime: "7 min read",
      image: "/blockchain-transparency-privacy.jpg"
    }
  ]

  const filteredPosts = selectedCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const featuredPost = blogPosts[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_darkmode-3FpeYOibVCv8cbsZp2n71xBSm6aedZ.png"
              alt="PolyHub"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/markets" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Markets
            </Link>
            <Link href="/documentation" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/blog" className="text-sm font-medium text-foreground transition-colors">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              PolyHub Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest news, insights, and updates from the world of decentralized prediction markets
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Featured Article</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </div>
            
            <Link href={`/blog/${featuredPost.id}`} className="group">
              <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border bg-card hover:shadow-2xl hover:border-primary/50 transition-all">
                <div className="relative overflow-hidden rounded-2xl aspect-video">
                  <img 
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-semibold capitalize">
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{featuredPost.author}</div>
                      <div className="text-sm text-muted-foreground">Author</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat === "zk-privacy" ? "ZK Privacy" : cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                  <div className="rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-lg bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold capitalize">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium">{post.author}</span>
                        </div>
                        
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter for the latest updates, insights, and exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground border-0"
              />
              <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 PolyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
