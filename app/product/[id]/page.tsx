import { Suspense } from "react"
import ProductDetails from "@/components/product-details"
import PriceComparison from "@/components/price-comparison"
import PriceHistory from "@/components/price-history"
import RelatedProducts from "@/components/related-products"
import ProductSkeleton from "@/components/product-skeleton"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Price Comparison</h2>
        <Suspense fallback={<div className="h-64 bg-muted rounded-lg animate-pulse" />}>
          <PriceComparison productId={params.id} />
        </Suspense>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Price History</h2>
        <Suspense fallback={<div className="h-64 bg-muted rounded-lg animate-pulse" />}>
          <PriceHistory productId={params.id} />
        </Suspense>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <Suspense fallback={<div className="h-64 bg-muted rounded-lg animate-pulse" />}>
          <RelatedProducts productId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

