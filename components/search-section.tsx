"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Search, SlidersHorizontal } from "lucide-react"

const popularCategories = [
  "Productivity",
  "Writing",
  "Design",
  "Marketing",
  "Development",
  "Analytics",
  "Customer Service",
  "Sales",
  "HR",
  "Finance",
]

const popularFilters = ["Free", "Paid", "API Available", "No Code", "Enterprise", "Startup Friendly"]

export function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h2 className="font-playfair text-3xl font-bold mb-4">Find Your Perfect AI Tool</h2>
            <p className="text-muted-foreground">Search through our comprehensive database or browse by category</p>
          </div>

          {/* Main Search Bar */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for AI tools, features, or use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-12 text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button className="h-12 px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t animate-fade-in-up">
                <div className="grid gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Popular Filters</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularFilters.map((filter) => (
                        <Badge
                          key={filter}
                          variant="outline"
                          className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Popular Categories */}
          <div className="text-center">
            <h3 className="font-medium mb-4">Popular Categories</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
