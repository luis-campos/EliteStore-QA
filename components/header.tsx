"use client"

import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartButton } from "@/components/cart-button"
import { UserMenu } from "@/components/user-menu"
import { useSearch } from "@/lib/search-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const { searchState, setQuery } = useSearch()
  const [localQuery, setLocalQuery] = useState(searchState.query)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(localQuery)
      if (localQuery && window.location.pathname === "/") {
        router.push("/#products")
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setQuery, router])

  useEffect(() => {
    setLocalQuery(searchState.query)
  }, [searchState.query])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="font-bold text-xl">EliteStore</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 pr-4"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <UserMenu />
            <CartButton />
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
