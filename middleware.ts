import { clerkMiddleware } from "@clerk/nextjs/server";

const secretKey = process.env.CLERK_SECRET_KEY;
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default clerkMiddleware((auth, req) => {
  // Empty for now to just get the site to load
}, {
  secretKey,
  publishableKey,
  debug: true // This will help us see EXACTLY what is failing in the logs
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};