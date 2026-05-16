import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function getUser() {

    const cookieStore =
        await cookies();

    const token =
        cookieStore.get("token")?.value;

    if (!token) {
        return null;
    }

    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );
        // if (decoded.isBlocked) {
        //     return NextResponse.json(
        //         { message: "Account blocked" },
        //         { status: 403 }
        //     );
        // }


        return decoded;

    } catch {

        return null;

    }

}