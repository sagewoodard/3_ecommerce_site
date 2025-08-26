import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Force this page to be dynamically rendered (avoids prerendering errors)
export const dynamic = 'force-dynamic';

// Fetch products directly from Stripe
async function fetchProductsFromStripe() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error("Stripe secret key not set");
    return [];
  }

  try {
    const res = await fetch("https://api.stripe.com/v1/products", {
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return [];
    }

    const data = await res.json();
    return data?.data ?? [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProductsFromStripe();

  let planner = null;
  const stickers = [];

  for (const product of products) {
    if (product?.name === "Medieval Dragon Month Planner.jpeg") {
      planner = product;
    } else {
      stickers.push(product);
    }
  }

  return (
    <>
      <ImageBanner />

      <section>
        {/* Pass safe defaults in case planner or stickers are undefined */}
        <Products planner={planner ?? null} stickers={stickers ?? []} />
      </section>
    </>
  );
}