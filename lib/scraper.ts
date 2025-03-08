import puppeteer, { Browser, Page } from "puppeteer";

export interface ScrapedProduct {
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image?: string;
  url: string;
  store: string;
  rating?: number;
  reviews?: number;
  availability: boolean;
  shipping?: number;
  deliveryEstimate?: string;
}

interface ScraperOptions {
  headless?: boolean;
  timeout?: number;
  userAgent?: string;
}

export class Scraper {
  private browser: Browser | null = null;
  private options: ScraperOptions;

  constructor(options: ScraperOptions = {}) {
    this.options = {
      headless: true,
      timeout: 30000,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      ...options,
    };
  }

  async initialize(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: this.options.headless ? "new" : false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--disable-gpu",
          "--window-size=1920,1080",
        ],
        defaultViewport: { width: 1920, height: 1080 },
      });
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  private async createPage(): Promise<Page> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser!.newPage();
    await page.setUserAgent(this.options.userAgent!);
    await page.setDefaultNavigationTimeout(this.options.timeout!);

    // Block unnecessary resources to speed up scraping
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      const resourceType = req.resourceType();
      if (
        resourceType === "image" ||
        resourceType === "stylesheet" ||
        resourceType === "font"
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    return page;
  }

  async searchAmazonIndia(query: string): Promise<ScrapedProduct[]> {
    const page = await this.createPage();
    const products: ScrapedProduct[] = [];

    try {
      // Navigate to Amazon India search page
      await page.goto(
        `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
        { waitUntil: "domcontentloaded" }
      );

      // Wait for search results to load
      await page.waitForSelector('[data-component-type="s-search-result"]');

      // Extract product data
      const productElements = await page.$$(
        '[data-component-type="s-search-result"]'
      );

      for (const element of productElements.slice(0, 10)) {
        try {
          const titleElement = await element.$("a h2 span");

          const priceElement = await element.$(".a-price .a-offscreen");

          const originalPriceElement = await element.$(
            ".a-price.a-text-price .a-offscreen"
          );
          const ratingElement = await element.$(".a-icon-star-small");
          const reviewsElement = await element.$(
            "span.a-size-base.s-underline-text"
          );
          const urlElement = await element.$(" a");
          const imageElement = await element.$("img.s-image");

          if (titleElement && priceElement) {
            const title = await page.evaluate(
              (el) => el.textContent.trim(),
              titleElement
            );
            const priceText = await page.evaluate(
              (el) => el.textContent.trim(),
              priceElement
            );
            const price = Number.parseFloat(priceText.replace(/[^0-9.]/g, ""));
            let originalPrice: number | undefined;
            if (originalPriceElement) {
              const originalPriceText = await page.evaluate(
                (el) => el.textContent.trim(),
                originalPriceElement
              );
              originalPrice = Number.parseFloat(
                originalPriceText.replace(/[^0-9.]/g, "")
              );
            }

            let rating: number | undefined;
            if (ratingElement) {
              const ratingText = await page.evaluate(
                (el) => el.textContent.trim(),
                ratingElement
              );
              const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
              if (ratingMatch) {
                rating = Number.parseFloat(ratingMatch[0]);
              }
            }

            let reviews: number | undefined;
            if (reviewsElement) {
              const reviewsText = await page.evaluate(
                (el) => el.textContent.trim(),
                reviewsElement
              );
              const reviewsMatch = reviewsText.match(/(\d+)/g);
              if (reviewsMatch) {
                reviews = Number.parseInt(reviewsMatch.join(""), 10);
              }
            }

            let url = "";
            if (urlElement) {
              url = await page.evaluate(
                (el) => el.getAttribute("href"),
                urlElement
              );
              if (!url.startsWith("http")) {
                url = "https://www.amazon.in" + url;
              }
            }

            if (imageElement) {
              const image = await page.evaluate(
                (el) => el.getAttribute("src"),
                imageElement
              );
              console.log("Image URL:", image);
            }

            const discount = originalPrice
              ? Math.round(((originalPrice - price) / originalPrice) * 100)
              : undefined;

            products.push({
              title,
              price,
              originalPrice,
              discount,
              url,
              store: "Amazon India",
              rating,
              reviews,
              availability: true,
              shipping: 0,
              deliveryEstimate: "1-2 days",
              image: imageElement
                ? await page.evaluate(
                    (el) => el.getAttribute("src"),
                    imageElement
                  )
                : undefined,
            });
          }
        } catch (error) {
          console.error("Error extracting product data:", error);
        }
      }
    } catch (error) {
      console.error("Error scraping Amazon India:", error);
    } finally {
      await page.close();
    }

    return products;
  }

  async searchFlipkart(query: string): Promise<ScrapedProduct[]> {
    const page = await this.createPage();
    const products: ScrapedProduct[] = [];

    try {
      // Navigate to Flipkart search page
      await page.goto(
        `https://www.flipkart.com/search?q=${encodeURIComponent(
          query
        )}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off`,
        { waitUntil: "domcontentloaded" }
      );

      // Wait for search results to load
      await page.waitForSelector(".cPHDOP");
      console.log("Flipkart search results loaded");

      // Extract product data
      const productElements = await page.$$(".cPHDOP");
      console.log("Found", productElements.length, "products");

      for (const element of productElements.slice(0, 10)) {
        try {
          const titleElement = await element.$("a.wjcEIp");
          console.log("Title element:", titleElement);
          const priceElement = await element.$("div.Nx9bqj");
          console.log("Price element:", priceElement);
          const urlElement = await element.$("a._1fQZEK");

          const ratingElement = await element.$("span.Y1HWO0");
          const reviewsElement = await element.$("span.Wphh3N");
          const imageElement = await element.$("img.DByuf4");
          const originalPriceElement = await element.$("div.ZYYwLA.yRaY8j");

          if (titleElement && priceElement) {
            const title = await page.evaluate(
              (el) => el.textContent.trim(),
              titleElement
            );
            console.log("Extracted title:", title);
            const priceText = await page.evaluate(
              (el) => el.textContent.trim(),
              priceElement
            );
            console.log("Extracted price:", priceText);
            const priceMatch = priceText.match(/\₹(\d+(\.\d+)?)/);
            const price = priceMatch
              ? Number.parseFloat(priceMatch[1].replace(/,/g, ""))
              : 0;

            let url = "";
            if (urlElement) {
              url = await page.evaluate(
                (el) => el.getAttribute("href"),
                urlElement
              );
              if (!url.startsWith("http")) {
                url = "https://www.flipkart.com" + url;
              }
            }
            console.log("Extracted URL:", url);
            let originalPrice: number | undefined;
            if (originalPriceElement) {
              const originalPriceText = await page.evaluate(
                (el) => el.textContent.trim(),
                originalPriceElement
              );
              originalPrice = Number.parseFloat(
                originalPriceText.replace(/[^0-9.]/g, "")
              );
            }

            let rating: number | undefined;
            if (ratingElement) {
              const ratingText = await page.evaluate(
                (el) => el.textContent.trim(),
                ratingElement
              );
              const ratingMatch = ratingText.match(/(\d+(\.\d+)?)/);
              if (ratingMatch) {
                rating = Number.parseFloat(ratingMatch[0]);
              }
            }

            let reviews: number | undefined;
            if (reviewsElement) {
              const reviewsText = await page.evaluate(
                (el) => el.textContent.trim(),
                reviewsElement
              );
              const reviewsMatch = reviewsText.match(/(\d+)/g);
              if (reviewsMatch) {
                reviews = Number.parseInt(reviewsMatch.join(""), 10);
              }
            }

            if (imageElement) {
              const image = await page.evaluate(
                (el) => el.getAttribute("src"),
                imageElement
              );
              console.log("Image URL:", image);
            }

            const discount = originalPrice
              ? Math.round(((originalPrice - price) / originalPrice) * 100)
              : undefined;

            products.push({
              title,
              price,
              url,
              image: imageElement
                ? await page.evaluate(
                    (el) => el.getAttribute("src"),
                    imageElement
                  )
                : undefined,
              rating,
              reviews,
              discount,
              originalPrice,
              store: "Flipkart",
              availability: true,
              shipping: 0,
              deliveryEstimate: "2-3 days",
            });
          }
        } catch (error) {
          console.error("Error extracting product data:", error);
        }
      }
    } catch (error) {
      console.error("Error scraping Flipkart:", error);
    } finally {
      await page.close();
    }

    return products;
  }

  async searchMultipleStores(query: string): Promise<ScrapedProduct[]> {
    await this.initialize();

    try {
      const [amazonIndiaProducts, flipkartProducts] = await Promise.all([
        this.searchAmazonIndia(query),
        this.searchFlipkart(query),
      ]);

      return [...amazonIndiaProducts, ...flipkartProducts];
    } finally {
      await this.close();
    }
  }
}

export default Scraper;
