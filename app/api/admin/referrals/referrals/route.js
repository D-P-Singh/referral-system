import { connectDB } from "@/lib/db";

import Referral from "@/models/Referral";

import { isAdmin } from "@/lib/isAdmin";

export async function GET() {

    try {

        await connectDB();

        const admin = await isAdmin();

        if (!admin) {

            return Response.json(
                {
                    success: false,
                },
                {
                    status: 403,
                }
            );
        }

        const referrals =
            await Referral.find()
                .populate(
                    "referrer",
                    "name email"
                )
                .populate(
                    "referredUser",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                });

        return Response.json({
            success: true,
            referrals,
        });

    } catch (error) {

        return Response.json(
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