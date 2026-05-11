import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/User";
import { ApiResponse } from "../utils/ApiResponse";
import { sendVerificationCode } from "../helper/verifyAndEmail";



interface RegisterBody {
    name: string
    email: string
    password: string
}

const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as RegisterBody

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required!")
  }

  const existingUser = await User.findOne({ email, accountVerified: true })
  if (existingUser) {
    throw new ApiError(400, "User is already registered")
  }

  const THIRTY_MINUTES = 30 * 60 * 1000
  const now = Date.now()

  let user = await User.findOne({ email, accountVerified: false })

  if (user) {
    const lastAttempt = user.attemptsTime
      ? new Date(user.attemptsTime).getTime()
      : 0
    const timeDiff = now - lastAttempt

    if (timeDiff > THIRTY_MINUTES) {
      user.attempts = 0
      user.attemptsTime = new Date(now)
    }

    if (user.attempts >= 3 && timeDiff <= THIRTY_MINUTES) {
      user.verificationCode = undefined
      user.verificationCodeExpire = undefined
      await user.save()
      throw new ApiError(
        429,
        "You have exceeded the maximum number of attempts (3). Please wait 30 minutes before trying again."
      )
    }

    user.attempts += 1
    user.attemptsTime = new Date(now)
    await user.save()

  } else {
    user = await User.create({
      name,
      email,
      password,
      attempts: 1,
      attemptsTime: new Date(now),
  })
  }

  const verificationCode = user.generateVerificationCode()
  await user.save()
  await sendVerificationCode(verificationCode, email, name) 

  const safeUser = await User
    .findById(user._id)
    .select("-password -resetPasswordToken -resetPasswordExpire -verificationCode -verificationCodeExpire")

  res.status(200).json(
    new ApiResponse(200, safeUser, `Verification code sent successfully to ${name}`)
  )
})

export { register }


