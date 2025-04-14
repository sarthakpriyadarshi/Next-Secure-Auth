import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password, confirmPassword } = reqBody;
        console.log("Request body:", token, password, confirmPassword);
        const user = await User.findOne({
            forgotPasswordToken: token
        }).select("-password");
        console.log("User found:", user);
        if(!user) {
            return NextResponse.json({
                message: "Invalid or expired token"
            }, { status: 400 })
        }
        if(password !== confirmPassword) {
            return NextResponse.json({
                message: "Passwords do not match"
            }, { status: 400 })
        }
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 })
    } catch(error: any) {
        console.error("Error verifying email:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            error: error.message
        }, { status: 500 })
    }
}