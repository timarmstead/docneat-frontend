import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
}, {
  // We force it to use the new name we just created
  secretKey: process.env.LIVE_CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};