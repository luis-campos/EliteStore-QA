"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface ProductImageGalleryProps {
  product: Product
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  // Mock additional images for gallery
  const images = [
    product.image,
    product.image, // In a real app, these would be different angles
    product.image,
    product.image,
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <img
          src={images[currentImage] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent"
              onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent"
              onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`aspect-square rounded-md overflow-hidden border-2 ${
                currentImage === index ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
