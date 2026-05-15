import { NextResponse }
    from "next/server";

import Task from "@/models/Task";
import User from "@/models/User";

import { connectDB }
    from "@/lib/db";

import { getUser }
    from "@/lib/getUser";

// CREATE TASK
export async function POST(req) {

    try {

        await connectDB();

        const userData =
            await getUser();

        const admin =
            await User.findById(
                userData.id
            );

        // ADMIN CHECK
        if (
            !admin ||
            admin.role !== "admin"
        ) {

            return NextResponse.json(
                {
                    message:
                        "Unauthorized",
                },
                { status: 403 }
            );

        }

        const body =
            await req.json();
            console.log("body",body)

        const {
            title,
            reward,
            order,
            type,
            referralCount,
        } = body;

        // VALIDATION
        if (
            !title ||
            !reward ||
            !order
        ) {

            return NextResponse.json(
                {
                    message:
                        "All fields required",
                },
                { status: 400 }
            );

        }

        const task =
            await Task.create({

                title,

                reward,

                order,

                type,

                referralCount,

            });

        return NextResponse.json({

            success: true,

            message:
                "Task created successfully",

            task,

        });

    } catch (err) {

        console.log(err);

        return NextResponse.json(
            {
                message:
                    "Server error",
            },
            { status: 500 }
        );

    }

}

// GET ALL TASKS
export async function GET() {

    try {

        await connectDB();

        const tasks =await Task.find().sort({ order: 1 });

        return NextResponse.json({
            tasks,
        });

    } catch (err) {

        console.log(err);

        return NextResponse.json(
            {
                message:
                    "Server error",
            },
            { status: 500 }
        );

    }

}