import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

// Load the webhook secret (whsec_...) from environment variables
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request) {
  // 1. Retrieve the raw body and signature header required by Stripe
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  // 2. Cryptographically verify the event came from Stripe, not a bad actor
  try {
    if (!sig || !webhookSecret) {
      console.error('Missing Stripe signature or webhook secret');
      return new NextResponse('Missing signature or secret', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Verification Error: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 3. Process the successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Extract the exact metadata we passed in during the checkout route
    const customerEmail = session.customer_details?.email;
    const userId = session.metadata?.userId;

    console.log(`Processing checkout for User ID: ${userId} | Email: ${customerEmail}`);

    try {
      // Initialize the Clerk backend client
      const client = await clerkClient();
      
      if (userId) {
        // Case A: Existing logged-in user upgrading
        // Update their profile to reflect their new tier and credits
        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            plan: 'premium',
            credits: 100, 
          },
        });
        console.log(`Successfully upgraded Clerk user: ${userId}`);
        
      } else if (customerEmail) {
        // Case B: Guest checkout (Auto-provisioning)
        // Add logic here to create an account or send an invite via Clerk BAPI
        console.log(`Guest checkout recorded for email: ${customerEmail}`);
      }
    } catch (error) {
      console.error('Clerk Database Error: Failed to update user metadata', error);
      // Return a 500 error so Stripe knows to retry the webhook later
      return new NextResponse('Error updating User Metadata', { status: 500 });
    }
  }

  // 4. Return a 200 OK to Stripe so they mark the event as successfully delivered
  return new NextResponse('Webhook processed successfully', { status: 200 });
}