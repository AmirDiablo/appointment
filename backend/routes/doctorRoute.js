import express from "express"
import { doctorList } from "../controllers/doctorController.js"

const router = express.Router()

router.get("/list", doctorList)

export default router