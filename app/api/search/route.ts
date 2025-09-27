import { type NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/mock-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const limit = searchParams.get("limit")

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: "Search query is required",
        },
        { status: 400 },
      )
    }

    const searchLower = query.toLowerCase()
    let results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower),
    )

    // Apply limit if specified
    if (limit) {
      const limitNum = Number.parseInt(limit)
      if (!isNaN(limitNum) && limitNum > 0) {
        results = results.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
      query,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
      },
      { status: 500 },
    )
  }
}
