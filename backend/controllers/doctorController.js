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

        res.json({success: true, appointments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const completeAppointment = async (req, res)=> {
    try {
        const {appointmentId} = req.body
        const docId = req.docId
        const appointmentData = await Appointment.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: "Appointment Completed"})
        } else {
            return res.json({success: false, message: "Mark failed"})
        }
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const cancelAppointment = async (req, res)=> {
    try {
        const {docId, appontmentId} = req.body
        const appointmentData = await Appointment.findById(appontmentId)

        if(appointmentData && appointmentData.docId === docId) {
            await Appointment.findByIdAndUpdate(appontmentId, {cancelled: true})
            return res.json({success: true, message: "Appointment cancelled"})
        } else {
            return res.json({success: false, message: "Cancellation failed"})
        }
    
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


const doctorDashboard = async (req, res) => {
    try {
        const docId = req.docId
        const appointments = await Appointment.find({docId})

        let earnings = 0
        appointments.map((item)=> {
            if(item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item=> {
            if(!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        }))

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success: true, dashData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId
        const profileData = await Doctor.findById(docId).select("-password")

        res.json({success: true, profileData})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export {changeAvailibility, doctorList, login, doctorAppointments, completeAppointment, cancelAppointment, doctorDashboard}
