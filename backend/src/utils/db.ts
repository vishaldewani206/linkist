import mongoose from "mongoose";

export const connectDb: ()=> Promise<void> = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to DB");
  } catch (error: any) {
    console.log("Error connecting db: " + error.message);
    process.exit(1)
  }
}

