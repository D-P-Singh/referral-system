import { connectDB } from "@/lib/db";

import User from "@/models/User";
import Wallet from "@/models/Wallet";

import { isAdmin } from "@/lib/isAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {

    try {

        await connectDB();

        const admin = await isAdmin();
        if (!admin) {

            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: 403,
                }
            );
        }

        const users =
            await User.find()
                .select("-password")
                .sort({
                    createdAt: -1,
                });

        const usersWithWallet =
            await Promise.all(

                users.map(async (user) => {

                    const wallet =
                        await Wallet.findOne({
                            user: user._id,
                        });

                    return {
                        ...user.toObject(),

                        wallet,
                    };
                })
            );

        return NextResponse.json({
            success: true,
            users: usersWithWallet,
        });

    } catch (error) {
// console.log(error)
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        );
    }
}