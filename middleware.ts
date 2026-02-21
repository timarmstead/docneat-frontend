import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
}, {
  // Hard-code the keys here as well to match your Layout exactly
  publishableKey: "pk_live_Y2xlcmsuZG9jbmVhdC5jb20k",
  secretKey: process.env.CLERK_SECRET_KEY, 
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};