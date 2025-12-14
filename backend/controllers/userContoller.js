import validator from "validator"
import bcrycpt from "bcrypt"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"

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

export {registerUser, loginUser, getProfile, updateProfile}