// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const PLAN_CREDITS: Record<string, number> = {
  'price_1T3EewGWw5FE61zBrfAEqUDA': 200,   // Starter
  'price_1T3EfqGWw5FE61zBmse60X9V': 1000,  // Professional
  'price_1T3EgWGWw5FE61zBCy208ve3': 4000,  // Business
};

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) {
      console.error('Missing stripe-signature or STRIPE_WEBHOOK_SECRET');
      return new NextResponse('Webhook configuration error', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const email = session.customer_details?.email;
    const subscriptionId = session.subscription as string;

    // Determine credits from plan
    let allocatedCredits = 200;
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
      if (priceId && PLAN_CREDITS[priceId]) {
        allocatedCredits = PLAN_CREDITS[priceId];
      }
      console.log(`Plan detected: ${priceId} → ${allocatedCredits} credits`);
    } catch (err) {
      console.error('Could not retrieve subscription details:', err);
    }

    try {
      if (userId) {
        // Case 1: Logged-in user upgrading
        console.log(`Upgrading existing Clerk user: ${userId}`);
        const user = await clerk.users.getUser(userId);
        const existingCredits = (user.publicMetadata as any).credits ?? 0;
        await clerk.users.updateUserMetadata(userId, {
          publicMetadata: {
            credits: existingCredits + allocatedCredits,
            stripeSubscriptionId: subscriptionId,
          },
        });
        console.log(`Credits updated for user ${userId}`);

      } else if (email) {
        // Case 2: Guest checkout
        console.log(`Guest checkout for: ${email}`);
        const existingUsers = await clerk.users.getUserList({ emailAddress: [email] });

        if (existingUsers.data.length > 0) {
          // Account exists — top up credits
          const targetUser = existingUsers.data[0];
          const existingCredits = (targetUser.publicMetadata as any).credits ?? 0;
          await clerk.users.updateUserMetadata(targetUser.id, {
            publicMetadata: {
              credits: existingCredits + allocatedCredits,
              stripeSubscriptionId: subscriptionId,
            },
          });
          console.log(`Topped up existing account for ${email}`);

        } else {
          // No account — create user with a password so they can sign in
          // We set a temporary password and send them a sign-in token
          const tempPassword = `DocNeat_${Math.random().toString(36).slice(-10)}!A1`;
          
          const newUser = await clerk.users.createUser({
            emailAddress: [email],
            password: tempPassword,
            publicMetadata: {
              credits: allocatedCredits,
              stripeSubscriptionId: subscriptionId,
              mustResetPassword: true,
            },
          });
          console.log(`Created new Clerk user for ${email}: ${newUser.id}`);

          // Create a sign-in token they can use to access their account
          const signInToken = await clerk.signInTokens.createSignInToken({
            userId: newUser.id,
            expiresInSeconds: 60 * 60 * 24 * 7, // 7 days
          });

          // Log the token URL — in production you would send this via your email provider
          const signInUrl = `${process.env.NEXT_PUBLIC_URL || 'https://www.docneat.com'}?__clerk_ticket=${signInToken.token}`;
          console.log(`Sign-in URL for ${email}: ${signInUrl}`);

          // Send welcome email via Clerk's built-in invitation system
          await clerk.invitations.createInvitation({
            emailAddress: email,
            redirectUrl: `${process.env.NEXT_PUBLIC_URL || 'https://www.docneat.com'}`,
            ignoreExisting: true,
          });
          console.log(`Invitation sent to ${email}`);
        }
      }
    } catch (apiErr) {
      console.error('Clerk sync error during webhook:', apiErr);
      return new NextResponse('Internal server error', { status: 500 });
    }
  }

  return new NextResponse('Webhook processed', { status: 200 });
}