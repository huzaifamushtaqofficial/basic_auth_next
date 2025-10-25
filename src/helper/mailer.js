import User from '../models/userModel.js';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }) => {

  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
  

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ test SMTP connection
    await transporter.verify();
    console.log("SMTP Connected ✅");

    const mailOptions = {
      from: `"Huzaifa" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
          ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
          This link expires in 1 hour.
          <br/><br/>
          Or copy-paste: ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Mail sent ✅", mailResponse);
    return mailResponse;

  } catch (error) {
    console.log("Error sending email:", error.message); // ✅ clear error message
  }
};
