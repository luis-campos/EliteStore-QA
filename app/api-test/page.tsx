"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/api-client"

export default function ApiTestPage() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(true)
    try {
      const result = await testFn()
      setResults({ test: testName, result })
    } catch (error) {
      setResults({ test: testName, error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const tests = [
    {
      name: "Health Check",
      fn: () => apiClient.healthCheck(),
    },
    {
      name: "Get All Products",
      fn: () => apiClient.getProducts(),
    },
    {
      name: "Get Featured Products",
      fn: () => apiClient.getProducts({ featured: true }),
    },
    {
      name: "Get Electronics Category",
      fn: () => apiClient.getProducts({ category: "electronics" }),
    },
    {
      name: "Get Categories",
      fn: () => apiClient.getCategories(),
    },
    {
      name: "Get Product by ID",
      fn: () => apiClient.getProduct("1"),
    },
    {
      name: "Search Products",
      fn: () => apiClient.search(searchQuery || "headphones"),
    },
    {
      name: "Test Login (Admin)",
      fn: () => apiClient.login("admin@elitestore.com", "admin123"),
    },
    {
      name: "Test Login (User)",
      fn: () => apiClient.login("user@example.com", "user123"),
    },
    {
      name: "Get Orders",
      fn: () => apiClient.getOrders(),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Testing Dashboard</h1>
          <p className="text-muted-foreground">Test all API endpoints for the EliteStore application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Tests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="searchQuery">Search Query (for search test)</Label>
                  <Input
                    id="searchQuery"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter search term..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {tests.map((test) => (
                    <Button
                      key={test.name}
                      variant="outline"
                      onClick={() => runTest(test.name, test.fn)}
                      disabled={loading}
                      className="justify-start bg-transparent"
                    >
                      {test.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">Running test...</div>
                  </div>
                ) : results ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Test: {results.test}</Label>
                    </div>
                    <div>
                      <Label>Result:</Label>
                      <Textarea
                        value={JSON.stringify(results.result || results.error, null, 2)}
                        readOnly
                        rows={20}
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Select a test to run</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* API Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Products</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>GET /api/products - Get all products with optional filters</li>
                  <li>POST /api/products - Create a new product</li>
                  <li>GET /api/products/[id] - Get product by ID</li>
                  <li>PUT /api/products/[id] - Update product</li>
                  <li>DELETE /api/products/[id] - Delete product</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Categories</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>GET /api/categories - Get all categories</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Authentication</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>POST /api/auth/login - User login</li>
                  <li>POST /api/auth/register - User registration</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Orders</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>GET /api/orders - Get all orders</li>
                  <li>POST /api/orders - Create a new order</li>
                  <li>GET /api/orders/[id] - Get order by ID</li>
                  <li>PUT /api/orders/[id] - Update order status</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Search</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>GET /api/search?q=query - Search products</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Health</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>GET /api/health - API health check</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
