import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products - EliteStore",
  description: "...",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
