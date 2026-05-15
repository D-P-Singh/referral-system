import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import User from "@/models/User";
import Task from "@/models/Task";
import { getUser } from "@/lib/getUser";

export async function GET() {
    try {
        await connectDB();

        // 🔐 auth check
        const userData = await getUser();

        if (!userData) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await User.findById(userData.id);

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }

        // 📌 fetch tasks
        const tasks = await Task.find()
            .sort({ order: 1 })
            .lean();

        const today = new Date().toDateString();

        // =========================
        // 🔥 TASK ENRICHMENT
        // =========================
        const updatedTasks = tasks.map((task, index) => {
            // ✅ completed today check
            const completed = user.completedTasks?.some(
                (t) =>
                    t.taskId.toString() === task._id.toString() &&
                    new Date(t.claimedAt).toDateString() === today
            );

            // 🔓 unlock logic
            const completedTaskIds = new Set(
                user.completedTasks.map((t) => t.taskId.toString())
            );

            let unlocked = false;

            if (index === 0) {
                unlocked = true;
            } else {
                const previousTask = tasks[index - 1];

                unlocked = completedTaskIds.has(
                    previousTask._id.toString()
                );
            }

            return {
                _id: task._id,
                title: task.title,
                reward: task.reward,
                order: task.order,
                type: task.type,
                referralCount: task.referralCount,
                isActive: task.isActive,

                completed,
                unlocked,
            };
        });

        return NextResponse.json({
            success: true,
            tasks: updatedTasks,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}