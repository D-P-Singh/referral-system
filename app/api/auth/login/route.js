import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";

import User from "@/models/User";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import generateToken from "@/utils/generateToken";

export async function POST(req) {

    try {

        await connectDB();

        const body = await req.json();

        const {
            phone,
            password,
        } = body;

        const user = await User.findOne({
            phone,
        });

        if (!user) {

            return Response.json({
                success: false,
                msg: "User not found",
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return Response.json({
                isBlocked: user.isBlocked,
                success: false,
                msg: "Wrong Password",
            });
        }

        const token = generateToken(user);

        const response =
            NextResponse.json({
                success: true,
                msg: "Login Success",
            });

        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60,
            }
        );
        NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`);
        return response;

    } catch (error) {

        return Response.json({
            success: false,
            error: error.message,
        });
    }
}