import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transactions";
import User from "@/models/User";
import Referral from "@/models/Referral";
import Wallet from "@/models/Wallet";
import SystemSettings from "@/models/SystemSettings";
import { isAdmin } from "@/lib/isAdmin";
export async function POST(req) {
    try {
        await connectDB();
 const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }
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
        if (txn.type !== "recharge") {

   return NextResponse.json(
      {
         message:
            "Invalid transaction type"
      },
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

user.activatedAt = new Date();

const expiry = new Date();

expiry.setDate(
   expiry.getDate() + 90
);

user.activationExpiresAt = expiry;

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
        if (referral && referral.referrer.toString() ===user._id.toString()) {

   return NextResponse.json(
      {
         message:
            "Self referral not allowed"
      },
      { status: 400 }
   );
}
const settings = await SystemSettings.findOne();
        // 💰 process referral reward          
if (referral) {

   if (settings?.referralReward > 0) {

      await Wallet.findOneAndUpdate(
         { user: referral.referrer },
         {
            $inc: {
               balance:
                  settings.referralReward,

               totalEarned:
                  settings.referralReward
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

      await Transaction.create({

         user: referral.referrer,

         type: "credit",

         source: "referral_bonus",

         amount:
            settings.referralReward,

         status: "success",

         note:
            `Referral reward from ${user.name}`

      });
   }

   referral.status = "approved";

   referral.paymentStatus = "success";

   await referral.save();
}
 

        // 🔐 mark transaction success
        txn.note =`Recharge approved for ${user.name}`
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