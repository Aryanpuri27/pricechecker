import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Shirt, Home, BookOpen, Gamepad2, Gift } from "lucide-react";

const categories = [
  {
    id: "electronics",
    name: "Electronics",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "clothing",
    name: "Clothing",
    icon: <Shirt className="h-8 w-8" />,
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "home",
    name: "Home & Kitchen",
    icon: <Home className="h-8 w-8" />,
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "books",
    name: "Books",
    icon: <BookOpen className="h-8 w-8" />,
    color: "bg-amber-100 dark:bg-amber-900/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: <Gamepad2 className="h-8 w-8" />,
    color: "bg-red-100 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    id: "gifts",
    name: "Gifts",
    icon: <Gift className="h-8 w-8" />,
    color: "bg-indigo-100 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link href={`/search?q=${category.name}`} key={category.id}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className={`rounded-full p-4 mb-4 ${category.color}`}>
                  <div className={category.textColor}>{category.icon}</div>
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
