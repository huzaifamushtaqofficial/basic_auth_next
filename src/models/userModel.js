import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'please provide a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgetPasswordToken:String,
        forgetPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,


}
, { timestamps: true });


const User = mongoose.models.users || mongoose.model("users",userSchema);
export default User;