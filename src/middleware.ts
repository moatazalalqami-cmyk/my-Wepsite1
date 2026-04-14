import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next-auth/next";
export default withAuth(
  function middleware(req) {
    if (req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/admin/:path*"],
};
