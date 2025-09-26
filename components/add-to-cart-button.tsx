"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    dispatch({ type: "ADD_ITEM", product, quantity })

    // Brief loading state for better UX
    setTimeout(() => {
      setIsAdding(false)
    }, 300)
  }

  return (
    <Button className={`w-full ${className}`} size="sm" onClick={handleAddToCart} disabled={isAdding}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isAdding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
