import connectDB from '../../../../dbConfig/dbConfig.js';
import User from '../../../../models/userModel.js';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;    
        // Validation
        console.log(reqBody);

        if (!email || !password) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }
        console.log("user exists:", user);

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials", success: false },
                { status: 401 }
            );
        }

        // Generate JWT token
        const tokendata = { userId: user._id, email: user.email ,username:user.username};
        const token =  await jwt.sign(tokendata, process.env.JWT_SECRET, { expiresIn: '1h' });


       const response = NextResponse.json(
            { message: "Login successful", success: true, token },
            { status: 200 }
        );
         response.cookies.set('token', token, { httpOnly: true });
         return response;
    } catch (error) {
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
}