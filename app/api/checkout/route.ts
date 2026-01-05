// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Synchronous initialization – no await here
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    // All awaits stay inside this async function
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://docneat.com'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://docneat.com'}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// Optional: Force dynamic rendering if needed (but not required here)
export const dynamic = 'force-dynamic';
