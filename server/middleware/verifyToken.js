require("dotenv")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function checkAccess(req, res, next) {
    try {
        const token = req.headers.autorization
        const match = jwt.verify(token, process.env.ACCESS_SECRET)
        if (!match) {
            
            res.status(401).json({message: "Not Authorized"})
        }
        next()
    } catch (err) {
        next(err)
    }
}


module.exports = {
    checkAccess
}