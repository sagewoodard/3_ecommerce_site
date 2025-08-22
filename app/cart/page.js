'use client'

import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter()
  const { cart, handleIncrementProduct } = useProducts()

  // Calculate the total cost of items in cart
  const total = Object.keys(cart).reduce((acc, curr) => {
    // Use the reduce function to iteratively accumulate the total value

    // Step 1: Use the price_id to find the data for the product in the cart
    const cartItem = cart[curr]

    // Step 2: Find the quantity of the product in the cart
    const quantity = cartItem.quantity

    // Step 3: Find the cose in cents of the product
    const cost = cartItem.prices[0].unit_amount

    // Step 4: Take the current total and add (quantity * cost)
    const sum = acc + quantity * cost

    // Step 5: Return the sum, which becomes the accumulated value for the next iteration
    return sum
  }, 0)

  async function createCheckout() {
    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL
      const lineItems = Object.keys(cart).map((item, itemIndex) => {
        return {
          price: item,
          quantity: cart[item].quantity
        }
      } )
      
      const response = await fetch(baseURL + '/api/checkout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ lineItems })
      })

      const data = await response.json()
      if (response.ok) {
        console.log(data)
        router.push(data.url)
      }

    } catch (err) {
      console.log('Error creating checkout: ', err.message)
    }
  }

  return (
    <section className="cart-section">
      <h2>Your Cart</h2>
      {Object.keys(cart).length === 0 && (<p>Your cart is empty :(</p>)}
      <div className="cart-container">
        {Object.keys(cart).map((item, itemIndex) => {
          const itemData = cart[item]
          const itemQuantity = itemData?.itemQuantity

          const rawName = itemData.name
            .replaceAll(' Sticker.png', '')
            .replaceAll(' ', '_')
            .replace(/\.png$|\.jpeg$|\.jpg$/i, ''); // removes .png/.jpeg/.jpg if present

          const imgName = itemData.name === 'Medieval Dragon Month Planner.jpeg'
            ? 'planner'
            : rawName;

          const imgUrl = `low_res/${imgName}.jpeg`;


          return (
            <div key={itemIndex} className="cart-item">
              <img src={imgUrl} alt={imgName + '-img'} />
              <div className="cart-item-info">
                <h3>{itemData.name}</h3>
                <p>{itemData.description.slice(0, 100)}{itemData.description.length > 100 ? '...' : ''}</p>
                <h4>${itemData.prices[0].unit_amount / 100}</h4>
                <div className="quantity-container">
                  <p><strong>Quantity</strong></p>
                  <input type="number" value={itemQuantity} placeholder="2" onChange={(e) => {
                    const newValue = e.target.value

                    handleIncrementProduct(itemData.default_price, newValue, itemData, true)
                  }}/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
            <div className="checkout-container">
                <Link href={'/'}>
                    <button>&larr; Continue shopping</button>
                </Link>
                <button onClick={createCheckout}>Checkout &rarr;</button>
            </div>
    </section>
  );
}