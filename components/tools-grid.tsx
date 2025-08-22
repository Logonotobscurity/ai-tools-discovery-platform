"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Heart, TrendingUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AITool {
  id: number
  name: string
  description: string
  category: string
  url: string
  image_url: string
  external_url: string
  upvotes: number
  slug: string
  featured: boolean
  source?: string
  pricing?: string
  subcategory?: string
  growth_stage?: string
  journey?: string
  rating?: number
  tags?: string[]
}

export function ToolsGrid() {
  const [allTools, setAllTools] = useState<AITool[]>([])
  const [filteredTools, setFilteredTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [displayCount, setDisplayCount] = useState(24)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedJourney, setSelectedJourney] = useState("All")
  const [categories, setCategories] = useState<string[]>([])
  const [journeys, setJourneys] = useState<string[]>([])

  useEffect(() => {
    const fetchTools = async () => {
      try {
        console.log("[v0] Fetching tools data from comprehensive dataset...")
        const response = await fetch("/ai-tools-insights.json")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("[v0] Raw data structure:", Object.keys(data))

        const allToolsData = data.all_tools || data.tools || []
        console.log("[v0] Loaded tools:", allToolsData.length)
        console.log("[v0] Sample tool:", allToolsData[0])

        if (allToolsData.length === 0) {
          throw new Error("No tools found in dataset")
        }

        // Sort by featured status first, then by upvotes/rating
        const sortedTools = allToolsData.sort((a: AITool, b: AITool) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (b.upvotes || b.rating || 0) - (a.upvotes || a.rating || 0)
        })

        setAllTools(sortedTools)
        setFilteredTools(sortedTools)

        const uniqueCategories = [
          "All",
          ...Array.from(new Set(sortedTools.map((tool: AITool) => tool.category).filter(Boolean))),
        ]
        const uniqueJourneys = [
          "All",
          ...Array.from(new Set(sortedTools.map((tool: AITool) => tool.journey).filter(Boolean))),
        ]

        setCategories(uniqueCategories)
        setJourneys(uniqueJourneys)

        console.log("[v0] Categories found:", uniqueCategories.length)
        console.log("[v0] Journeys found:", uniqueJourneys.length)
      } catch (error) {
        console.error("[v0] Error fetching tools:", error)

        const fallbackTools = [
          {
            id: 1,
            name: "ChatGPT",
            description: "Advanced AI chatbot for conversations and content creation with GPT-4 capabilities",
            category: "AI Assistants",
            url: "https://chat.openai.com",
            image_url: "/chatgpt-ai-assistant.png",
            external_url: "https://chat.openai.com",
            upvotes: 15420,
            slug: "chatgpt",
            featured: true,
            source: "AI Tools Dataset",
            journey: "AI Enthusiasts",
            pricing: "Freemium",
          },
          {
            id: 2,
            name: "ReferralCandy",
            description: "Referral marketing platform that helps businesses grow through customer referrals",
            category: "Growth Hacking",
            url: "https://referralcandy.com",
            image_url: "/referral-marketing-platform.png",
            external_url: "https://referralcandy.com",
            upvotes: 850,
            slug: "referralcandy",
            featured: true,
            source: "Growth Hacking Dataset",
            journey: "Growth Hackers",
            pricing: "Paid plans",
            subcategory: "Referral Marketing",
            rating: 4.1,
          },
          {
            id: 3,
            name: "WorkOS",
            description: "APIs for adding enterprise SSO, directory sync and audit logs to SaaS applications",
            category: "Authentication",
            url: "https://workos.com",
            image_url: "/enterprise-authentication-api.png",
            external_url: "https://workos.com",
            upvotes: 720,
            slug: "workos",
            featured: true,
            source: "Developer Journey Dataset",
            journey: "Developers",
            pricing: "Usage-based",
          },
          {
            id: 4,
            name: "Facebook for Startups",
            description:
              "Credits, mentorship and growth programs for early-stage companies building on Meta's tech stack",
            category: "Startup Freebies",
            url: "https://facebook.com/startups",
            image_url: "/facebook-startup-program.png",
            external_url: "https://facebook.com/startups",
            upvotes: 650,
            slug: "facebook-startups",
            featured: true,
            source: "Startup Journey Dataset",
            journey: "Startup Founders",
            pricing: "Free",
          },
          {
            id: 5,
            name: "Ensemble Framework",
            description:
              "A commerce framework enabling AI agents to thrive in the on-chain economy with automated workflows",
            category: "AI Frameworks",
            url: "https://hub.ensemble.codes/",
            image_url: "/ai-agent-blockchain-framework.png",
            external_url: "https://hub.ensemble.codes/",
            upvotes: 420,
            slug: "ensemble-framework",
            featured: true,
            source: "AI Frameworks Dataset",
            journey: "AI Enthusiasts",
            pricing: "Open Source",
          },
        ]

        setAllTools(fallbackTools)
        setFilteredTools(fallbackTools)
        setCategories(["All", "AI Assistants", "Growth Hacking", "Authentication", "Startup Freebies", "AI Frameworks"])
        setJourneys(["All", "AI Enthusiasts", "Growth Hackers", "Developers", "Startup Founders"])
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  useEffect(() => {
    let filtered = allTools

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tool.tags && tool.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))),
      )
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    if (selectedJourney !== "All") {
      filtered = filtered.filter((tool) => tool.journey === selectedJourney)
    }

    setFilteredTools(filtered)
  }, [searchTerm, selectedCategory, selectedJourney, allTools])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg" />
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-6 w-16 bg-muted rounded" />
                    <div className="h-6 w-12 bg-muted rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const displayedTools = filteredTools.slice(0, displayCount)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold mb-4">Comprehensive Resource Discovery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover {allTools.length}+ curated resources across AI tools, growth hacking, development, startup
            resources, and frameworks
          </p>
        </div>

        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tools, frameworks, resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <div className="text-sm font-medium text-muted-foreground mr-2">Journey:</div>
            {journeys.map((journey) => (
              <Button
                key={journey}
                variant={selectedJourney === journey ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedJourney(journey)}
                className="text-xs"
              >
                {journey}
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="text-sm font-medium text-muted-foreground mr-2">Category:</div>
            {categories.slice(0, 12).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-muted-foreground">
            Showing {displayedTools.length} of {filteredTools.length} resources
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {selectedJourney !== "All" && ` for ${selectedJourney}`}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedTools.map((tool, index) => (
            <Card
              key={`${tool.slug}-${tool.id}`}
              className="group hover:shadow-lg transition-all duration-300 hover:border-accent/50 animate-fade-in-up relative"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {tool.featured && (
                <div className="absolute top-2 left-2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Featured</Badge>
                </div>
              )}

              <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                {tool.source && (
                  <Badge variant="secondary" className="text-xs opacity-80">
                    {tool.source.replace(" Dataset", "")}
                  </Badge>
                )}
                {tool.journey && (
                  <Badge variant="outline" className="text-xs bg-background/80">
                    {tool.journey}
                  </Badge>
                )}
              </div>

              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={
                    tool.image_url && !tool.image_url.includes("placeholder")
                      ? tool.image_url
                      : `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(tool.name + " " + tool.category + " tool")}`
                  }
                  alt={tool.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(tool.name + " " + tool.category + " tool")}`
                  }}
                />
                <div className="absolute top-2 left-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                    {tool.name}
                  </h3>
                  <Badge variant="outline" className="text-xs ml-2 shrink-0">
                    {tool.category}
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tool.description}</p>

                <div className="space-y-2 mb-4">
                  {tool.pricing && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Pricing:</span> {tool.pricing}
                    </div>
                  )}
                  {tool.subcategory && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Type:</span> {tool.subcategory}
                    </div>
                  )}
                  {tool.rating && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Rating:</span> {tool.rating}/5.0
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{(tool.upvotes || tool.rating || 0).toLocaleString()}</span>
                  </div>

                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={tool.external_url || tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => console.log("[v0] Resource visited:", tool.name)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {displayedTools.length < filteredTools.length && (
          <div className="text-center">
            <Button variant="outline" size="lg" onClick={() => setDisplayCount((prev) => prev + 24)} className="px-8">
              Load More Resources ({filteredTools.length - displayedTools.length} remaining)
            </Button>
          </div>
        )}

        {filteredTools.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No resources found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setSelectedJourney("All")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
