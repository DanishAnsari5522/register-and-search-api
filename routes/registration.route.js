
const express = require("express")
const registration = express.Router()
const { doregistration,getByMobile } = require("../controllers/registration.controller")
registration.post("/registration", doregistration)
registration.get("/getByMobile", getByMobile)
module.exports = registration