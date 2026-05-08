import express, {type Express} from "express";
import { config } from "dotenv";
import cors from "cors"
import { connectDb } from "./utils/db";
import routes from "./routes/index";
import { errorHandler } from "./middlewares/error.middlwares";

config({})

const app: Express = express()


const port = process.env.PORT || 8000

//common middleware
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))

app.use(cors({
  origin: process.env.HOST_URL || "*",
  credentials:true
}))



//ROUTES
app.use("/api", routes)

connectDb().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on port: ${port}`)
    })
})
.catch((error)=>{
    console.log("MongoDB connection error!!", error)
})

app.use(errorHandler);