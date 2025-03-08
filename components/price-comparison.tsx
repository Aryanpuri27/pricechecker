import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Clock, Truck } from "lucide-react"

// This would be a server component in a real implementation
// that fetches data based on product ID
export default function PriceComparison({ productId }: { productId: string }) {
  // Mock data - would be fetched from API in real implementation
  const prices = [
    {
      store: "Amazon",
      logo: "/placeholder.svg?height=40&width=100",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      shipping: 0,
      deliveryEstimate: "1-2 days",
      inStock: true,
      url: "https://amazon.com",
    },
    {
      store: "Best Buy",
      logo: "/placeholder.svg?height=40&width=100",
      price: 209.99,
      originalPrice: 249.99,
      discount: 16,
      shipping: 0,
      deliveryEstimate: "2-3 days",
      inStock: true,
      url: "https://bestbuy.com",
    },
    {
      store: "Walmart",
      logo: "/placeholder.svg?height=40&width=100",
      price: 219.99,
      originalPrice: 249.99,
      discount: 12,
      shipping: 0,
      deliveryEstimate: "3-5 days",
      inStock: true,
      url: "https://walmart.com",
    },
    {
      store: "Target",
      logo: "/placeholder.svg?height=40&width=100",
      price: 229.99,
      originalPrice: 249.99,
      discount: 8,
      shipping: 5.99,
      deliveryEstimate: "2-4 days",
      inStock: true,
      url: "https://target.com",
    },
    {
      store: "Apple",
      logo: "/placeholder.svg?height=40&width=100",
      price: 249.99,
      originalPrice: 249.99,
      discount: 0,
      shipping: 0,
      deliveryEstimate: "1-3 days",
      inStock: true,
      url: "https://apple.com",
    },
  ]

  return (
    <div className="space-y-4">
      {prices.map((item, index) => (
        <Card key={index} className={index === 0 ? "border-primary" : ""}>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[200px_1fr_auto]">
              <div className="p-4 flex items-center justify-center border-b md:border-b-0 md:border-r">
                <div className="relative h-10 w-32">
                  <Image src={item.logo || "/placeholder.svg"} alt={item.store} fill className="object-contain" />
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">${item.price.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {index === 0 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      Best Price
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    Shipping: {item.shipping === 0 ? "Free" : `$${item.shipping.toFixed(2)}`}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Delivery: {item.deliveryEstimate}
                  </div>
                </div>

                <div className="mt-2 text-sm">
                  {item.inStock ? (
                    <span className="text-green-600 dark:text-green-400">In Stock</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="p-4 flex items-center justify-center border-t md:border-t-0 md:border-l">
                <Button asChild>
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    Go to Store
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

