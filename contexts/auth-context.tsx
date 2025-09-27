"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "user" | "admin"
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; user: User }
  | { type: "LOGIN_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; user: User }
  | { type: "REGISTER_FAILURE" }
  | { type: "LOAD_USER"; user: User | null }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>
  logout: () => void
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return { ...state, isLoading: true }

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
      }

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      }

    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
      }

    case "LOAD_USER":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: !!action.user,
        user: action.user,
      }

    default:
      return state
  }
}

// Mock users for testing
const mockUsers: Array<User & { password: string }> = [
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("elitestore_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        dispatch({ type: "LOAD_USER", user })
      } catch {
        localStorage.removeItem("elitestore_user")
        dispatch({ type: "LOAD_USER", user: null })
      }
    } else {
      dispatch({ type: "LOAD_USER", user: null })
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      localStorage.setItem("elitestore_user", JSON.stringify(userWithoutPassword))
      dispatch({ type: "LOGIN_SUCCESS", user: userWithoutPassword })
      return true
    } else {
      dispatch({ type: "LOGIN_FAILURE" })
      return false
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    dispatch({ type: "REGISTER_START" })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      dispatch({ type: "REGISTER_FAILURE" })
      return false
    }

    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      firstName,
      lastName,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    // Add to mock users (in real app, this would be an API call)
    mockUsers.push({ ...newUser, password })

    localStorage.setItem("elitestore_user", JSON.stringify(newUser))
    dispatch({ type: "REGISTER_SUCCESS", user: newUser })
    return true
  }

  const logout = () => {
    localStorage.removeItem("elitestore_user")
    dispatch({ type: "LOGOUT" })
  }

  return <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
