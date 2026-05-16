// app/api/user/profile/update/route.js

import { NextResponse } from "next/server";
import User from "@/models/User";
import {connectDB} from "@/lib/db";
import { getUser } from "@/lib/getUser";


export async function PUT(request) {

    try {
        await connectDB();

        const authUser = await getUser()


        if (!authUser) {

            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const updatedUser =
            await User.findByIdAndUpdate(
                authUser.id,
                {
                    name: body.name,
                    phone: body.phone,
                    email:body.email
                },
                { new: true }
            ).select("-password");

        return NextResponse.json({
            success: true,
            user: updatedUser,
        });

    } catch (error) {

        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}