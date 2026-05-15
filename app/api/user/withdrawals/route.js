import {connectDB} from "@/lib/db";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Withdrawal from "@/models/Withdrawal";
import Transaction from "@/models/Transactions";
import { getUser } from "@/lib/getUser";
import { NextResponse } from "next/server";

// =========================
// POST WITHDRAW REQUEST
// =========================
export async function POST(req) {
    try {
        await connectDB();

        const currentUser = await getUser();

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { amount, method, details } = await req.json();

        if (!amount || !method || !details) {
            return NextResponse.json(
                { success: false, message: "All fields required" },
                { status: 400 }
            );
        }

        if (amount < 100) {
            return NextResponse.json(
                { success: false, message: "Minimum withdraw is ₹100" },
                { status: 400 }
            );
        }

        const user = await User.findById(currentUser.id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // 💰 wallet fetch
        const wallet = await Wallet.findOne({ user: user._id });

        if (!wallet || wallet.balance < amount) {
            return NextResponse.json(
                { success: false, message: "Insufficient balance" },
                { status: 400 }
            );
        }

        // =========================
        // 🔥 CREATE WITHDRAW REQUEST
        // =========================
        const withdraw = await Withdrawal.create({
            user: user._id,
            amount,
            method,
            details,
            status: "pending",
        });

        // =========================
        // 🔒 MOVE MONEY TO LOCKED BALANCE
        // =========================
        wallet.balance -= amount;
        wallet.pendingWithdraw += amount;

        await wallet.save();

        // =========================
        // 📌 TRANSACTION LOG
        // =========================
        await Transaction.create({
            user: user._id,
            amount,
            type: "debit",
            source: "withdrawal",
            status: "pending",
            note: "Withdraw request submitted",
        });

        return NextResponse.json({
            success: true,
            message: "Withdraw request submitted",
            withdrawId: withdraw._id,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();

        const currentUser = await getUser();

        if (!currentUser) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const withdrawals = await Withdrawal.find({
            user: currentUser.id,
        }).sort({ createdAt: -1 });

        const totalWithdraw = await Transaction.aggregate([
            {
                $match: {
                    user: currentUser.id,
                    source: "withdrawal",
                    status: "success",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        return NextResponse.json({
            success: true,
            withdrawals,
            totalWithdraw: totalWithdraw[0]?.total || 0,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}