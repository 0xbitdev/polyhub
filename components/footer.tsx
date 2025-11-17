"use client"

import Link from "next/link"
import { Github, Twitter } from 'lucide-react'
import { Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8"> 

          <div>
            <h3 className="font-bold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/markets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Markets</Link></li>
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portfolio</Link></li>
              <li><Link href="/activity" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Activity</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 PredictHub. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
