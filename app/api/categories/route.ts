import { NextResponse } from "next/server"
import { categories } from "@/lib/mock-data"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: categories,
      total: categories.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 },
    )
  }
}
