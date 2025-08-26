import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

// Fetch products directly using server-side code
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
    return data.data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// Use Next.js server-side rendering
export async function getServerSideProps() {
  const products = await fetchProductsFromStripe();

  return { props: { products } };
}

export default function Home({ products }) {
  let planner = null;
  let stickers = [];

  for (let product of products) {
    if (product.name === "Medieval Dragon Month Planner.jpeg") {
      planner = product;
      continue;
    }
    stickers.push(product);
  }

  return (
    <>
      <ImageBanner />
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}