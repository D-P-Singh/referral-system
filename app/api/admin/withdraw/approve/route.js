import { connectDB } from "@/lib/db";

import Withdrawal from "@/models/Withdrawal";

import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {

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

        const { withdrawId } =
            await req.json();

        const withdrawal =
            await Withdrawal.findById(
                withdrawId
            );

        if (!withdrawal) {

            return Response.json(
                {
                    success: false,
                },
                {
                    status: 404,
                }
            );
        }

        withdrawal.status = "approved";

        await withdrawal.save();

        return Response.json({
            success: true,
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