import Link from "next/link"
import { Suspense } from "react"
import { ArrowUpRight, Globe2 } from "lucide-react"
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

        <section className="rounded-2xl border bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 p-6 text-white shadow-lg">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-purple-200">
                <Globe2 className="h-4 w-4" />
                LOG_ON market intelligence
              </div>
              <h2 className="mt-2 font-playfair text-2xl font-bold">Pan-African Expansion Intelligence</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Turn funding, partnerships, acquisitions, payment and infrastructure signals into country constraints,
                partner paths and concrete LOG_ON implementation opportunities.
              </p>
            </div>
            <Link
              href="/pan-african"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100"
            >
              Open intelligence
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

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
