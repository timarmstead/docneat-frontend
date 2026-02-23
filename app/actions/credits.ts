'use server'

import { auth, createClerkClient } from '@clerk/nextjs/server';

const CLERK_SECRET_KEY = "sk_live_sWwNrq8yJDudwp8TfgdqsJPPc246TExnGVOfq9Qb7w"; 

export async function subtractCredit() {
  const { userId } = await auth();
  
  if (!userId) throw new Error("Unauthorized");

  const client = createClerkClient({
    secretKey: CLERK_SECRET_KEY,
  });

  try {
    const user = await client.users.getUser(userId);
    const existingCredits = (user.publicMetadata as any).credits ?? 3;
    const newCount = Math.max(0, existingCredits - 1);

    await client.users.updateUserMetadata(userId, {
      publicMetadata: { credits: newCount },
    });

    return newCount;
  } catch (error) {
    console.error("Clerk Metadata Update Failed:", error);
    throw error;
  }
}