"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useSearch } from "@/lib/search-context"
import { useRouter } from "next/navigation"

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")
  const { setQuery } = useSearch()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setQuery(searchQuery.trim())
      router.push("/#products")
    }
  }

  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              Discover Amazing
              <span className="text-primary block">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Shop the latest trends and find everything you need in one place. Quality products, unbeatable prices.
            </p>

            {/* Hero Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="#products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src="/ecommerce-hero.png" alt="Shopping Hero" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
