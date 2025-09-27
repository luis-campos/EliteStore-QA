import { type NextRequest, NextResponse } from "next/server"

// Mock orders storage
const mockOrders: Array<{
  id: string
  userId: string
  items: Array<{
    productId: string
    productName: string
    price: number
    quantity: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  createdAt: string
}> = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let filteredOrders = [...mockOrders]

    if (userId) {
      filteredOrders = filteredOrders.filter((order) => order.userId === userId)
    }

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      total: filteredOrders.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["userId", "items", "total", "shippingAddress"]
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

    // Create new order
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: body.userId,
      items: body.items,
      total: body.total,
      status: "pending" as const,
      shippingAddress: body.shippingAddress,
      createdAt: new Date().toISOString(),
    }

    mockOrders.push(newOrder)

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 },
    )
  }
}
