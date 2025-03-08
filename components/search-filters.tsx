"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface SearchFiltersProps {
  query: string
  category: string
  minPrice?: number
  maxPrice?: number
  sort: string
}

export default function SearchFilters({ query, category, minPrice = 0, maxPrice = 1000, sort }: SearchFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice])
  const [selectedCategory, setSelectedCategory] = useState<string>(category)
  const [selectedSort, setSelectedSort] = useState<string>(sort)
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  // Mock data - would be fetched from API in real implementation
  const stores = [
    { id: "amazon", name: "Amazon" },
    { id: "bestbuy", name: "Best Buy" },
    { id: "walmart", name: "Walmart" },
    { id: "target", name: "Target" },
    { id: "newegg", name: "Newegg" },
  ]

  const brands = [
    { id: "apple", name: "Apple" },
    { id: "samsung", name: "Samsung" },
    { id: "sony", name: "Sony" },
    { id: "lg", name: "LG" },
    { id: "microsoft", name: "Microsoft" },
  ]

  const toggleStore = (storeId: string) => {
    setSelectedStores((prev) => (prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]))
  }

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) => (prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId]))
  }

  const applyFilters = () => {
    const searchParams = new URLSearchParams()

    if (query) searchParams.set("q", query)
    if (selectedCategory !== "all") searchParams.set("category", selectedCategory)
    if (selectedSort !== "relevance") searchParams.set("sort", selectedSort)
    if (priceRange[0] > 0) searchParams.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 1000) searchParams.set("maxPrice", priceRange[1].toString())
    if (selectedStores.length > 0) searchParams.set("stores", selectedStores.join(","))
    if (selectedBrands.length > 0) searchParams.set("brands", selectedBrands.join(","))

    router.push(`${pathname}?${searchParams.toString()}`)
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategory("all")
    setSelectedSort("relevance")
    setSelectedStores([])
    setSelectedBrands([])

    router.push(`${pathname}?q=${query}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="sort">Sort By</Label>
          <Select value={selectedSort} onValueChange={setSelectedSort}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="home">Home & Kitchen</SelectItem>
              <SelectItem value="books">Books</SelectItem>
              <SelectItem value="toys">Toys & Games</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["price", "stores", "brands"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={1000}
                step={10}
                onValueChange={(value: [number, number]) => setPriceRange(value)}
              />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="stores">
          <AccordionTrigger>Stores</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`store-${store.id}`}
                    checked={selectedStores.includes(store.id)}
                    onCheckedChange={() => toggleStore(store.id)}
                  />
                  <Label htmlFor={`store-${store.id}`} className="text-sm font-normal cursor-pointer">
                    {store.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => toggleBrand(brand.id)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal cursor-pointer">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}

