import { type NextRequest, NextResponse } from "next/server"

// Mock users storage (in a real app, this would be a database)
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
    const { email, password, firstName, lastName } = await request.json()

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          success: false,
          error: "All fields are required",
        },
        { status: 400 },
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: "Password must be at least 6 characters long",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User with this email already exists",
        },
        { status: 409 },
      )
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      password,
      firstName,
      lastName,
      role: "user" as const,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token: `mock-jwt-token-${newUser.id}`,
      },
      message: "Registration successful",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Registration failed",
      },
      { status: 500 },
    )
  }
}
