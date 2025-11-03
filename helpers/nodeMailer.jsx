import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import { User } from '../models/userModels';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'Verify') {
            await User.findByIdAndUpdate(userId, { verificationToken: hashedToken })
        } else if (emailType === 'Reset') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken })
        }


        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "7cdf0a7808ece2",
                pass: "6102acc8ee1957"
            }
        });

        const mailOptions = {
            from: 'annsfaiyaz@gmail.com',
            to: email,
            subject: emailType === 'Verify' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click here to ${emailType === 'Verify' ? 'verify' : 'reset'} your email: <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">Verify Email</a><br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}</p>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error) {
        console.error("Error in sendEmail:", error);
        throw error;
    }
};
