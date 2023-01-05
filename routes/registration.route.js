
const express = require("express")
const registration = express.Router()
const { doregistration,liveSearch } = require("../controllers/registration.controller")
registration.post("/registration", doregistration)
registration.get("/search_by_id", liveSearch)
module.exports = registration