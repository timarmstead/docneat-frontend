import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
}, {
  // Use the hard-coded publishable key that finally cleared the last error
  publishableKey: "pk_live_Y2xlcmsuZG9jbmVhdC5jb20k",
  // Manually tell Clerk exactly which variable to look for
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};