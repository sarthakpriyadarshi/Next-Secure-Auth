import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if(emailType === 'verify') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000});
        } else if(emailType === 'reset') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000});
        } else {
            throw new Error("Invalid email type")
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
        const mailOptions = {
            from: 'sarthak@cyberol.codes',
            to: email,
            subject: emailType === 'verify' ? 'Verify your account' : 'Reset your password',
            html: emailType === 'verify' ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'verify' ? 'verify your account' : 'reset your password'} or copy and paste the link below ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
            : `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to ${emailType === 'verify' ? 'verify your account' : 'reset your password'} or copy and paste the link below ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch(error: any) {
        throw new Error(error.message)
    }
}