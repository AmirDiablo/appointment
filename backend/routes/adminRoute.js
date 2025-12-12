import express from "express"
import { addDoctors , adminLogin, allDoctors} from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"
import authAdmin from "../middlewares/AuthAdmin.js"

const router = express.Router()

router.post("/add-doctor", authAdmin, upload.single("image"), addDoctors)
router.post("/login", adminLogin)
router.post("/all-doctors", authAdmin,allDoctors)

export default router