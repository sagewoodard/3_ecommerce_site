import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Force dynamic rendering to avoid Next.js prerendering errors
export const dynamic = 'force-dynamic';

/**
 * Fetch products from Stripe.
 * Returns an array of product objects or an empty array if fetch fails.
 */
async function fetchProductsFromStripe() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("Stripe secret key is not set in environment variables.");
    return [];
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/products", {
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch products from Stripe:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data?.data ?? [];
  } catch (error) {
    console.error("Error fetching products from Stripe:", error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProductsFromStripe();

  let planner = null;
  const stickers = [];

  // Separate planner from other products
  products.forEach(product => {
    if (product?.name?.includes("Medieval Dragon Month Planner")) {
      planner = product;
    } else if (product) {
      stickers.push(product);
    }
  });

  return (
    <>
      <ImageBanner />
      <section>
        {/* Provide safe defaults if planner or stickers are missing */}
        <Products planner={planner ?? null} stickers={stickers ?? []} />
      </section>
    </>
  );
}