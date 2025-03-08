"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// This would fetch data from an API in a real implementation
export default function PriceHistory({ productId }: { productId: string }) {
  const [timeRange, setTimeRange] = useState("6m")

  // Mock data - would be fetched from API in real implementation
  const generateMockData = (range: string) => {
    const now = new Date()
    const data = []

    let days = 30
    if (range === "3m") days = 90
    if (range === "6m") days = 180
    if (range === "1y") days = 365

    for (let i = days; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)

      // Generate random price fluctuations
      const basePrice = 249.99
      const amazonPrice = basePrice - Math.random() * 50
      const bestBuyPrice = basePrice - Math.random() * 40
      const walmartPrice = basePrice - Math.random() * 30

      data.push({
        date: date.toISOString().split("T")[0],
        Amazon: amazonPrice.toFixed(2),
        "Best Buy": bestBuyPrice.toFixed(2),
        Walmart: walmartPrice.toFixed(2),
      })
    }

    return data
  }

  const data = generateMockData(timeRange)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Price History</h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="time-range" className="text-sm">
              Time Range:
            </Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger id="time-range" className="w-[120px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.getMonth() + 1}/${date.getDate()}`
                }}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                domain={["dataMin - 10", "dataMax + 10"]}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                labelFormatter={(label) => {
                  const date = new Date(label)
                  return date.toLocaleDateString()
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Amazon"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Best Buy"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Walmart"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

