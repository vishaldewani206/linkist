import { CallbackWithoutResultAndOptionalError, model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"


interface IUser extends Document{
  name: string,
  username: string,
  email: string,
  password: string,
  avatar:string,
  googleId: string,
  accountVerified: boolean,
  attempts: number,
  attemptsTime: Date,
  refreshToken: string,
  verificationCode: number | undefined
  verificationCodeExpire: Date | undefined
  resetPasswordToken: string | undefined
  resetPasswordExpire: Date | undefined

  // methods
    comparePassword(enteredPassword: string): Promise<boolean>
    generateVerificationCode(): number
    generateToken(): string
    generateResetPasswordToken(): string
    isModified(path: string): boolean 

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
    maxLength: [32, "Password cannot have more than 32 characters."],
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


userSchema.pre<IUser>("save", async function (
  this: IUser,
  next: CallbackWithoutResultAndOptionalError
) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password)
}


userSchema.methods.generateVerificationCode = function (): number {
    
  function generateRandomFiveDigitNumber(): number {
    const firstDigit = Math.floor(Math.random() * 9) + 1
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")   
    return parseInt(`${firstDigit}${remainingDigits}`)
  }

    const verificationCode = generateRandomFiveDigitNumber()
    this.verificationCode = verificationCode
    this.verificationCodeExpire = new Date(Date.now() + 10 * 60 * 1000)
    return verificationCode
}


userSchema.methods.generateToken = function (): string {
  const secret = process.env.JWT_SECRET
  const expire = process.env.JWT_EXPIRE

  if (!secret)  throw new Error("JWT_SECRET is not defined in environment variables")
  if (!expire)  throw new Error("JWT_EXPIRE is not defined in environment variables")

  return jwt.sign(
    { id: this._id },
    secret,
    { expiresIn: expire }
  )
}

userSchema.methods.generateResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex")

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000)

  return resetToken   
}



const User = model<IUser>("User", userSchema)

export {type IUser,User}