import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, payForAppointment } from "../controllers/userContoller.js";
import express from "express"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/get-profile", authUser, getProfile)
router.post("/update-profile", upload.single("image"), authUser, updateProfile)
router.post("/book-appointment", authUser, bookAppointment)
router.get("/appointments", authUser, listAppointment)
router.post("/cancel-appointment", authUser, cancelAppointment)
router.post('/pay-for-appointment', authUser, payForAppointment)

export default router