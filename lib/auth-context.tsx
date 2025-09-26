"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; user: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "LOAD_USER"; user: User | null }

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
} | null>(null)

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true }
    case "LOGIN_SUCCESS":
      return { user: action.user, isLoading: false, isAuthenticated: true }
    case "LOGIN_ERROR":
      return { user: null, isLoading: false, isAuthenticated: false }
    case "LOGOUT":
      return { user: null, isLoading: false, isAuthenticated: false }
    case "LOAD_USER":
      return {
        user: action.user,
        isLoading: false,
        isAuthenticated: !!action.user,
      }
    default:
      return state
  }
}

// Mock users for demonstration
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", password: "password123" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password123" },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        dispatch({ type: "LOAD_USER", user })
      } catch (error) {
        console.error("Failed to load user from localStorage:", error)
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

    // Mock authentication
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      dispatch({ type: "LOGIN_SUCCESS", user: userWithoutPassword })
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    } else {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" })

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      dispatch({ type: "LOGIN_ERROR" })
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
    }

    // Add to mock users (in real app, this would be an API call)
    mockUsers.push({ ...newUser, password })

    dispatch({ type: "LOGIN_SUCCESS", user: newUser })
    localStorage.setItem("user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    localStorage.removeItem("user")
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
