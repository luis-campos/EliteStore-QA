"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "./types"

interface SearchState {
  query: string
  category: string
  priceRange: [number, number]
  sortBy: string
  inStockOnly: boolean
}

interface SearchContextType {
  searchState: SearchState
  setQuery: (query: string) => void
  setCategory: (category: string) => void
  setPriceRange: (range: [number, number]) => void
  setSortBy: (sortBy: string) => void
  setInStockOnly: (inStock: boolean) => void
  resetFilters: () => void
  filterProducts: (products: Product[]) => Product[]
}

const SearchContext = createContext<SearchContextType | null>(null)

const initialState: SearchState = {
  query: "",
  category: "all",
  priceRange: [0, 1000],
  sortBy: "featured",
  inStockOnly: false,
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchState, setSearchState] = useState<SearchState>(initialState)

  const setQuery = (query: string) => {
    setSearchState((prev) => ({ ...prev, query }))
  }

  const setCategory = (category: string) => {
    setSearchState((prev) => ({ ...prev, category }))
  }

  const setPriceRange = (priceRange: [number, number]) => {
    setSearchState((prev) => ({ ...prev, priceRange }))
  }

  const setSortBy = (sortBy: string) => {
    setSearchState((prev) => ({ ...prev, sortBy }))
  }

  const setInStockOnly = (inStockOnly: boolean) => {
    setSearchState((prev) => ({ ...prev, inStockOnly }))
  }

  const resetFilters = () => {
    setSearchState(initialState)
  }

  const filterProducts = (products: Product[]): Product[] => {
    let filtered = products

    // Filter by search query
    if (searchState.query) {
      const query = searchState.query.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (searchState.category !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === searchState.category.toLowerCase())
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= searchState.priceRange[0] && product.price <= searchState.priceRange[1],
    )

    // Filter by stock status
    if (searchState.inStockOnly) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Sort products
    switch (searchState.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // In a real app, you'd sort by creation date
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }

  return (
    <SearchContext.Provider
      value={{
        searchState,
        setQuery,
        setCategory,
        setPriceRange,
        setSortBy,
        setInStockOnly,
        resetFilters,
        filterProducts,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}
