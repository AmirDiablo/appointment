import express from "express"
import { addDoctors , adminDashboard, adminLogin, allDoctors, appointmentsAdmin, cancelAppointment} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/AuthAdmin.js"
import { changeAvailibility } from "../controllers/doctorController.js"

const router = express.Router()

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctors)
router.post("/login", adminLogin)
router.post("/all-doctors", authAdmin,allDoctors)
router.post("/change-availability", authAdmin, changeAvailibility)
router.get("/appointments", authAdmin, appointmentsAdmin)
router.post("/cancel-appointment", authAdmin, cancelAppointment)
router.get("/dashboard", authAdmin, adminDashboard)

export default router