import express from "express"
import { doctorList, login, doctorAppointments } from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"

const router = express.Router()

router.get("/list", doctorList)
router.post("/login", login)
router.get('/appointments', authDoctor, doctorAppointments)

export default router