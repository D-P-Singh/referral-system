import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Referral from "@/models/Referral";
import bcrypt from "bcryptjs";
import { generateReferralCode } from "@/utils/referral";
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    try {
        const {
            name,
            email,
            phone,
            password,
            referralCode,
        } = await req.json();

        if (!name || !email || !phone || !password) {
            return NextResponse.json({
                success: false,
                message: "All fields are required",
            }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User already exists",
            }, { status: 400 });
        }

        // find referrer
        let referrer = null;

        if (referralCode) {
            referrer = await User.findOne({ referralCode });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const myReferralCode = generateReferralCode(name, phone);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            referralCode: myReferralCode,
            referredBy: referrer ? referrer._id : null,
            isActive: false, // IMPORTANT
        });

        // CREATE referral record (PENDING)
        if (referrer) {
            await Referral.create({
                referrer: referrer._id,
                referredUser: user._id,
                rewardAmount: 20,
                status: "pending",
                paymentStatus: "pending",
            });
        }

        return NextResponse.json({
            success: true,
            message: "Registration successful",
            user,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}