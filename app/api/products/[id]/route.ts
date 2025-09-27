import { type NextRequest, NextResponse } from "next/server"
import { products, getProductById } from "@/lib/mock-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id)

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const productIndex = products.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      name: body.name || products[productIndex].name,
      price: body.price ? Number.parseFloat(body.price) : products[productIndex].price,
      originalPrice: body.originalPrice ? Number.parseFloat(body.originalPrice) : products[productIndex].originalPrice,
      description: body.description || products[productIndex].description,
      image: body.image || products[productIndex].image,
      category: body.category || products[productIndex].category,
      inStock: body.inStock !== undefined ? body.inStock : products[productIndex].inStock,
      rating: body.rating ? Number.parseFloat(body.rating) : products[productIndex].rating,
      reviews: body.reviews ? Number.parseInt(body.reviews) : products[productIndex].reviews,
      featured: body.featured !== undefined ? body.featured : products[productIndex].featured,
    }

    products[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productIndex = products.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 },
      )
    }

    // Remove product
    const deletedProduct = products.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete product",
      },
      { status: 500 },
    )
  }
}
