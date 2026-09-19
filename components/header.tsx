"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Search, Menu, X, Zap, Globe2 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-playfair text-xl font-bold">AI Discovery</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Tools
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/pan-african" className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors">
              <Globe2 className="h-4 w-4" />
              Pan-African Intel
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search AI tools..." className="pl-10 pr-4" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
                Dashboard
              </Button>
            </Link>
            <Button className="animate-pulse-glow">Get Updates</Button>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-4 animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <Link href="/tools" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Tools
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </Link>
              <Link href="/pan-african" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                <Globe2 className="h-4 w-4" />
                Pan-African Intelligence
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <div className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search AI tools..." className="pl-10 pr-4" />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
