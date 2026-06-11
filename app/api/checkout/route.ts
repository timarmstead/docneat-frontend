// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Pass only the environment variable—no empty trailing object fields!
const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { priceId, userId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const metadata: Record<string, string> = {};
    if (userId) {
      metadata.userId = userId;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://docneat.com'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://docneat.com'}/pricing`,
      metadata: metadata,
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

export const dynamic = 'force-dynamic';