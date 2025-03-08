"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const searchParams = new URLSearchParams()
      searchParams.set("q", query)
      if (category !== "all") {
        searchParams.set("category", category)
      }
      router.push(`/search?${searchParams.toString()}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-10 h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px] h-12">
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

        <Button type="submit" className="h-12 px-8">
          Search
        </Button>
      </div>
    </form>
  )
}

