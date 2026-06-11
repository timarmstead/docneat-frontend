// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClerkClient } from '@clerk/nextjs/server';

// All secrets are now safely swapped for server environment references
const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error("Missing signature parameter or webhook secret environment setup");
      return new NextResponse('Webhook configuration error', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.metadata?.userId;
    const email = session.customer_details?.email;
    const allocatedCredits = 100; 

    // Pulls your live Clerk access safely from the server environment
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    try {
      if (userId) {
        console.log(`Processing paid user upgrade for Clerk User ID: ${userId}`);
        const user = await clerk.users.getUser(userId);
        const existingCredits = (user.publicMetadata as any).credits ?? 0;

        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            credits: existingCredits + allocatedCredits,
            stripeSubscriptionId: session.subscription as string,
          },
        });
        console.log(`Successfully upgraded credits for User ID: ${userId}`);

      } else if (email) {
        console.log(`Processing auto-provisioning for Guest Customer: ${email}`);
        const existingUsers = await clerk.users.getUserList({ emailAddress: [email] });
        
        if (existingUsers.data.length > 0) {
          const targetUser = existingUsers.data[0];
          const existingCredits = (targetUser.publicMetadata as any).credits ?? 0;
          
          await clerk.users.updateUserMetadata(targetUser.id, {
            publicMetadata: {
              credits: existingCredits + allocatedCredits,
              stripeSubscriptionId: session.subscription as string,
            },
          });
          console.log(`Linked subscription to existing account found for email: ${email}`);
        } else {
          const temporaryPassword = `DocNeatPass_${Math.random().toString(36).slice(-8)}!`;
          
          await clerk.users.createUser({
            emailAddress: [email],
            password: temporaryPassword,
            skipPasswordRequirement: false,
            publicMetadata: {
              credits: allocatedCredits,
              stripeSubscriptionId: session.subscription as string,
            },
          });
          console.log(`Clerk account auto-created for new customer: ${email}.`);
        }
      }
    } catch (apiErr) {
      console.error("Failed executing synchronization logic during webhook transaction:", apiErr);
      return new NextResponse('Internal Execution Error', { status: 500 });
    }
  }

  return new NextResponse('Webhook processed completely', { status: 200 });
}