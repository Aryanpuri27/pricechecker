import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function SearchSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-64" />

      <div className="grid gap-6">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_200px]">
                <div className="p-4 flex items-center justify-center">
                  <Skeleton className="h-36 w-36 rounded-md" />
                </div>

                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>

                <div className="p-4 border-t md:border-t-0 md:border-l">
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

