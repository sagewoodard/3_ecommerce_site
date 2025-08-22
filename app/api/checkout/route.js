import Stripe from "stripe";
import '../../../envConfig.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
});

export async function POST(request) {
    try {
        const { lineItems } = await request.json();
        console.log("Line items received:", lineItems);

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success',
            cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/'
        });

        return Response.json(session);
    } catch (err) {
        console.error('Error creating cart checkout:', err.message);
        return Response.json({ error: 'Failed to create stripe checkout page' });
    }
}
