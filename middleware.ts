import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  // logic
}, {
  // PASTE YOUR ACTUAL SECRET KEY HERE FOR ONE TEST DEPLOY
  secretKey: "sk_live_sWwNrq8yJDudwp8TfgdqsJPPc246TExnGVOfq9Qb7w", 
  publishableKey: "pk_live_Y2xlcmsuZG9jbmVhdC5jb20k"
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};