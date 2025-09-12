import connectDB from '../../../../dbConfig/dbConfig.js';
 import User from '../../../../models/userModel.js'; 
 import {sendEmail} from '../../../../helper/mailer.js'
 import bcrypt from 'bcryptjs'; 
 import { NextResponse } from 'next/server';
connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Validation
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { message: "User already exists", success: false },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const userSaved = await newUser.save();
        console.log(userSaved);

        // Send verification email
        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: userSaved._id,
        });

        return NextResponse.json(
            {
                message: "User registered successfully. Please verify your email.",
                success: true,
                savedUser: userSaved,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
}
