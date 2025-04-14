import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/db/db";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({
            message: "Error fetching user data",
            error: error.message
        }, { status: 500 })
    }
}

