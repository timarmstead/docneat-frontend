import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY as string, {
  apiVersion: '2023-10-16', // Use your current API version
});

export async function POST(req: Request) {
  try {
    // 1. Get the authenticated user's ID from Clerk
    const { userId } = auth(); 
    
    // 2. Parse the request body (e.g., priceId sent from the frontend)
    const body = await req.json();
    const { priceId } = body; 

    if (!priceId) {
      return new NextResponse('Price ID is required', { status: 400 });
    }

    // 3. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true, // <-- Enables the coupon box on checkout
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId || '', // Attach Clerk ID to the transaction payload
      },
    });

    // 4. Return the secure Stripe URL to the frontend
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}