// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClerkClient } from '@clerk/nextjs/server';
import { sendWelcomeEmail } from '@/lib/resend';

const stripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const PLAN_CREDITS: Record<string, number> = {
  'price_1Tnd0LGWw5FE61zB1vFKR0TK': 400,   // Starter $30
  'price_1Tnd18GWw5FE61zBX1BGIvpm': 1000,  // Professional $60
  'price_1T3EgWGWw5FE61zBCy208ve3': 4000,  // Business $99
};

const PLAN_NAMES: Record<string, string> = {
  'price_1Tnd0LGWw5FE61zB1vFKR0TK': 'Starter',
  'price_1Tnd18GWw5FE61zBX1BGIvpm': 'Professional',
  'price_1T3EgWGWw5FE61zBCy208ve3': 'Business',
};

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `Dn-${password}!`;
}

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

    let allocatedCredits = 400;
    let planName = 'Starter';

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;
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
        console.log(`Guest checkout for: ${email}`);
        const existingUsers = await clerk.users.getUserList({ emailAddress: [email] });

        if (existingUsers.data.length > 0) {
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
          const tempPassword = generateTempPassword();

          await clerk.users.createUser({
            emailAddress: [email],
            password: tempPassword,
            publicMetadata: {
              credits: allocatedCredits,
              stripeSubscriptionId: subscriptionId,
              planName,
            },
          });
          console.log(`Created Clerk account for ${email}`);

          await sendWelcomeEmail({
            email,
            tempPassword,
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