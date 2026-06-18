// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClerkClient } from '@clerk/nextjs/server';
import { sendWelcomeEmail } from '@/lib/resend';

const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const PLAN_CREDITS: Record<string, number> = {
  'price_1T3EewGWw5FE61zBrfAEqUDA': 200,   // Starter
  'price_1T3EfqGWw5FE61zBmse60X9V': 1000,  // Professional
  'price_1T3EgWGWw5FE61zBCy208ve3': 4000,  // Business
};

const PLAN_NAMES: Record<string, string> = {
  'price_1T3EewGWw5FE61zBrfAEqUDA': 'Starter',
  'price_1T3EfqGWw5FE61zBmse60X9V': 'Professional',
  'price_1T3EgWGWw5FE61zBCy208ve3': 'Business',
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

    // Determine credits and plan name from price ID
    let allocatedCredits = 200;
    let planName = 'Starter';
    let priceId = '';

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      priceId = subscription.items.data[0]?.price.id;
      if (priceId && PLAN_CREDITS[priceId]) {
        allocatedCredits = PLAN_CREDITS[priceId];
        planName = PLAN_NAMES[priceId];
      }
      console.log(`Plan detected: ${planName} → ${allocatedCredits} credits`);
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
            planName,
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
              planName,
            },
          });
          console.log(`Topped up existing account for ${email}`);

        } else {
          // No account — create user and send welcome email
          const tempPassword = `DocNeat_${Math.random().toString(36).slice(-10)}!A1`;

          const newUser = await clerk.users.createUser({
            emailAddress: [email],
            password: tempPassword,
            publicMetadata: {
              credits: allocatedCredits,
              stripeSubscriptionId: subscriptionId,
              planName,
              mustResetPassword: true,
            },
          });
          console.log(`Created new Clerk user for ${email}: ${newUser.id}`);

          // Create a 7-day sign-in token
          const signInToken = await clerk.signInTokens.createSignInToken({
            userId: newUser.id,
            expiresInSeconds: 60 * 60 * 24 * 7,
          });

          const signInUrl = `${process.env.NEXT_PUBLIC_URL || 'https://www.docneat.com'}?__clerk_ticket=${signInToken.token}`;

          // Send branded welcome email via Resend
          await sendWelcomeEmail({
            email,
            signInUrl,
            credits: allocatedCredits,
            planName,
          });

          console.log(`Welcome email sent to ${email}`);
        }
      }
    } catch (apiErr) {
      console.error('Clerk sync error during webhook:', apiErr);
      return new NextResponse('Internal server error', { status: 500 });
    }
  }

  return new NextResponse('Webhook processed', { status: 200 });
}