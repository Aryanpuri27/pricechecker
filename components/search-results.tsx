import Scraper from "@/lib/scraper";
import type { ScrapedProduct } from "@/lib/scraper";
import SearchResultsClient from "./SearchResultClient";

export default async function SearchResults({
  query,
  category,
  sort,
  minPrice,
  maxPrice,
}: {
  query: string;
  category: string;
  sort: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  const scraper = new Scraper();
  const products: ScrapedProduct[] = await scraper.searchMultipleStores(query);
  console.log(products, "products found");

  // Pass the fetched products to the client component as initial data.
  return <SearchResultsClient initialProducts={products} query={query} />;
}
