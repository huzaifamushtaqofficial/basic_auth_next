import { NextResponse } from 'next/server';
import connectDB from '../../../../dbConfig/dbConfig.js';

connectDB();

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );

    // ✅ Clear JWT token cookie
    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
