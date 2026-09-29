import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwtUtils";
import { refreshAccessToken } from "./service/refreshToken";
const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/posts", "/login", "/register"];
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshTokenCookie = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshTokenCookie
    ? jwtUtils.verifyToken(
        refreshTokenCookie,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    // If the access token is invalid but the refresh token is valid, redirect to the refresh token route

    const result = await refreshAccessToken();

    if (result.success && result.data) {
      const newAccessToken = result.data.accessToken;
      const cookieStore = await cookies();
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;

  if (!decodedAccessToken?.success) {
    request.cookies.delete("accessToken");
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  // user is already logged in and trying to access login or register page, redirect to home page
  if (decodedAccessToken && AUTH_ROUTES.includes(pathname)) {
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
  if (!decodedAccessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/author-dashboard") &&
    userRole !== "AUTHOR"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
