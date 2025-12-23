import express from "express"
import { doctorList, login } from "../controllers/doctorController.js"

const router = express.Router()

router.get("/list", doctorList)
router.post("/login", login)

export default router