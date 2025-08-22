"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star, Zap, Database, Target, Rocket, Code } from "lucide-react"

interface StatsData {
  totalTools: number
  totalCategories: number
  dataQuality: number
  avgUpvotes: number
  journeyStats: {
    startupFounders: number
    developers: number
    growthHackers: number
    aiEnthusiasts: number
  }
  totalFrameworks: number
}

export function StatsSection() {
  const [statsData, setStatsData] = useState<StatsData>({
    totalTools: 3602,
    totalCategories: 89,
    dataQuality: 98.2,
    avgUpvotes: 246,
    journeyStats: {
      startupFounders: 377,
      developers: 342,
      growthHackers: 295,
      aiEnthusiasts: 2588,
    },
    totalFrameworks: 66,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("[v0] Fetching comprehensive stats...")
        const response = await fetch("/ai-tools-insights.json")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] Stats data loaded:", Object.keys(data))

        setStatsData({
          totalTools: data.total_tools || data.total_resources || 3602,
          totalCategories: data.total_categories || 89,
          dataQuality: data.data_quality?.completion_rate || 98.2,
          avgUpvotes: Math.round(data.avg_upvotes || data.average_rating || 246),
          journeyStats: data.journey_stats || {
            startupFounders: 377,
            developers: 342,
            growthHackers: 295,
            aiEnthusiasts: 2588,
          },
          totalFrameworks: data.total_frameworks || 66,
        })
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
        // Keep fallback values
      }
    }

    fetchStats()
  }, [])

  const mainStats = [
    {
      icon: Database,
      value: `${statsData.totalTools.toLocaleString()}+`,
      label: "Total Resources",
      description: "Comprehensive platform database",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: statsData.totalCategories.toString(),
      label: "Categories",
      description: "Organized by use case",
      color: "text-green-600",
    },
    {
      icon: Star,
      value: `${statsData.dataQuality}%`,
      label: "Data Quality",
      description: "Verified information",
      color: "text-yellow-600",
    },
    {
      icon: Code,
      value: `${statsData.totalFrameworks}`,
      label: "AI Frameworks",
      description: "Specialized tools",
      color: "text-purple-600",
    },
  ]

  const journeyStats = [
    {
      icon: Rocket,
      value: `${statsData.journeyStats.startupFounders.toLocaleString()}`,
      label: "Startup Resources",
      description: "For founders & entrepreneurs",
      color: "text-orange-600",
    },
    {
      icon: Code,
      value: `${statsData.journeyStats.developers.toLocaleString()}`,
      label: "Developer Tools",
      description: "APIs, frameworks & services",
      color: "text-blue-600",
    },
    {
      icon: Target,
      value: `${statsData.journeyStats.growthHackers.toLocaleString()}`,
      label: "Growth Tools",
      description: "Marketing & analytics",
      color: "text-green-600",
    },
    {
      icon: Zap,
      value: `${statsData.journeyStats.aiEnthusiasts.toLocaleString()}`,
      label: "AI Tools",
      description: "Machine learning & AI",
      color: "text-purple-600",
    },
  ]

  return (
    <section className="py-16 bg-muted/30" data-section="stats">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Platform Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive resource discovery platform serving startup founders, developers, growth hackers, and AI
            enthusiasts
          </p>
        </div>

        {/* Main Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center hover:shadow-lg transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Journey-Specific Stats */}
        <div className="text-center mb-8">
          <h3 className="font-playfair text-2xl font-bold mb-2">Resources by Journey</h3>
          <p className="text-muted-foreground">Tailored resources for different user paths</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeyStats.map((stat, index) => (
            <Card
              key={stat.label}
              className="text-center hover:shadow-lg transition-shadow animate-fade-in-up border-l-4 border-l-primary/20"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background mb-4 ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold mb-2" style={{ color: stat.color.replace("text-", "") }}>
                  {stat.value}
                </div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
