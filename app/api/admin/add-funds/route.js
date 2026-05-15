import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Transaction from "@/models/Transactions";

export async function POST(req) {

    try {

        await connectDB();

        const {
            userId,
            amount,
            description,
        } = await req.json();

        if (!userId || !amount) {

            return Response.json({
                success: false,
                message: "UserId & amount required",
            });
        }

        const user =
            await User.findById(userId);

        if (!user) {

            return Response.json({
                success: false,
                message: "User not found",
            });
        }

        // 💰 add balance
        user.walletBalance += amount;

        // 🔓 activate account
        user.accountStatus = "active";

        await user.save();

        // 🧾 transaction entry
        await Transaction.create({
            user: user._id,
            amount,
            type: "credit",
            source: "payment",
            status: "success",
            description:
                description ||
                "Admin added funds + activated account",
        });

        return Response.json({
            success: true,
            message:
                "User activated & balance added",
        });

    } catch (error) {

        return Response.json({
            success: false,
            message: error.message,
        });
    }
}