import { connectDB } from "@/lib/db";

import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";
import Withdrawal from "@/models/Withdrawal";

import { isAdmin } from "@/lib/isAdmin";

export async function GET() {

    try {

        await connectDB();

        const admin = await isAdmin();

        if (!admin) {

            return Response.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 403,
                }
            );
        }

        const totalUsers =
            await User.countDocuments();

        const activeUsers =
            await User.countDocuments({
                status: "active",
            });

        const totalWallets =
            await Wallet.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$balance",
                        },
                    },
                },
            ]);

        const totalTransactions =
            await Transaction.countDocuments();

        const pendingWithdrawals =
            await Withdrawal.countDocuments({
                status: "pending",
            });

        const pendingRecharges =
            await Recharge.countDocuments({
                status: "pending",
            });

        return Response.json({

            success: true,

            data: {
                totalUsers,
                activeUsers,
                totalBalance:
                    totalWallets[0]?.total || 0,
                totalTransactions,
                pendingWithdrawals,
                pendingRecharges,
            },
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