// app/api/admin/settings/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SystemSettings from "@/models/SystemSettings";
import { isAdmin } from "@/lib/isAdmin";
export async function GET() {
    try {
        await connectDB();
        const admin = await isAdmin();
        if (!admin) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 403 }
            );
        }


        let settings = await SystemSettings.findOne();

        if (!settings) {
            settings = await SystemSettings.create({});
        }

        return NextResponse.json({
            success: true,
            settings,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}

export async function PUT(req) {
    try {
        await connectDB();

        const body = await req.json();

        let settings = await SystemSettings.findOne();

        if (!settings) {
            settings = await SystemSettings.create(body);
        } else {
            settings = await SystemSettings.findByIdAndUpdate(
                settings._id,
                body,
                { new: true }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Settings updated successfully",
            settings,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}