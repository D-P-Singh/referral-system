import { connectDB } from "@/lib/db";
import Referral from "@/models/Referral";
import User from "@/models/User";
import Transaction from "@/models/Transactions";
import { getUser } from "@/lib/getUser";

export async function GET() {
    try {
        await connectDB();

        // 👤 get current user
        const currentUser = await getUser();

        if (!currentUser) {
            return Response.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = currentUser._id || currentUser.id;

        // 👤 fetch user
        const user = await User.findById(userId).select(
            "name email referralCode createdAt"
        );

        if (!user) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // 🔗 referrals list (latest first)
        const referrals = await Referral.find({
            referrer: userId,
        })
            .populate("referredUser", "name email createdAt")
            .sort({ createdAt: -1 })
            .lean();

        // =========================
        // 📊 REFERRAL STATS (FAST AGGREGATION)
        // =========================

        const statsAgg = await Referral.aggregate([
            {
                $match: {
                    referrer: user._id,
                },
            },
            {
                $group: {
                    _id: null,

                    total: { $sum: 1 },

                    approved: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "approved"] },
                                1,
                                0,
                            ],
                        },
                    },

                    pending: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "pending"] },
                                1,
                                0,
                            ],
                        },
                    },

                    rejected: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "rejected"] },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]);

        const stats = statsAgg[0] || {
            total: 0,
            successful: 0,
            pending: 0,
        };

        // 💰 TOTAL REWARDS FROM TRANSACTIONS
        const rewardAgg = await Transaction.aggregate([
            {
                $match: {
                    user: user._id,
                    source: "referral",
                    paymentStatus: "success", // agar tumhare model me "status" hai to change karna
                },
            },
            {
                $group: {
                    _id: null,
                    totalRewards: { $sum: "$rewardAmount" },
                },
            },
        ]);

        const totalRewards = rewardAgg[0]?.totalRewards || 0;

        // =========================
        // 📦 RESPONSE
        // =========================

        return Response.json({
            success: true,

            referralCode: user.referralCode,
            referralLink: `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${user.referralCode}`,

            stats: {
                total: stats.total,
                approved: stats.approved,
                pending: stats.pending,
                rejected: stats.rejected,
                totalRewards,
            },

            referrals,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error?.message || "Internal Server Error",
            },
            { status: 500 }
        );
    }
}