import { type NextRequest, NextResponse } from "next/server"

// Mock users for authentication
const mockUsers = [
  {
    id: "1",
    email: "admin@elitestore.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: "2024-01-02T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token: `mock-jwt-token-${user.id}`, // In a real app, this would be a proper JWT
      },
      message: "Login successful",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Login failed",
      },
      { status: 500 },
    )
  }
}
