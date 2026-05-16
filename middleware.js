import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// public routes
const PUBLIC_ROUTES = ["/login", "/register"];

// redirects
const USER_DASHBOARD = "/dashboard";
const ADMIN_DASHBOARD = "/admin";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // token from cookie
    const token = request.cookies.get("token")?.value;

    // =========================
    // TOKEN CHECK
    // =========================

    let user = null;

    if (token) {
        try {

            const secret = new TextEncoder().encode(
                process.env.JWT_SECRET
            );

            const { payload } = await jwtVerify(
                token,
                secret
            );

            user = payload;
            console.log(user)
           

        } catch (error) {
             console.log(error)
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }

    const role = user?.role;

    // =========================
    // AGAR USER LOGIN HAI
    // LOGIN / REGISTER PAGE NA DIKHAO
    // =========================

    if (PUBLIC_ROUTES.includes(pathname) && token) {
       
        // admin
        if (role === "admin") {
            return NextResponse.redirect(
                new URL(ADMIN_DASHBOARD, request.url)
            );
        }

        // normal user
        return NextResponse.redirect(
            new URL(USER_DASHBOARD, request.url)
        );
    }

    // =========================
    // AGAR LOGIN NAHI HAI
    // =========================

    if (
        !token &&
        (pathname.startsWith("/dashboard") ||
            pathname.startsWith("/admin"))
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // =========================
    // ADMIN PROTECTION
    // =========================

    if (pathname.startsWith("/admin")) {
        if (role !== "admin") {
            return NextResponse.redirect(
                new URL(USER_DASHBOARD, request.url)
            );
        }
    }

    // =========================
    // ADMIN KO USER DASHBOARD NA DIKHE
    // =========================

    if (
        pathname.startsWith("/dashboard") &&
        role === "admin"
    ) {
        return NextResponse.redirect(
            new URL(ADMIN_DASHBOARD, request.url)
        );
    }

    return NextResponse.next();
}

// middleware routes
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/login",
        "/register",
    ],
};


// import { NextResponse } from "next/server";
// // yaha routes define karo
// const PUBLIC_ROUTES = ["/login", "/register"];
// const ADMIN_ROUTES = ["/admin"];
// const USER_DASHBOARD = "/dashboard";

// export function middleware(request) {
//     const { pathname } = request.nextUrl;

//     // cookie se token lo
//     const token = request.cookies.get("token")?.value;

//     // agar public route hai to allow
//     if (PUBLIC_ROUTES.includes(pathname)) {
//         return NextResponse.next();
//     }

//     // agar login nahi hai to login pe bhejo
//     if (!token) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // token decode (simple example)
//     let user= null;

//     try {
//         user = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
//     } catch (err) {
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const role = user?.role;
   

//     // 🔐 ADMIN ROUTE PROTECTION
//     if (pathname.startsWith("/admin")) {
//         if (role !== "admin") {
//             return NextResponse.redirect(new URL(USER_DASHBOARD, request.url));
//         }
//     }

//     // 👤 USER trying admin panel
//     if (pathname.startsWith("/dashboard") && role === "admin") {
//         return NextResponse.redirect(new URL("/admin", request.url));
//     }

//     return NextResponse.next();
// }

// // kaunse routes pe middleware chalega
// export const config = {
//     matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
// };