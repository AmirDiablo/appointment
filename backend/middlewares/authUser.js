import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const authUser = async (req, res, next)=> {
    
    const { authorization } = req.headers
    
    if(!authorization) {
        return res.status(401).json({error: "Authorization tokrn required"})
    }

    const token = authorization.split(' ')[1]

    try{
        const {id}  = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findOne({_id: id}).select('_id')
        next()
    }catch(error){
        res.status(401).json({error: "request is not authorized"})
    }
}


export default authUser