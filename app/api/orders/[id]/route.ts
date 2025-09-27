import { type NextRequest, NextResponse } from "next/server"

// Mock orders storage (shared with orders/route.ts)
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = mockOrders.find((o) => o.id === params.id)

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch order",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const orderIndex = mockOrders.findIndex((o) => o.id === params.id)

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 },
      )
    }

    // Update order status
    const updatedOrder = {
      ...mockOrders[orderIndex],
      status: body.status || mockOrders[orderIndex].status,
    }

    mockOrders[orderIndex] = updatedOrder

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: "Order updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
      },
      { status: 500 },
    )
  }
}
