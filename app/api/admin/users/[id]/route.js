import { connectDB } from "@/lib/db";

import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";
import Referral from "@/models/Referral";

import { isAdmin } from "@/lib/isAdmin";

export async function GET(req, {params}) {
    const  {id}  = await  params;
   // console.log(id)
    try {

        await connectDB();

        const admin = await isAdmin();

        if (!admin) {

            return Response.json(
                {
                    success: false,
                },
                {
                    status: 403,
                }
            );
        }

        const user = await User.findOne({_id:id})
                .select("-password");

//console.log(user)
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

        const wallet =
            await Wallet.findOne({
                user: user._id,
            });

        const transactions =
            await Transaction.find({
                user: user._id,
            }).sort({
                createdAt: -1,
            });

        const referrals =
            await Referral.find({
                referrer: user._id,
            }).populate(
                "referredUser",
                "name email"
            );

        return Response.json({

            success: true,

            data: {
                user,
                wallet,
                transactions,
                referrals,
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

export async function PUT(req, { params }) {

    try {

        await connectDB();

        const admin = await isAdmin();

        if (!admin) {

            return Response.json(
                {
                    success: false,
                },
                {
                    status: 403,
                }
            );
        }

        const body = await req.json();

        const updatedUser =
            await User.findByIdAndUpdate(
                params.id,
                body,
                {
                    new: true,
                }
            );

        return Response.json({
            success: true,
            user: updatedUser,
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