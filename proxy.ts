import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/posts", "/login", "/register"];

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;

  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload)
    : null;

  let userRole = null;

  if (decodedToken) {
    userRole = decodedToken.role;
  }

  // user is already logged in and trying to access login or register page, redirect to home page
  if (decodedToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // user is not logged in and trying to access a protected route, redirect to login page
  if (!decodedToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
