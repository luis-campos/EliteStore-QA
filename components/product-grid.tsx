"use client"

import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { products } from "@/lib/mock-data"
import { useSearch } from "@/lib/search-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

export function ProductGrid() {
  const { searchState, filterProducts, setSortBy } = useSearch()
  const [showFilters, setShowFilters] = useState(false)
  const filteredProducts = filterProducts(products)

  const handleSortChange = (value: string) => {
    setSortBy(value)
  }

  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with Results Count and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">
                  {searchState.query ? `Search Results for "${searchState.query}"` : "All Products"}
                </h2>
                <span className="text-muted-foreground">({filteredProducts.length} products)</span>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <select
                  className="border rounded-md px-3 py-2 bg-background text-sm"
                  value={searchState.sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-6 p-4 border rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ProductFilters />
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
