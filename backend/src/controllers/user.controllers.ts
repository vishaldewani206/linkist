import { Request, Response } from "express";
import { User } from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";


const updateProfile  = asyncHandler(async (req: Request, res: Response) : Promise<void> =>{
  try {
    res.send("hello")
  } catch (error) {
    console.log(error);
  }
})


export {updateProfile}