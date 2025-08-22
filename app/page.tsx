import { Suspense } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SearchSection } from "@/components/search-section"
import { ToolsGrid } from "@/components/tools-grid"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />

        <Suspense fallback={<div className="animate-pulse h-32 bg-muted/20 rounded-lg mx-4" />}>
          <SearchSection />
        </Suspense>

        <Suspense fallback={<div className="animate-pulse h-64 bg-muted/20 rounded-lg mx-4" />}>
          <StatsSection />
        </Suspense>

        <div data-section="tools">
          <Suspense fallback={<div className="animate-pulse h-96 bg-muted/20 rounded-lg mx-4" />}>
            <ToolsGrid />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}
