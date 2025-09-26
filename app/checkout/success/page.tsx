"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Mail } from "lucide-react"
import { Header } from "@/components/header"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  // Generate a mock order number
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>3-5 business days</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Confirmation Email</h3>
                <p className="text-sm text-muted-foreground">We've sent a confirmation email with your order details</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Track Your Order</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your order ships
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/orders">View Order History</Link>
            </Button>
            <div>
              <Button variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
