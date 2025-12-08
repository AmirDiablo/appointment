import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers
        if(!atoken) {
            return res.json({success: false, message: "Not Athorized"})
        }

        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Not Athorized"})
        }

        next()

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export default authAdmin