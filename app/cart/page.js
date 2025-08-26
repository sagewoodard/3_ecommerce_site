'use client'

import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cart, handleIncrementProduct } = useProducts();

  // Total in cents (safer indexing)
  const total = Object.keys(cart).reduce((acc, priceId) => {
    const item = cart[priceId];
    const qty = Number(item?.quantity ?? 0);
    const unit = Number(item?.prices?.[0]?.unit_amount ?? 0);
    return acc + qty * unit;
  }, 0);

  async function createCheckout() {
    try {
      const lineItems = Object.keys(cart).map((priceId) => ({
        price: priceId,
        quantity: Number(cart[priceId]?.quantity ?? 1),
      }));

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineItems }),
      });

      const data = await res.json();
      if (res.ok && data?.url) {
        router.push(data.url);
      } else {
        console.error('Checkout error:', data);
      }
    } catch (err) {
      console.error('Error creating checkout:', err);
    }
  }

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>

      {Object.keys(cart).length === 0 && (<p>Your cart is empty :(</p>)}

      <div className="cart-container">
        {Object.keys(cart).map((priceId, idx) => {
          const item = cart[priceId];
          const itemQuantity = item?.itemQuantity;

          const rawName = item.name
            .replaceAll(' Sticker.png', '')
            .replaceAll(' ', '_')
            .replace(/\.png$|\.jpeg$|\.jpg$/i, '');

          const imgName = item.name === 'Medieval Dragon Month Planner.jpeg'
            ? 'planner'
            : rawName;

          const imgUrl = `/low_res/${imgName}.jpeg`;

          return (
            <div key={idx} className="cart-item">
              <Image src={imgUrl} alt={`${imgName}-img`} width={150} height={150} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>
                  {item.description.slice(0, 100)}
                  {item.description.length > 100 ? '...' : ''}
                </p>
                <h4>${(item?.prices?.[0]?.unit_amount ?? 0) / 100}</h4>
                <div className="quantity-container">
                  <p><strong>Quantity</strong></p>
                  <input
                    type="number"
                    value={itemQuantity}
                    placeholder="2"
                    onChange={(e) => {
                      const newValue = Number(e.target.value || 0);
                      handleIncrementProduct(item.default_price, newValue, item, true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="checkout-container">
        <Link href="/"><button>&larr; Continue shopping</button></Link>
        <button onClick={createCheckout}>Checkout &rarr;</button>
      </div>
    </section>
  );
}