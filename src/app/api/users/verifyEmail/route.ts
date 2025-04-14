import { connect } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        }).select("-password");
        if(!user) {
            return NextResponse.json({
                message: "Invalid or expired token"
            }, { status: 400 })
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 })
    } catch(error: unknown) {
        console.error("Error verifying email:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 })
    }
}