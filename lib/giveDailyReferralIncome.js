import { connectDB } from "@/lib/db";

import Referral from "@/models/Referral";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";

export async function giveDailyReferralIncome(userId) {

    // today's date range
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();

    endOfDay.setHours(23, 59, 59, 999);

    // already given check
    const alreadyGiven =
        await Transaction.findOne({

            user: userId,

            source: "daily_referral_reward",

            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

    if (alreadyGiven) {
        return;
    }

    // total direct referrals
    const totalReferrals =
        await Referral.countDocuments({

            referrer: userId,

            status: "approved",
        });

    if (totalReferrals <= 0) {
        return;
    }
// baad m per referal daily change kr skte hai
    // ₹1 per referral
    const rewardAmount = totalReferrals;

    // wallet update
    await Wallet.findOneAndUpdate(

        { user: userId },

        {
            $inc: {
                balance: rewardAmount,
                totalEarned: rewardAmount,
            },
        }
    );

    // transaction entry
    await Transaction.create({

        user: userId,

        type: "credit",

        amount: rewardAmount,

        source: "daily_referral_reward",

        description:
            `${totalReferrals} direct referrals daily income`,

        status: "success",
    });
}