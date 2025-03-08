import SearchBar from "@/components/search-bar";
import FeaturedDeals from "@/components/featured-deals";
import PopularCategories from "@/components/popular-categories";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 md:py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find the Best Deals Across the Web
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare prices from multiple stores in real-time and save money on
            your purchases
          </p>
        </div>
        <SearchBar />
      </section>

      {/* <FeaturedDeals /> */}
      <PopularCategories />
      <HowItWorks />
    </div>
  );
}
