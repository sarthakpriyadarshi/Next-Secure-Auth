import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email: email })
        if(!user) {
            return NextResponse.json({ message: "User not found" }, { status: 400 }); 
        }
        console.log("Validating password")
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) {
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });
        const response = NextResponse.json({message: "Login successful", success: true}, { status: 200 });
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("An unknown error occurred");
        }
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        }, { status: 500 });
    }
}
