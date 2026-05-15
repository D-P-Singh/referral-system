import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";
import Wallet from "@/models/Wallet";
import Transaction from "@/models/Transactions";
import { getUser } from "@/lib/getUser";

export async function POST(req) {
    try {
        await connectDB();

        const { taskId } = await req.json();

        const userData = await getUser();

        if (!userData) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (user.isBlocked) {
            return NextResponse.json(
                { message: "Account blocked" },
                { status: 403 }
            );
        }

        const task = await Task.findById(taskId);

        if (!task) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        // =========================
        // 🔥 DAILY LIMIT CHECK
        // =========================
        const today = new Date().toDateString();

        const alreadyClaimed = user.completedTasks?.some(
            (t) =>
                t.taskId.toString() === taskId.toString() &&
                new Date(t.claimedAt).toDateString() === today
        );

        if (alreadyClaimed) {
            return NextResponse.json(
                { message: "Already claimed today" },
                { status: 400 }
            );
        }

        // =========================
        // 💰 WALLET UPDATE (SAFE)
        // =========================
        const wallet = await Wallet.findOneAndUpdate(
            { user: user._id },
            {
                $inc: {
                    balance: task.reward,
                    totalEarned: task.reward,
                },
            },
            { new: true, upsert: true }
        );

        // =========================
        // 📌 TRANSACTION LOG
        // =========================
        await Transaction.create({
            user: user._id,
            amount: task.reward,
            type: "credit",
            source: "daily_reward",
            status: "success",
            note: task.title,
        });

        // 👇 THIS GOES LAST
        await User.updateOne(
            { _id: user._id },
            {
                $push: {
                    completedTasks: {
                        taskId: task._id,
                        claimedAt: new Date(),
                    },
                },
            }
        );

        // =========================
        // 👤 USER TRACKING ONLY
        // =========================

        return NextResponse.json({
            success: true,
            message: `₹${task.reward} added successfully`,
            balance: wallet.balance,
        });

    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {
                success: false,
                message: err.message,
            },
            { status: 500 }
        );
    }
}