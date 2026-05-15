import {connectDB} from "@/lib/db";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";

export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { userId } = body;

        // ✅ find user
        const user = await User.findById(userId);

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found",
            });
        }

        // ❌ already activated check
        if (user.paymentStatus === "success") {
            return Response.json({
                success: false,
                message: "Already rewarded",
            });
        }

        // ✅ activate user
        user.paymentStatus = "success";
        user.accountStatus = "active";
        await user.save();

        // =========================
        // 💰 WALLET SETUP FOR USER
        // =========================
        let wallet = await Wallet.findOne({ user: user._id });

        if (!wallet) {
            wallet = await Wallet.create({
                user: user._id,
                balance: 0,
                totalEarned: 0,
            });
        }

        // =========================
        // 🎁 REFERRAL REWARD
        // =========================
        if (user.referredBy) {
            const rewardAmount = 20;

            // update referrer wallet
            let refWallet = await Wallet.findOneAndUpdate(
                { user: user.referredBy },
                {
                    $inc: {
                        balance: rewardAmount,
                        totalEarned: rewardAmount,
                    },
                },
                { new: true, upsert: true }
            );

            // 📌 referral transaction
            await Transaction.create({
                user: user.referredBy,
                amount: rewardAmount,
                type: "credit",
                source: "referral",
                status: "success",
                note: `Referral bonus from user ${user._id}`,
            });
        }

        // 📌 transaction for activation (optional but recommended)
        await Transaction.create({
            user: user._id,
            amount: 0,
            type: "credit",
            source: "payment",
            status: "success",
            note: "Account activated",
        });

        return Response.json({
            success: true,
            message: "Payment successful & account activated",
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message,
        });
    }
}