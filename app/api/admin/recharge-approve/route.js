import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transactions";
import User from "@/models/User";
import Referral from "@/models/Referral";
import Wallet from "@/models/Wallet";

export async function POST(req) {
    try {
        await connectDB();

        const { transactionId } = await req.json();

        const txn = await Transaction.findById(transactionId);

        if (!txn) {
            return NextResponse.json(
                { message: "Transaction not found" },
                { status: 404 }
            );
        }

        // prevent double processing
        if (txn.status !== "pending") {
            return NextResponse.json(
                { message: "Already processed" },
                { status: 400 }
            );
        }

        // 🔥 get user FIRST
        const user = await User.findById(txn.user);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // activate user
        user.accountStatus = "active";
        user.paymentStatus = "success";
        await user.save();

        // 🔥 find referral (only ONE)
        const referral = await Referral.findOne({
            referredUser: user._id,
            status: "pending"
        });

        // 🚨 safety check (prevent double reward)
        const alreadyGiven = await Referral.findOne({
            referredUser: user._id,
            status: "approved"
        });

        if (alreadyGiven) {
            txn.status = "success";
            await txn.save();

            return NextResponse.json({
                message: "Already rewarded"
            });
        }

        // 💰 process referral reward
        if (referral) {
            referral.status = "approved";
            referral.paymentStatus = "success";
            await referral.save();

            await Wallet.findOneAndUpdate(
                { user: referral.referrer },
                {
                    $inc: {
                        balance: referral.rewardAmount,
                        totalEarned: referral.rewardAmount
                    },
                    $setOnInsert: {
                        user: referral.referrer
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );
        }

        // 🔐 mark transaction success
        txn.status = "success";
        await txn.save();

        return NextResponse.json({
            message: "Recharge approved & referral reward processed",
        });

    } catch (err) {
        return NextResponse.json(
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}