import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/userContoller.js";
import express from "express"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", authUser, getProfile)
router.post("/update-profile", upload.single("image"), authUser, updateProfile)

export default router