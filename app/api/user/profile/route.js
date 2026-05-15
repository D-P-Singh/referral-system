import { cookies } from "next/headers";

import jwt from "jsonwebtoken";
import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/db";
import Wallet from "@/models/Wallet";
import User from "@/models/User";

export async function GET() {

    try {

        await connectDB();

const userData = await getUser();
        // user find
        const user = await User.findById(
            userData.id
        ).select("-password");

        // user not found
        if (!user) {

            return Response.json({
                success: false,
                message: "User not found",
            }, {
                status: 404,
            });

        }

        // success
        return Response.json({
            success: true,
            user,
        });

    } catch (error) {

        return Response.json({
            success: false,
            message: error.message,
        }, {
            status: 500,
        });

    }

}