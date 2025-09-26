"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useSearch } from "@/lib/search-context"
import { products } from "@/lib/mock-data"

export function ProductFilters() {
  const { searchState, setCategory, setPriceRange, setInStockOnly, resetFilters } = useSearch()

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((product) => product.category)))

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setCategory(category)
    } else if (searchState.category === category) {
      setCategory("all")
    }
  }

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear All
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={searchState.category === "all"}
              onCheckedChange={(checked) => checked && setCategory("all")}
            />
            <Label htmlFor="all-categories" className="text-sm">
              All Categories
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={searchState.category === category}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium">Price Range</h4>
        <div className="px-2">
          <Slider
            value={searchState.priceRange}
            onValueChange={handlePriceRangeChange}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${searchState.priceRange[0]}</span>
            <span>${searchState.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="font-medium">Availability</h4>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={searchState.inStockOnly}
            onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
          />
          <Label htmlFor="in-stock" className="text-sm">
            In Stock Only
          </Label>
        </div>
      </div>

      <Separator />

      {/* Active Filters Summary */}
      {(searchState.query ||
        searchState.category !== "all" ||
        searchState.priceRange[0] > 0 ||
        searchState.priceRange[1] < 1000 ||
        searchState.inStockOnly) && (
        <div className="space-y-3">
          <h4 className="font-medium">Active Filters</h4>
          <div className="space-y-2">
            {searchState.query && (
              <div className="flex items-center justify-between text-sm">
                <span>Search: "{searchState.query}"</span>
              </div>
            )}
            {searchState.category !== "all" && (
              <div className="flex items-center justify-between text-sm">
                <span>Category: {searchState.category}</span>
              </div>
            )}
            {(searchState.priceRange[0] > 0 || searchState.priceRange[1] < 1000) && (
              <div className="flex items-center justify-between text-sm">
                <span>
                  Price: ${searchState.priceRange[0]} - ${searchState.priceRange[1]}
                </span>
              </div>
            )}
            {searchState.inStockOnly && (
              <div className="flex items-center justify-between text-sm">
                <span>In Stock Only</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
