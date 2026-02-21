'use server'

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function subtractCredit() {
  const { userId } = await auth();
  
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  
  const existingCredits = (user.publicMetadata as any).credits ?? 3;
  const newCount = Math.max(0, existingCredits - 1);

  await client.users.updateUserMetadata(userId, {
    publicMetadata: { credits: newCount },
  });

  return newCount;
}