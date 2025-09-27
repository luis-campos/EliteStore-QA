import { type NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const featured = searchParams.get("featured")
    const inStock = searchParams.get("inStock")

    let filteredProducts = [...products]

    // Filter by category
    if (category && category !== "all") {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
      )
    }

    // Filter by featured
    if (featured === "true") {
      filteredProducts = filteredProducts.filter((product) => product.featured)
    }

    // Filter by stock status
    if (inStock === "true") {
      filteredProducts = filteredProducts.filter((product) => product.inStock)
    } else if (inStock === "false") {
      filteredProducts = filteredProducts.filter((product) => !product.inStock)
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "price", "description", "category"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 },
        )
      }
    }

    // Create new product
    const newProduct = {
      id: (products.length + 1).toString(),
      name: body.name,
      price: Number.parseFloat(body.price),
      originalPrice: body.originalPrice ? Number.parseFloat(body.originalPrice) : undefined,
      description: body.description,
      image: body.image || "/placeholder.svg?height=400&width=400",
      category: body.category,
      inStock: body.inStock !== false,
      rating: body.rating ? Number.parseFloat(body.rating) : 4.5,
      reviews: body.reviews ? Number.parseInt(body.reviews) : 0,
      featured: body.featured === true,
    }

    // Add to products array (in a real app, this would be saved to database)
    products.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 },
    )
  }
}
