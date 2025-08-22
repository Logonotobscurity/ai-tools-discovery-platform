"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [stats, setStats] = useState({
    totalTools: 2500,
    totalCategories: 89,
    dataQuality: 98.2,
    userReviews: 15000,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/ai-tools-insights.json")
        const data = await response.json()

        setStats({
          totalTools: data.total_tools || 2500,
          totalCategories: data.total_categories || 89,
          dataQuality: data.data_quality?.completion_rate || 98.2,
          userReviews: Math.round(data.total_tools * 6) || 15000,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/5 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="mr-2 h-4 w-4" />
            {stats.totalTools.toLocaleString()}+ AI Tools Discovered
          </Badge>

          {/* Main Headline */}
          <h1 className="font-playfair text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Discover the Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Tool</span> for
            Your Business
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
            Explore our comprehensive database of AI tools, compare features, read reviews, and find the perfect
            solution to accelerate your workflow and boost productivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="px-8 py-3 text-lg animate-pulse-glow"
              onClick={() => {
                document.querySelector('[data-section="tools"]')?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore AI Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg bg-transparent">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Analytics Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalTools.toLocaleString()}+</div>
              <div className="text-sm text-muted-foreground">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalCategories}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.dataQuality}%</div>
              <div className="text-sm text-muted-foreground">Data Quality</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Math.round(stats.userReviews / 1000)}K+</div>
              <div className="text-sm text-muted-foreground">User Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
