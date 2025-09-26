"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"
import { useState } from "react"

export function CartButton() {
  const { state } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" size="sm" className="relative" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="h-4 w-4" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {state.itemCount}
          </span>
        )}
      </Button>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
