import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transactions";
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

        const { transactionId, note } = await req.json();

        if (!transactionId) {
            return NextResponse.json(
                { message: "Transaction ID required" },
                { status: 400 }
            );
        }

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

        // ❌ reject transaction
        txn.status = "reject";
        txn.note = note || "No reason provided";
        txn.processedAt = new Date();

        await txn.save();

        return NextResponse.json({
            success: true,
            message: "Transaction rejected successfully",
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}