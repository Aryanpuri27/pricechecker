import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

// This would be a server component in a real implementation
// that fetches data based on product ID
export default function RelatedProducts({ productId }: { productId: string }) {
  // Mock data - would be fetched from API in real implementation
  const products = [
    {
      id: "2",
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      image: "/placeholder.svg?height=200&width=200",
      price: 349.99,
      store: "Amazon",
    },
    {
      id: "3",
      title: "Bose QuietComfort Earbuds II",
      image: "/placeholder.svg?height=200&width=200",
      price: 249.99,
      store: "Best Buy",
    },
    {
      id: "4",
      title: "Beats Studio Pro",
      image: "/placeholder.svg?height=200&width=200",
      price: 299.99,
      store: "Target",
    },
    {
      id: "5",
      title: "Samsung Galaxy Buds 2 Pro",
      image: "/placeholder.svg?height=200&width=200",
      price: 189.99,
      store: "Walmart",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-center mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="object-contain h-36"
                />
              </div>
              <h3 className="font-medium line-clamp-2 mb-2">{product.title}</h3>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground">Best at {product.store}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

