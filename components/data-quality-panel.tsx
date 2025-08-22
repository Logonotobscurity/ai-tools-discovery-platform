"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Database } from "lucide-react"

interface DataQuality {
  missing_urls: number
  missing_images: number
  missing_descriptions: number
  duplicates: number
}

export function DataQualityPanel() {
  const [quality, setQuality] = useState<DataQuality | null>(null)
  const [totalTools, setTotalTools] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/ai-tools-insights.json")
      .then((res) => res.json())
      .then((data) => {
        setQuality(data.data_quality)
        setTotalTools(data.total_tools)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load data quality info:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Data Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!quality) return null

  const qualityMetrics = [
    {
      label: "Complete URLs",
      missing: quality.missing_urls,
      complete: totalTools - quality.missing_urls,
      total: totalTools,
    },
    {
      label: "Has Images",
      missing: quality.missing_images,
      complete: totalTools - quality.missing_images,
      total: totalTools,
    },
    {
      label: "Has Descriptions",
      missing: quality.missing_descriptions,
      complete: totalTools - quality.missing_descriptions,
      total: totalTools,
    },
    {
      label: "Unique Records",
      missing: quality.duplicates,
      complete: totalTools - quality.duplicates,
      total: totalTools,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Quality Assessment</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {qualityMetrics.map((metric, index) => {
          const completionRate = (metric.complete / metric.total) * 100
          const isGood = completionRate >= 90

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isGood ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  )}
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="text-sm text-gray-600">{completionRate.toFixed(1)}%</span>
              </div>

              <Progress value={completionRate} className="h-2" />

              <div className="flex justify-between text-xs text-gray-500">
                <span>{metric.complete.toLocaleString()} complete</span>
                <span>{metric.missing.toLocaleString()} missing</span>
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600">
            <strong>Overall Quality Score:</strong>{" "}
            <span className="font-semibold text-green-600">
              {(
                (qualityMetrics.reduce((acc, m) => acc + m.complete / m.total, 0) / qualityMetrics.length) *
                100
              ).toFixed(1)}
              %
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
