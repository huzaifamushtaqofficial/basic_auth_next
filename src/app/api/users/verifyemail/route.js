import connectDB from '../../../../dbConfig/dbConfig.js';
import User from '../../../../models/userModel.js';
import { NextResponse } from 'next/server';

connectDB();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
       

        if (!token) {
            return NextResponse.json(
                { message: "Token is required", success: false },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired token", success: false },
                { status: 404 }
            );
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        console.log("✅ Updated User:", user);

        return NextResponse.json(
            { message: "Email verified successfully", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in verify API:", error);
        return NextResponse.json(
            { error: error.message, success: false },
            { status: 500 }
        );
    }
}
