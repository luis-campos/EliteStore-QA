import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { AdminProvider } from "@/contexts/admin-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EliteStore - Premium E-commerce Experience",
  description: "Discover premium products with exceptional quality and unbeatable prices at EliteStore.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main>{children}</main>
                <Footer />
              </Suspense>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
