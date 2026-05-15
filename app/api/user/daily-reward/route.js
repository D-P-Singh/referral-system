import connectDB from "@/lib/db";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";
import { getUser } from "@/lib/getUser";

export async function POST() {
    try {
        await connectDB();

        // ✅ auth user
        const currentUser = await getUser();

        if (!currentUser) {
            return Response.json({
                success: false,
                message: "Unauthorized",
            });
        }

        const user = await User.findById(currentUser.id);

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found",
            });
        }

        if (user.accountStatus !== "active") {
            return Response.json({
                success: false,
                message: "Account inactive",
            });
        }

        // ✅ daily check
        const today = new Date().toDateString();
        const last = user.lastClaimedAt
            ? new Date(user.lastClaimedAt).toDateString()
            : null;

        if (last === today) {
            return Response.json({
                success: false,
                message: "Already claimed today",
            });
        }

        const reward = 5;

        // 🔥 WALLET UPDATE (IMPORTANT)
        let wallet = await Wallet.findOne({ user: user._id });

        if (!wallet) {
            wallet = await Wallet.create({
                user: user._id,
                balance: 0,
            });
        }

        wallet.balance += reward;
        wallet.totalEarned += reward;

        await wallet.save();

        // 📌 TRANSACTION (ledger entry)
        await Transaction.create({
            user: user._id,
            amount: reward,
            type: "credit",
            source: "daily_reward",
            status: "success",
            note: "Daily login reward",
        });

        // 📌 update user only for tracking
        user.lastClaimedAt = new Date();
        await user.save();

        return Response.json({
            success: true,
            reward,
            balance: wallet.balance,
            message: "₹5 daily reward added",
        });

    } catch (error) {
        return Response.json({
            success: false,
            message: error.message,
        });
    }
}