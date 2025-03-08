import { Skeleton } from "@/components/ui/skeleton"

export default function ProductSkeleton() {
  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <Skeleton className="aspect-square rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-40" />
        </div>

        <Skeleton className="h-10 w-32" />

        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}

