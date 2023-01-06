const mongoose = require('mongoose');

const registration = new mongoose.Schema({
    userid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    father_husband_name: {
        type: String,
        require: true
    },
    DOB: {
        type: Date,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    diseases_complaints: {
        type: String,
        require: true
    },
    history_of_diseases: {
        type: String,
        require: true
    },
    present_address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pin_code: {
        type: Number,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    mobile_number: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    nationality: {
        type: String,
        required: true
    },
    accountCreated: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("healthregistration", registration)