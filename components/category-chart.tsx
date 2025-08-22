"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CategoryData {
  name: string
  count: number
}

export function CategoryChart() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/ai-tools-insights.json")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.top_categories || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load category data:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 animate-pulse bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Top AI Tool Categories</span>
          <span className="text-sm font-normal text-gray-500">({categories.length} shown)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={categories} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Tools"]} labelStyle={{ color: "#374151" }} />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} className="hover:opacity-80" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
