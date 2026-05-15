import {connectDB} from "@/lib/db";

import Referral from "@/models/Referral";
import Transaction from "@/models/Transactions";

import User from "@/models/User";

export async function POST(req) {

    try {

        await connectDB();

        const body =
            await req.json();

        const {
            referralId,
        } = body;

        // referral find

        const referral =
            await Referral.findById(
                referralId
            );

        if (!referral) {

            return Response.json({

                success: false,

                message:
                    "Referral not found",

            });

        }

        // already approved

        if (
            referral.status ===
            "approved"
        ) {

            return Response.json({

                success: false,

                message:
                    "Already approved",

            });

        }

        // approve referral

        referral.status =
            "approved";

        await referral.save();

        // reward add

        await User.findByIdAndUpdate(

            referral.referrer,

            {

                $inc: {

                    walletBalance:
                        referral.rewardAmount,

                    totalReferrals: 1,

                },

            }

        );
        await Transaction.create({

            user: referral.referrer,

            amount: 20,

            type: "credit",

            source: "referral",

            description:
                "Referral reward added",

        });
        return Response.json({

            success: true,

            message:
                "Referral approved",

        });

    } catch (error) {

        return Response.json({

            success: false,

            message:
                error.message,

        });

    }

}