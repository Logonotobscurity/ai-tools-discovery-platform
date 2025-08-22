"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Star, Layers } from "lucide-react"

interface InsightsData {
  total_tools: number
  total_categories: number
  avg_upvotes: number
  median_upvotes: number
  max_upvotes: number
}

export function StatsOverview() {
  const [insights, setInsights] = useState<InsightsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/ai-tools-insights.json")
      .then((res) => res.json())
      .then((data) => {
        setInsights(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load insights:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!insights) return null

  const stats = [
    {
      title: "Total AI Tools",
      value: insights.total_tools.toLocaleString(),
      icon: Layers,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Categories",
      value: insights.total_categories.toString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Avg Upvotes",
      value: Math.round(insights.avg_upvotes).toLocaleString(),
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Top Tool Upvotes",
      value: insights.max_upvotes.toLocaleString(),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
