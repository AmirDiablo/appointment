import dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./routes/adminRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import userRoute from "./routes/userRoute.js"

const app = express()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.use("/api/admin", adminRoute)
app.use("/api/doctor", doctorRoute)
app.use("/api/user", userRoute)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log("connected to DB and server start listen on port", process.env.PORT)
    })
})
.catch((err)=> {
    console.log(err)
})