import { NextResponse }
    from "next/server";

import Task from "@/models/Task";
import User from "@/models/User";

import { connectDB }
    from "@/lib/db";

import { getUser }
    from "@/lib/getUser";

// UPDATE TASK
export async function PUT(
    req,
    { params }
) {

    try {

        await connectDB();

        const userData =
            await getUser();

        const admin =
            await User.findById(
                userData.id
            );

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

        const task =
            await Task.findByIdAndUpdate(
                params.id,
                body,
                {
                    new: true,
                }
            );

        return NextResponse.json({

            success: true,

            message:
                "Task updated",

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

// DELETE TASK
export async function DELETE(
    req,
    { params }
) {

    try {

        await connectDB();

        const userData =
            await getUser();

        const admin =
            await User.findById(
                userData.id
            );

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

        await Task.findByIdAndDelete(
            params.id
        );

        return NextResponse.json({

            success: true,

            message:
                "Task deleted",

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