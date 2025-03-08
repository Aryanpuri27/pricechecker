"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { ScrapedProduct } from "@/lib/scraper";

interface SearchResultsClientProps {
  initialProducts: ScrapedProduct[];
  query: string;
}

export default function SearchResultsClient({
  initialProducts,
  query,
}: SearchResultsClientProps) {
  const [results, setResults] = useState<ScrapedProduct[]>(initialProducts);

  // Optionally add client-side effects for live updates:
  // useEffect(() => {
  //   // e.g., set an interval or subscribe to updates
  // }, []);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Showing {results.length} results for "{query}"
      </p>

      <div className="grid gap-6">
        {results.map((product) => (
          <Link href={`${product.url}`} key={product.image}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[200px_1fr_200px]">
                  <div className="relative p-4 flex items-center justify-center">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="w-24 h-24 object-contain"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating || 0)
                                  ? "fill-primary text-primary"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews?.toLocaleString()})
                        </span>
                      </div>
                      {/* <div className="text-sm text-muted-foreground mb-2">
                        Category: {product.category}
                      </div> */}
                      {/* {product.freeShipping && (
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          Free Shipping
                        </Badge>
                      )} */}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-2xl font-bold">
                          Rs.{product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">
                        Best price at{" "}
                        <span className="font-medium">{product.store}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor(Math.random() * 20) + 1} people bought this in
                      the last 24 hours
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
