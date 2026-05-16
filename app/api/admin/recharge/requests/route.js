import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transactions";

export async function GET() {
    try {
        await connectDB();

        const recharges = await Transaction.find({
            source: "recharge",
            status: "pending",
        })
            .populate({
                path: "user",
                select: "name email",
            })
            .sort({ createdAt: -1 });

        return NextResponse.json({ recharges });
    } catch (err) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}