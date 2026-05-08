import {Router} from "express"
import { updateProfile } from "../controllers/user.controllers"


const router = Router()

router.get("/update-profile", updateProfile)

export default router