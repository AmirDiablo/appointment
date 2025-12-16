import validator from "validator"
import bcrycpt from "bcrypt"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import Doctor from "../models/doctorModel.js"
import Appointment from "../models/appointmentModel.js"

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.json({success: false, message: "Missing details"})
        }

        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success: false, message: "enter a strong password"})
        }

        const salt = await bcrycpt.genSalt(10)
        const hashed = await bcrycpt.hash(password, salt)

        const user = await User.create({name, email, password: hashed})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            return res.json({success: false, message: "user does not exist"})
        }

        const isMatch = await bcrycpt.compare(password, user.password)

        if(isMatch) {
            const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const userData = await User.findById(userId).select('-password')

        res.json({success: true, userData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const {phone, name, address, dob, gender} = req.body
        const imageFile = req.file

        if(!phone ||  !name ||  !dob  || !gender) {
            return res.json({success: false, message: "Data Missing"})
        }

        await User.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})

        if(imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = imageUpload.secure_url

            await User.findByIdAndUpdate(userId, {image: imageUrl})
        }

        res.json({success: true, message: "Profile Updated"})
        
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const bookAppointment = async (req, res) => {
    try {
        const {docId, slotDate, slotTime} = req.body
        const userId = req.user._id

        const docData = await Doctor.findById(docId).select("-password")

        if(!docData.available) {
            return res.json({success: false, message: "Doctor not available"})
        }

        let slots_booked = docData.slots_booked

        //checking for slot availability
        if(slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)) {
                return res.json({success: false, message: "Slot not available"})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select("-password")

        delete docData.slots_booked

        const newAppointment = await Appointment.create({
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        })

        const updateDoctorSlots = await Doctor.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment booked"})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const listAppointment = async (req, res) => {
    try {
        const userId = req.user._id
        const appointment = await Appointment.find({userId})

        res.json({success: true, appointments: appointment})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment}