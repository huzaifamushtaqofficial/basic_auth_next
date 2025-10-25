import connectDB from "../../../../dbConfig/dbConfig.js";
import User from "../../../../models/userModel.js";
import { NextResponse } from "next/server";

connectDB();

export async function GET(request, context) {
  try {
    const { id } = await context.params; 
    const user = await User.findById(id).select("-password"); 

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
