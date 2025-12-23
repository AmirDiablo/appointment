import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authDoctor = async (req, res, next)=> {
    
    const { authorization } = req.headers
    
    if(!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    const dToken = authorization.split(' ')[1]

    try{
        const token_decode  = jwt.verify(dToken, process.env.JWT_SECRET)
        
        req.body.docId = token_decode.id
        next()
    }catch(error){
        res.status(401).json({error: "request is not authorized"})
    }
}


export default authDoctor