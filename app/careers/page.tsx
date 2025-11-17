"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Globe, Zap, Heart, TrendingUp, MapPin, Clock } from 'lucide-react'

export default function CareersPage() {
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
              <Briefcase className="w-4 h-4" />
              Join Our Team
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Build the Future of Prediction Markets
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join a passionate team creating the next generation of decentralized prediction markets
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Work at PolyHub?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Users, title: "Talented Team", desc: "Work with exceptional engineers and designers" },
                { icon: Globe, title: "Remote First", desc: "Work from anywhere in the world" },
                { icon: Zap, title: "Cutting Edge Tech", desc: "Build with the latest web3 technologies" },
                { icon: Heart, title: "Great Benefits", desc: "Competitive salary, equity, and healthcare" },
                { icon: TrendingUp, title: "Growth Opportunities", desc: "Rapid career progression in a growing startup" },
                { icon: Users, title: "Impact", desc: "Shape the future of decentralized finance" }
              ].map((benefit, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Senior Frontend Engineer",
                  department: "Engineering",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "Backend Engineer (Solana)",
                  department: "Engineering",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "Product Designer",
                  department: "Design",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "DevOps Engineer",
                  department: "Engineering",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "Community Manager",
                  department: "Marketing",
                  location: "Remote",
                  type: "Full-time"
                },
                {
                  title: "Content Writer",
                  department: "Marketing",
                  location: "Remote",
                  type: "Contract"
                }
              ].map((job, i) => (
                <div key={i} className="p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-primary/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See Your Role?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Send Your Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
