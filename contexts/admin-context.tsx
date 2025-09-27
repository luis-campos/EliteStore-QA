"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Product } from "@/lib/mock-data"
import { products as initialProducts } from "@/lib/mock-data"

interface AdminState {
  products: Product[]
  isLoading: boolean
}

type AdminAction =
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "UPDATE_PRODUCT"; product: Product }
  | { type: "DELETE_PRODUCT"; productId: string }
  | { type: "SET_PRODUCTS"; products: Product[] }

const AdminContext = createContext<{
  state: AdminState
  dispatch: React.Dispatch<AdminAction>
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
} | null>(null)

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.loading }

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.product],
      }

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.product.id ? action.product : p)),
      }

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.productId),
      }

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.products,
      }

    default:
      return state
  }
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, {
    products: initialProducts,
    isLoading: false,
  })

  const addProduct = (productData: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...productData,
      id: (state.products.length + 1).toString(),
    }
    dispatch({ type: "ADD_PRODUCT", product: newProduct })
  }

  const updateProduct = (product: Product) => {
    dispatch({ type: "UPDATE_PRODUCT", product })
  }

  const deleteProduct = (productId: string) => {
    dispatch({ type: "DELETE_PRODUCT", productId })
  }

  return (
    <AdminContext.Provider value={{ state, dispatch, addProduct, updateProduct, deleteProduct }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
