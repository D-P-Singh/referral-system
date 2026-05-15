import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();

        const { userId, otp } = body;

        const user = await User.findById(userId);

        if (!user) {
            return Response.json({
                success: false,
                msg: "User not found",
            });
        }

        if (user.otp !== otp) {
            return Response.json({
                success: false,
                msg: "Invalid OTP",
            });
        }

        user.isVerified = true;

        await user.save();

        // Referral reward logic

        if (user.referredBy) {
            const referrer = await User.findById(
                user.referredBy
            );

            referrer.successfulReferrals += 1;

            if (
                referrer.successfulReferrals % 2 === 0
            ) {
                referrer.walletBalance += 100;
                referrer.totalEarned += 100;
            }

            await referrer.save();
        }

        return Response.json({
            success: true,
            msg: "Account verified",
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
        });
    }
}