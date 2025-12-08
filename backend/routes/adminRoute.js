import express from "express"
import { addDoctors } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"

const router = express.Router()

router.post("/add-doctor", upload.single("image"), addDoctors)

export default router