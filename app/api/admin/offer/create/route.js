import { connectDB } from "@/lib/db";
import Offer from "@/models/Offer";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const {
            title,
            description,
            type,
            reward,
            conditions,
            startDate,
            endDate,
            isActive,
        } = body;

        // 🧠 Basic validation
        if (!title || !type || !reward?.type || !reward?.value) {
            return Response.json(
                {
                    success: false,
                    message: "Required fields missing",
                },
                { status: 400 }
            );
        }

        // 🧾 CREATE OFFER
        const offer = await Offer.create({
            title,
            description,
            type,

            reward: {
                type: reward.type,
                value: reward.value,
            },

            conditions: {
                referralCount: conditions?.referralCount || null,
                minLevel: conditions?.minLevel || null,
                maxLevel: conditions?.maxLevel || null,
                minAmount: conditions?.minAmount || null,
                maxAmount: conditions?.maxAmount || null,
                timeLimitDays: conditions?.timeLimitDays || null,
                isFirstOnly: conditions?.isFirstOnly || false,
            },

            startDate: startDate || null,
            endDate: endDate || null,

            isActive: isActive ?? true,
        });

        return Response.json({
            success: true,
            message: "Offer created successfully 🚀",
            offer,
        });
    } catch (err) {
        return Response.json(
            {
                success: false,
                message: err.message,
            },
            { status: 500 }
        );
    }
}