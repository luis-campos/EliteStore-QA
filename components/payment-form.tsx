"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Lock } from "lucide-react"

interface PaymentFormProps {
  onSubmit: (e: React.FormEvent) => void
  isProcessing: boolean
}

export function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardName">Cardholder Name</Label>
        <Input
          id="cardName"
          placeholder="John Doe"
          value={cardInfo.name}
          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardInfo.number}
            onChange={(e) => setCardInfo({ ...cardInfo, number: formatCardNumber(e.target.value) })}
            maxLength={19}
            required
          />
          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={cardInfo.expiry}
            onChange={(e) => setCardInfo({ ...cardInfo, expiry: formatExpiry(e.target.value) })}
            maxLength={5}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvc">CVC</Label>
          <Input
            id="cvc"
            placeholder="123"
            value={cardInfo.cvc}
            onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value.replace(/[^0-9]/g, "") })}
            maxLength={4}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isProcessing}>
        <Lock className="h-4 w-4 mr-2" />
        {isProcessing ? "Processing Payment..." : "Complete Order"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">Your payment information is encrypted and secure</p>
    </form>
  )
}
