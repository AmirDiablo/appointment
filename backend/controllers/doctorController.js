import Doctor from "../models/doctorModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Appointment from "../models/appointmentModel.js"


const changeAvailibility = async (req, res) => {
    try {
        const {docId} = req.body
        
        const docData = await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availability changed"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select("-password -email")
        res.json({success: true, doctors})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const doctor = await Doctor.findOne({email})

        if(!doctor) {
            return res.json({success: false, message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch) {
            const token = await jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const doctorAppointments = async (req, res) => {
    try {
        const docId = req.docId
        const appointments = await Appointment.find({docId})
        console.log(appointments)

        res.json({success: true, appointments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const appointmentComplete = async (req, res)=> {
    try {
        const {docId, appontmentId} = req.body
        const appointmentData = await Appointment.findById(appontmentId)

        if(appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appontmentId, {isCompleted: true})
            return res.json({success: true, message: "Appointment Completed"})
        } else {
            return res.json({success: false, message: "Mark failed"})
        }
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {changeAvailibility, doctorList, login, doctorAppointments, appointmentComplete}
