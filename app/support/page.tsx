"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail, Send, Twitter, BookOpen, HelpCircle, Clock, CheckCircle2 } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
          
          <Link href="/markets">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Launch App
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get support, find answers, and connect with our community
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Discord Community",
                desc: "Join our Discord for real-time support",
                link: "https://discord.gg/polyhub",
                linkText: "Join Discord"
              },
              {
                icon: Twitter,
                title: "Twitter Support",
                desc: "Follow us for updates and quick help",
                link: "https://twitter.com/polyhub",
                linkText: "@polyhub"
              },
              {
                icon: Send,
                title: "Telegram Group",
                desc: "Chat with the community on Telegram",
                link: "https://t.me/polyhub",
                linkText: "Join Telegram"
              },
              {
                icon: Mail,
                title: "Email Support",
                desc: "Send us an email for detailed inquiries",
                link: "mailto:support@polyhub.trade",
                linkText: "support@polyhub.trade"
              }
            ].map((option, i) => (
              <a key={i} href={option.link} target="_blank" rel="noopener noreferrer">
                <div className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.desc}</p>
                  <span className="text-sm text-primary font-medium">{option.linkText} →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Quick Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "Documentation", link: "/documentation" },
                { icon: HelpCircle, title: "FAQ", link: "/#faq" },
                { icon: Clock, title: "Status Page", link: "https://status.polyhub.trade" }
              ].map((resource, i) => (
                <Link key={i} href={resource.link}>
                  <div className="p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all text-center">
                    <resource.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold">{resource.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Response Times */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Average Response Times</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { channel: "Discord", time: "< 1 hour", icon: MessageCircle },
                { channel: "Email", time: "24 hours", icon: Mail },
                { channel: "Twitter", time: "2-4 hours", icon: Twitter }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">{item.channel}</h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
            <div className="bg-card border rounded-2xl p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe your issue or question..."
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="mr-2 w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
