import { sendEmail } from '@/helpers/mailer';

import { connect } from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = await reqBody;
        console.log(email)
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({
                message: 'User not found',
            }, { status: 404 })
        }
        const userId = user._id.toString();
        const res = await sendEmail({ email, emailType: 'reset', userId: userId})
        if (res) {
            return NextResponse.json({
                message: 'Email sent successfully',
            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: 'Error sending email',
            }, { status: 500 })
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({
            message: 'Internal server error',
            success: false,
            error: error.message
        }, { status: 500 })
        
    }
}