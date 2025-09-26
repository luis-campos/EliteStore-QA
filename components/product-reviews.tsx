import { Star, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Product } from "@/lib/types"

interface ProductReviewsProps {
  product: Product
}

// Mock review data
const mockReviews = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent quality!",
    content:
      "This product exceeded my expectations. The build quality is fantastic and it works exactly as described. Highly recommend!",
    helpful: 12,
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-01-10",
    title: "Great value for money",
    content:
      "Really happy with this purchase. Good quality and fast shipping. Only minor complaint is the packaging could be better.",
    helpful: 8,
  },
  {
    id: "3",
    author: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-01-05",
    title: "Perfect!",
    content:
      "Exactly what I was looking for. Works perfectly and looks great. Will definitely buy from this store again.",
    helpful: 15,
  },
]

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button variant="outline">Write a Review</Button>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-8 p-6 bg-muted/30 rounded-lg">
        <div className="text-center">
          <div className="text-4xl font-bold mb-1">{product.rating}</div>
          <div className="flex items-center justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-8">{stars}★</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">{stars === 5 ? 70 : stars === 4 ? 20 : 10}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>
                    {review.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{review.author}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
