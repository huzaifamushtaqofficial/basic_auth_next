import connectDB from '../../../../dbConfig/dbConfig.js';
import { NextResponse } from 'next/server';
import User from '../../../../models/userModel.js';
import { getDataToken } from '../../../../helper/getDataToken.js';

// Connect to database
connectDB();

export async function POST(request) {
    const userId = await getDataToken(request);
    if (!userId) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
   const user = await User.findById(userId).select('-password');
   if (!user) {
       return NextResponse.json({ message: 'User not found' }, { status: 404 });
   }
   return NextResponse.json(
    {
    message: 'User fetched successfully',
    success: true,
    data : user
   }
   )
}