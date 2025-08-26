import Stripe from 'stripe';

export async function POST(req) {
  try {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) {
      return Response.json({ error: 'Missing STRIPE_SECRET_KEY' }, { status: 500 });
    }

    const stripe = new Stripe(secret, { apiVersion: '2023-10-16' });
    const { lineItems } = await req.json();

    // Build URLs from the incoming request's origin (works locally + Netlify)
    const origin = req.headers.get('origin') ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cart`,
    });

    // Return only what's needed by the client
    return Response.json({ url: session.url });
  } catch (err) {
    console.error('Error creating cart checkout:', err);
    return Response.json({ error: 'Failed to create stripe checkout page' }, { status: 500 });
  }
}