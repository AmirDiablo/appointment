import jwt from "jsonwebtoken"

const authAdmin = async (req, res, next) => {
    try {
        const aToken = req.headers.authorization
        if (!aToken) {
            return res.json({ success: false, message: "Not Authorized" })
        }

        const token_decode = jwt.verify(aToken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized" })
        }

        next()
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin