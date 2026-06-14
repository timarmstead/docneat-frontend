import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const userId = session.metadata?.userId;

    // Define plan credit mapping
    const PLAN_CREDITS: { [key: string]: number } = {
      'price_1T3EewGWw5FE61zBrfAEqUDA': 200,    // Starter
      'price_1T3EfqGWw5FE61zBmse60X9V': 1000,   // Pro
      'price_1T3EgWGWw5FE61zBCy208ve3': 4000    // Business
    };

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id || '';
    const creditAmount = PLAN_CREDITS[priceId] || 3;
    const planName = priceId === 'price_1T3EgWGWw5FE61zBCy208ve3' ? 'business' : priceId === 'price_1T3EfqGWw5FE61zBmse60X9V' ? 'pro' : 'starter';

    const client = await clerkClient();

    if (userId) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: { plan: planName, credits: creditAmount },
      });
    } else if (customerEmail) {
      await client.users.createUser({
        emailAddress: [customerEmail],
        publicMetadata: { plan: planName, credits: creditAmount },
        skipPasswordRequirement: true,
      });
    }
  }

  return new NextResponse('Webhook processed', { status: 200 });
}