import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Bell, Share2, Heart } from "lucide-react"

// This would be a server component in a real implementation
// that fetches data based on product ID
export default function ProductDetails({ id }: { id: string }) {
  // Mock data - would be fetched from API in real implementation
  const product = {
    id,
    title: "Apple AirPods Pro (2nd Generation)",
    description:
      "AirPods Pro feature Active Noise Cancellation, Transparency mode, Spatial Audio with dynamic head tracking, and a newly designed charging case with Find My, Lanyard loop, and speaker.",
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    currentPrice: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.7,
    reviews: 12453,
    category: "Electronics",
    brand: "Apple",
    model: "MQD83AM/A",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial Audio with dynamic head tracking",
      "Up to 6 hours of listening time with a single charge",
      "MagSafe Charging Case with speaker and lanyard loop",
      "Sweat and water resistant",
    ],
    specifications: {
      Dimensions: "1.22 x 0.86 x 0.94 inches (AirPod)",
      Weight: "0.19 ounces (AirPod)",
      Connectivity: "Bluetooth 5.3",
      Sensors: "Dual beamforming microphones, Inward-facing microphone, Skin-detect sensor",
      Chip: "H2 headphone chip",
      "Battery Life": "Up to 6 hours of listening time with ANC enabled",
      Charging: "MagSafe Charging Case, Lightning connector, Qi wireless charging",
    },
  }

  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border">
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
          {product.discount > 0 && (
            <Badge className="absolute top-4 left-4 bg-destructive hover:bg-destructive">{product.discount}% OFF</Badge>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg border cursor-pointer hover:border-primary"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.title} - Image ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">${product.currentPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Brand:</span>
            <span className="text-sm">{product.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Model:</span>
            <span className="text-sm">{product.model}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Category:</span>
            <span className="text-sm">{product.category}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button className="w-full">Add to Price Alert</Button>
          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="flex-1">
              <Bell className="h-5 w-5 mr-2" />
              Set Price Alert
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="pt-4">
            <div className="space-y-2 text-sm">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

