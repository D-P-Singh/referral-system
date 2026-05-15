import { NextResponse } from "next/server";
// yaha routes define karo
const PUBLIC_ROUTES = ["/login", "/register"];
const ADMIN_ROUTES = ["/admin"];
const USER_DASHBOARD = "/dashboard";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // cookie se token lo
    const token = request.cookies.get("token")?.value;

    // agar public route hai to allow
    if (PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.next();
    }

    // agar login nahi hai to login pe bhejo
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // token decode (simple example)
    let user= null;

    try {
        user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    } catch (err) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = user?.role;

    // 🔐 ADMIN ROUTE PROTECTION
    if (pathname.startsWith("/admin")) {
        if (role !== "admin") {
            return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
        }
    }

    // 👤 USER trying admin panel
    if (pathname.startsWith("/dashboard") && role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
}

// kaunse routes pe middleware chalega
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};