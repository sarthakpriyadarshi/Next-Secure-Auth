import { connect } from "@/db/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        const user = await User.findOne({ email: email });
        if(user) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        const emailRes = await sendEmail({email: email, emailType: 'verify', userId: savedUser._id});
        console.log(emailRes)
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, { status: 201
        })

        
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            error: error.message
        }, { status: 500 })
    }
}