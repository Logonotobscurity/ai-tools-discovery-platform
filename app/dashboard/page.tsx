import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { CategoryChart } from "@/components/category-chart"
import { TopToolsGrid } from "@/components/top-tools-grid"
import { DataQualityPanel } from "@/components/data-quality-panel"
import { TrendAnalysis } from "@/components/trend-analysis"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive insights and analytics for the AI tools platform</p>
        </div>

        <Suspense fallback={<div className="animate-pulse h-32 bg-muted/20 rounded-lg" />}>
          <StatsOverview />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-lg" />}>
            <CategoryChart />
          </Suspense>

          <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-lg" />}>
            <DataQualityPanel />
          </Suspense>
        </div>

        <Suspense fallback={<div className="animate-pulse h-64 bg-muted/20 rounded-lg" />}>
          <TrendAnalysis />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-lg" />}>
          <TopToolsGrid />
        </Suspense>
      </main>
    </div>
  )
}
