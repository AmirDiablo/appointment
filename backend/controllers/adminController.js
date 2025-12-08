import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import Doctor from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

//API for adding doctors
const addDoctors = async (req, res) => {
    try {
        const { name, email, password, image, speciality, degree, experience, about, available, fees, address, date, slots_booked } = req.body
        const imageFile = req.file

        if( !name || !email || !password || !image || !speciality || !degree || !experience || !about || !available || !fees || !address || !date || !slots_booked) {
            return res.json({success: false, message: "Missing details"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hash,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = await Doctor.create(doctorData)

        res.json({success: true, message: "doctor added"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


//api for admin login
const adminLogin = async (req, res) => {
    try {

        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            return res.json({success: false, message: "Invalid credentails"})
        }
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {addDoctors, adminLogin}