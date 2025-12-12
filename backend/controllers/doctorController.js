import Doctor from "../models/doctorModel.js"


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

export {changeAvailibility}
