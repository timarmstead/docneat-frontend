'use server'

import { auth, createClerkClient } from '@clerk/nextjs/server';

export async function subtractCredit(pagesToDeduct: number = 1) {
  const { userId } = await auth();

  if (!userId) {
    console.error('subtractCredit: No userId found');
    throw new Error('Unauthorized');
  }

  const client = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
  });

  try {
    const user = await client.users.getUser(userId);
    const existingCredits = (user.publicMetadata as any).credits ?? 0;
    const newCount = Math.max(0, existingCredits - pagesToDeduct);

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        credits: newCount,
      },
    });

    console.log(`Credits deducted: ${pagesToDeduct}. Remaining: ${newCount}`);
    return newCount;
  } catch (error) {
    console.error('Clerk metadata update failed:', error);
    throw error;
  }
}