import Stripe from "stripe"
import '../../../envConfig.js'

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY, {
    apiVersion: '2023-10-16'
})

export async function GET() {
    try {
        // Fetching all of the active products from stripe
        const products = await stripe.products.list({ active: true })

        // Fetching all of the active prices from stripe
        const prices = await stripe.prices.list({ active: true })

        // Combine the products and their associated prices
        const combinedData = products.data.map((product) => {
            const productPrices = prices.data.filter((price) => {
                return price.product === product.id
            })

            return {
                ...product,
                prices: productPrices.map((price) => {
                    return {
                        id: price.id,
                        unit_amount: price.unit_amount,
                        currency: price.currency,
                        recurring: price.recurring
                    }
                })
            }
        })

        // Send the combined data as a json
        return Response.json(combinedData)


    } catch (err) {
        console.error('Error fetching data from stripe: ', err.message)
        return Response.json({ error: 'Failed to fetch data from stripe' })
    }
}