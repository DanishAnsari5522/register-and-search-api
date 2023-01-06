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
            let firstletter = name.charAt(0);
            var currentdate = Date.now();
            const key = firstletter + currentdate;
            console.log(key);
            // return res.json({varify});
            if (varify) {
                if (varify.accountCreated) {
                    return res.status(401).json({ success: false, message: "User already exists" })
                } else {
                    // update
                    const data = await registration.findByIdAndUpdate(varify._id, { userid: key, name, father_husband_name, DOB, age, gender, diseases_complaints, history_of_diseases, present_address, city, pin_code, state, country, mobile_number, email, nationality }, { new: true })
                }
            } else {
                // create
                const data = await registration.create({ userid: key, name, father_husband_name, DOB, age, gender, diseases_complaints, history_of_diseases, present_address, city, pin_code, state, country, mobile_number, email, nationality })
            }
        } else {
            return res.status(400).json({ success: false, message: "invalid mobile number" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}

const getByMobile = async (req, res) => {
    try {
        let mobile = req.query.mobile
        if (!mobile) {
            return res.status(404).json({ success: false, message: "id is not provided" })
        }
        if (mobile) {
            const registerInfo = await registration.findOne({ mobile }).select('_id name email mobile_number gender father_husband_name DOB age diseases_complaints history_of_diseases present_address city pin_code state country nationality')
            if (!registerInfo) {
                return res.status(404).json({ success: false, message: 'user not found' })
            }
            return res.status(200).json({
                success: true, data: {
                    name: registerInfo.name,
                    // _id: registerInfo._id,
                    email: registerInfo.email,
                    mobile_number: registerInfo.mobile_number,
                    gender: registerInfo.gender,
                    father_husband_name:registerInfo.father_husband_name,
                    DOB:registerInfo.DOB,
                    age:registerInfo.age,
                    diseases_complaints:registerInfo.diseases_complaints,
                    history_of_diseases:registerInfo.history_of_diseases,
                    present_address:registerInfo.present_address,
                    city:registerInfo.city,
                    pin_code:registerInfo.pin_code,
                    state:registerInfo.state,
                    country:registerInfo.country,
                    nationality:registerInfo.nationality
                }
            })
        } else {
            return res.status(401).json({ success: false, message: "invalid id" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "server error" })
    }
}


module.exports = {
    doregistration,
    getByMobile
}