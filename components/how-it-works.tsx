import { Search, BarChart3, Zap } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-10 w-10" />,
    title: "Search Products",
    description: "Enter what you're looking for and we'll find the best deals across multiple stores.",
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Compare Prices",
    description: "See prices from different retailers side by side, along with shipping costs and availability.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Save Money",
    description: "Choose the best deal and save money on your purchase. We'll even track price history for you.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

