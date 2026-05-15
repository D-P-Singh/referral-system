import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Transaction from "@/models/Transactions";
import Wallet from "@/models/Wallet";
import { getUser } from "@/lib/getUser";

export async function POST(req) {
    try {
        await connectDB();

        const currentUser = await getUser();

        if (!currentUser) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { utr, price } = await req.json();

        // ✅ validation
        if (!utr || !price) {
            return NextResponse.json(
                { message: "UTR and amount required" },
                { status: 400 }
            );
        }

        const utrRegex = /^[0-9A-Za-z]{10,30}$/;

        if (!utrRegex.test(utr)) {
            return NextResponse.json(
                { message: "Invalid UTR format" },
                { status: 400 }
            );
        }

        // 🔥 DUPLICATE UTR CHECK
        const existingUTR = await Transaction.findOne({ utr });

        if (existingUTR) {
            return NextResponse.json(
                { message: "UTR already used" },
                { status: 409 }
            );
        }

        // =========================
        // 1. CREATE PENDING TXN
        // =========================
        const txn = await Transaction.create({
            user: currentUser.id,
            type: "credit",
            source: "recharge",
            amount: price,
            utr,
            status: "pending",
        });

        // =========================
        // 2. UPDATE WALLET (PENDING HOLD)
        // =========================
        await Wallet.findOneAndUpdate(
            { user: currentUser.id },
            {
                $inc: { pendingWithdraw: 0 }, // optional placeholder
            },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: "Recharge request submitted",
            txnId: txn._id,
        });

    } catch (err) {
        return NextResponse.json(
            {
                success: false,
                message: err.message,
            },
            { status: 500 }
        );
    }
}