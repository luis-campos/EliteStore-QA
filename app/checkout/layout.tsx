import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - EliteStore",
  description: "Complete your purchase securely",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
