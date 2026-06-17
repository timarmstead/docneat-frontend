// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { priceId } = body;

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_URL || 'https://www.docneat.com'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'https://www.docneat.com'}/pricing`,
      metadata: {
        userId: userId || '',
      },
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