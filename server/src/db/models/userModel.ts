import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
    username: string;
    email:string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<User>(
{
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:12,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
{ timestamps:true }
)

const UserModel = mongoose.model<User>("User",UserSchema);

export default UserModel;