import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [/\/api\/trpc\/.*/],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
