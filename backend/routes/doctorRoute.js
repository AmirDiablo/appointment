import express from "express"
import { doctorList, login, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboard, doctorProfile, updateDoctorProfile } from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"

const router = express.Router()

router.get("/list", doctorList)
router.post("/login", login)
router.get('/appointments', authDoctor, doctorAppointments)
router.post('/complete-appointment', authDoctor, completeAppointment)
router.post('/cancel-appointment', authDoctor, cancelAppointment)
router.get('/dashboard', authDoctor, doctorDashboard)
router.get("/profile", authDoctor, doctorProfile)
router.post("/update-profile", authDoctor, updateDoctorProfile)

export default router