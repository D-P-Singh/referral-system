import { connectDB } from "@/lib/db";

import Transaction from "@/models/Transactions";

import { isAdmin } from "@/lib/isAdmin";

export async function GET(req) {

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

        const { searchParams } =
            new URL(req.url);

        const type =
            searchParams.get("type");

        const status =
            searchParams.get("status");

        const source =
            searchParams.get("source");

        let filter = {};

        if (type) {
            filter.type = type;
        }

        if (status) {
            filter.status = status;
        }

        if (source) {
            filter.source = source;
        }

        const transactions =
            await Transaction.find(filter)
                .populate(
                    "user",
                    "name email"
                )
                .sort({
                    createdAt: -1,
                });

        return Response.json({
            success: true,
            transactions,
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