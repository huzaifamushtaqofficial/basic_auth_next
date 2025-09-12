import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }) => {
   
    try {
         const hashedToken = await bcrypt.hash(userId.toString(), 10);
         if (emailType === "VERIFY") {
        await User.findByIdAndUpdate(userId, { verifyToken: hashedToken ,verifyTokenExpiry: Date.now() + 3600000 });
    }else if(emailType==="RESET"){
        await User.findByIdAndUpdate(userId, { forgetPasswordToken: hashedToken ,forgetPasswordTokenExpiry: Date.now() + 3600000 });
    }

        const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
    from: 'Test Mail  <test@mail.com>',
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}. This link will expire in 1 hour.
    or if you copy and paste this link into your browser, it will also work: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
  };


const mailResponse = await transporter.sendMail(mailOptions)
return mailResponse

    } catch (error) {
        
    }
}