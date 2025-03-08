import { Suspense } from "react";
import SearchResults from "@/components/search-results";
import SearchFilters from "@/components/search-filters";
import SearchSkeleton from "@/components/search-skeleton";

export default async function SearchPage({
  searchParams,
}: {
  searchParams:
    | { [key: string]: string | string[] | undefined }
    | Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const category =
    typeof params.category === "string" ? params.category : "all";
  const sort = typeof params.sort === "string" ? params.sort : "relevance";
  const minPrice =
    typeof params.minPrice === "string"
      ? Number.parseInt(params.minPrice)
      : undefined;
  const maxPrice =
    typeof params.maxPrice === "string"
      ? Number.parseInt(params.maxPrice)
      : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid  gap-6">
        <div className="">
          <h1 className="text-2xl font-bold mb-6">
            Search Results for "{query}"
          </h1>
          <Suspense fallback={<SearchSkeleton />}>
            <SearchResults
              query={query}
              category={category}
              sort={sort}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
