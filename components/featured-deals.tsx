import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Mock data - would be fetched from API in real implementation
const featuredDeals = [
  {
    id: "1",
    title: "Apple AirPods Pro (2nd Generation)",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 199.99,
    originalPrice: 249.99,
    discount: 20,
    store: "Amazon",
    category: "Electronics",
  },
  {
    id: "2",
    title: 'Samsung 55" QLED 4K Smart TV',
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 699.99,
    originalPrice: 999.99,
    discount: 30,
    store: "Best Buy",
    category: "Electronics",
  },
  {
    id: "3",
    title: "Ninja Foodi 8-Quart Air Fryer",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 149.99,
    originalPrice: 219.99,
    discount: 32,
    store: "Walmart",
    category: "Home & Kitchen",
  },
  {
    id: "4",
    title: "Nike Air Zoom Pegasus 38",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 89.99,
    originalPrice: 129.99,
    discount: 31,
    store: "Nike",
    category: "Clothing",
  },
]

export default function FeaturedDeals() {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Deals</h2>
        <Link href="/deals" className="text-primary hover:underline">
          View all deals
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredDeals.map((deal) => (
          <Link href={`/product/${deal.id}`} key={deal.id}>
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative pt-4 px-4">
                <Badge className="absolute top-2 right-2 bg-destructive hover:bg-destructive">
                  {deal.discount}% OFF
                </Badge>
                <div className="flex justify-center">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.title}
                    width={200}
                    height={200}
                    className="object-contain h-48"
                  />
                </div>
              </div>

              <CardContent className="p-4">
                <div className="text-xs text-muted-foreground mb-1">{deal.category}</div>
                <h3 className="font-medium line-clamp-2 mb-2">{deal.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">${deal.currentPrice.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">${deal.originalPrice.toFixed(2)}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Best price at <span className="font-medium">{deal.store}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

