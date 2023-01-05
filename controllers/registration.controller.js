const registration = require("../models/registration.model");


const doregistration = async (req, res) => {
    try {
        let { name, father_husband_name, DOB, age, gender, diseases_complaints, history_of_diseases, present_address, city, pin_code, state, country, mobile_number, email, nationality } = req.body
        if (!name || !father_husband_name || !DOB || !age || !gender || !diseases_complaints || !history_of_diseases || !present_address || !city || !pin_code || !state || !country || !mobile_number || !email || !nationality) {
            return res.status(400).json({ success: false, message: "name, father_husband_name,  DOB, age, gender,diseases_complaints,history_of_diseases,present_address,city,pin_code,state,country,mobile_number,email,nationality are required" })
        }
        if (isNaN(mobile_number)) {
            return res.status(400).json({ success: false, message: "invalid mobile number (NaN)" })
        }

        if (mobile_number.toString().length === 10) {
            const varify = await registration.findOne({ mobile_number })
            // return res.json({varify});
            if (varify) {
                if (varify.accountCreated) {
                    return res.status(401).json({ success: false, message: "User already exists" })
                } else {
                    // update
                    const data = await registration.findByIdAndUpdate(varify._id, { name, father_husband_name, DOB, age, gender, diseases_complaints, history_of_diseases, present_address, city, pin_code, state, country, mobile_number, email, nationality }, { new: true })
                }
            } else {
                // create
                const data = await registration.create({ name, father_husband_name, DOB, age, gender, diseases_complaints, history_of_diseases, present_address, city, pin_code, state, country, mobile_number, email, nationality })
            }
        } else {
            return res.status(400).json({ success: false, message: "invalid mobile number" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const liveSearch = async (req, res) => {
    try {
        const { name } = req.query
        const skip = Number(req.query.skip) || 0

        const data = await registration.find({ name: { $regex: '^' + name, $options: 'i' } }).select("name dp gender _id ").sort({ datetime: -1 }).skip(skip).limit(20)
        res.status(200).json({ success: true, data })
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, message: "server error" })
    }
}


module.exports = {
    doregistration,
    liveSearch
}