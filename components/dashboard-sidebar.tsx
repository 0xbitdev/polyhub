"use client"

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart3, WalletIcon, Activity, Settings, TrendingUp, LogOut, Menu, X, Sparkles, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Image from "next/image"

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Markets', href: '/markets', icon: BarChart3 },
  { name: 'Portfolio', href: '/portfolio', icon: WalletIcon },
  { name: 'Activity', href: '/activity', icon: Activity },
]

const secondaryNavigation = [
  { name: 'Create Vote', href: '/create-vote', icon: Plus },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface DashboardSidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function DashboardSidebar({ isCollapsed, onToggleCollapse }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button - hidden, using bottom nav instead */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile - not needed with bottom nav */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl flex-1 transition-all min-w-0",
                  isActive
                    ? "bg-gradient-to-br from-blue-600/10 to-indigo-600/10"
                    : "hover:bg-muted/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-[10px] font-medium truncate w-full text-center",
                  isActive ? "text-blue-600" : "text-muted-foreground"
                )}>
                  {item.name}
                </span>
              </Link>
            )
          })}
          {secondaryNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl flex-1 transition-all min-w-0",
                  isActive
                    ? "bg-gradient-to-br from-blue-600/10 to-indigo-600/10"
                    : "hover:bg-muted/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-[10px] font-medium truncate w-full text-center",
                  isActive ? "text-blue-600" : "text-muted-foreground"
                )}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex fixed top-0 left-0 h-full bg-card/50 backdrop-blur-xl border-r border-border/50 z-40 transition-all duration-300 flex-col",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 rounded-full bg-card border border-border shadow-sm hover:shadow-md z-50"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>

          <Link href="/" className="flex items-center justify-center group">
            {isCollapsed ? (
              <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_only_minimize%20sidebar%20light%20%26%20dark%20mode-R9T2ahPvvy9IdvsFstUTMbkMJ4bs2F.png"
                  alt="PolyHub"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-48 h-16 overflow-hidden flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_lighmode-uhPAR3o6itmAjT0xHUiEYOk7L36aeg.png"
                  alt="PolyHub"
                  width={192}
                  height={64}
                  className="w-full h-full object-contain block dark:hidden"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_darkmode-3FpeYOibVCv8cbsZp2n71xBSm6aedZ.png"
                  alt="PolyHub"
                  width={192}
                  height={64}
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isCollapsed && "justify-center",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && item.name}
                </Link>
              )
            })}
          </div>

          {!isCollapsed && (
            <div className="pt-6 mt-6 border-t border-border/50 space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          )}
          
          {isCollapsed && (
            <div className="pt-6 mt-6 border-t border-border/50 space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                    title={item.name}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                )
              })}
            </div>
          )}
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border/50">
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Trading Tier</div>
                  <div className="text-xs text-muted-foreground">Basic</div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg">
                Upgrade
              </Button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
