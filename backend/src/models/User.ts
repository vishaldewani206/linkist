import { model, Schema } from "mongoose";

interface IUser{
  name: string,
  username: string,
  email: string,
  password: string,
  avatar:string,
  googleId: string,
  accountVerified: boolean,
  verificationCode: number,
  verificationCodeExpire: Date,
  resetPasswordToken: string,
  resetPasswordExpire: Date
  attempts: number,
  attemptsTime: Date,
  refreshToken: string

}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    lowercase:true
  },
  email:{
    type: String,
    required: true,
    trim:true,
    unique: true,
    lowercase:true
  },
  password: {
    type: String,
    required: true,
    trim:true,
    minLength: [8, "Password must have at least 8 characters."],
    maxLength: [32, "Password cannot have more than 32 characters."]
  },
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true
  },
  accountVerified:{
    type: Boolean,
    default: false
  },
  verificationCode: Number,
  verificationCodeExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  attempts:{
    type:Number,
    default: 0
  },
  attemptsTime:{
    type: Date,
    default: Date.now
  },
  refreshToken: {
    type: String
  },
}, {timestamps:true})


const User = model<IUser>("User", userSchema)

export {type IUser,User}