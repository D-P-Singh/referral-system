import { getUser } from "@/lib/getUser";
import { connectDB } from "@/lib/db";

import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Referral from "@/models/Referral";
import { giveDailyReferralIncome } from "@/lib/giveDailyReferralIncome";

export async function GET() {

    try {

        await connectDB();

        // current user
        const userData = await getUser();

        // find user
        const user = await User.findById(
            userData.id
        ).select("-password");

        // user not found
        if (!user) {

            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
        // 👇 daily reward logic
        await giveDailyReferralIncome(user._id)
        // wallet
        const wallet =
            await Wallet.findOne({
                user: user._id,
            });

        // direct referrals
        const totalReferrals =
            await Referral.countDocuments({
                referrer: user._id,
            });

        // =========================================
        // LEVEL SYSTEM
        // =========================================

        async function getLevelUsers(userIds) {

            const users = await User.find({
                referredBy: {
                    $in: userIds,
                },
            }).select("_id name email");

            return users;
        }

        // LEVEL 1
        const level1Users =
            await getLevelUsers([user._id]);

        // LEVEL 2
        const level2Users =
            await getLevelUsers(
                level1Users.map(
                    (u) => u._id
                )
            );

        // LEVEL 3
        const level3Users =
            await getLevelUsers(
                level2Users.map(
                    (u) => u._id
                )
            );

        // LEVEL 4
        const level4Users =
            await getLevelUsers(
                level3Users.map(
                    (u) => u._id
                )
            );

        // levels data
        const referralLevels = [

            {
                level: 1,
                totalUsers:
                    level1Users.length,
                users: level1Users,
            },

            {
                level: 2,
                totalUsers:
                    level2Users.length,
                users: level2Users,
            },

            {
                level: 3,
                totalUsers:
                    level3Users.length,
                users: level3Users,
            },

            {
                level: 4,
                totalUsers:
                    level4Users.length,
                users: level4Users,
            },

        ];

        // total network users
        const totalNetworkUsers =

            level1Users.length +
            level2Users.length +
            level3Users.length +
            level4Users.length;

        // success response
        return Response.json(

            {
                success: true,

                user,

                wallet,

                // direct referral
                totalReferrals,

                // total users under you
                totalNetworkUsers,

                // level wise users
                referralLevels,

            },

            {
                status: 200,
            }
        );

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