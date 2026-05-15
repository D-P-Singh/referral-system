import {connectDB} from "@/lib/db";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";
import { getUser } from "@/lib/getUser";

export async function GET() {
    try {
        await connectDB();

        // 🔐 auth user
        const currentUser = await getUser();

        if (!currentUser) {
            return Response.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        // 👤 user fetch
        const user = await User.findById(currentUser.id);

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        // 💰 wallet fetch
        let wallet = await Wallet.findOne({ user: user._id });

        if (!wallet) {
            wallet = await Wallet.create({
                user: user._id,
                balance: 0,
                totalEarned: 0,
                totalWithdrawn: 0,
                pendingWithdraw: 0,
            });
        }

        // 📌 transactions fetch
        const transactions = await Transaction.find({
            user: user._id,
        }).sort({ createdAt: -1 });

        // =========================
        // 📊 RESPONSE
        // =========================
        return Response.json({
            success: true,

            wallet: {
                balance: wallet.balance,
                earnings: wallet.totalEarned,
                withdrawn: wallet.totalWithdrawn,
                pendingWithdraw: wallet.pendingWithdraw,
            },

            stats: {
                referrals: user.referralCount || 0,
                completedTasks: user.completedTasks?.length || 0,
            },

            transactions,
        });

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}