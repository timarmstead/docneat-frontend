import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // This will force the key to be logged to Vercel's console
  console.log("DIAGNOSTIC - Secret Key exists:", !!process.env.CLERK_SECRET_KEY);
  console.log("DIAGNOSTIC - Publishable Key exists:", !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
}, {
  // We hard-check the variables here
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};