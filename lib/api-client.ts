// API client utility functions for making requests to our API routes

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  total?: number
}

class ApiClient {
  private baseUrl = "/api"

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  }

  // Products API
  async getProducts(params?: {
    category?: string
    search?: string
    featured?: boolean
    inStock?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)
    if (params?.featured !== undefined) searchParams.set("featured", params.featured.toString())
    if (params?.inStock !== undefined) searchParams.set("inStock", params.inStock.toString())

    const query = searchParams.toString()
    return this.request(`/products${query ? `?${query}` : ""}`)
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`)
  }

  async createProduct(productData: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Categories API
  async getCategories() {
    return this.request("/categories")
  }

  // Auth API
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
    })
  }

  // Orders API
  async getOrders(userId?: string) {
    const query = userId ? `?userId=${userId}` : ""
    return this.request(`/orders${query}`)
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`)
  }

  async createOrder(orderData: any) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  }

  async updateOrder(id: string, orderData: any) {
    return this.request(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(orderData),
    })
  }

  // Search API
  async search(query: string, limit?: number) {
    const searchParams = new URLSearchParams({ q: query })
    if (limit) searchParams.set("limit", limit.toString())
    return this.request(`/search?${searchParams.toString()}`)
  }

  // Health check
  async healthCheck() {
    return this.request("/health")
  }
}

export const apiClient = new ApiClient()
