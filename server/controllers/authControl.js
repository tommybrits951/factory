require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const refreshSecret = process.env.REFRESH_SECRET
const accessSecret = process.env.ACCESS_SECRET






function buildRefresh(user) {
    const payload = {
        subject: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, refreshSecret, options)
}

function buildAccess(user) {
    const payload = {
        subject: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
    }
    const options = {
        expiresIn: "1h"
    }
    return jwt.sign(payload, accessSecret, options)
}




async function login(req, res, next) {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({message: "username password required"})
        }
        
    const user = await User.findOne({username}).lean().exec()
    const match = await bcrypt.compare(password, user.password)
    if (!match || !user) {
        res.status(401).json({message: "username or password incorrect"})
    }
    const refreshToken = buildRefresh(user)
    const accessToken = buildAccess(user)    
    
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 24 * 1000 
    })
    res.status(200).json({accessToken})
    } catch (err) {
        next(err)
    }
}


async function refreshHandle(req, res, next) {
    try {
        const refreshToken = req.cookies.jwt
        if (!refreshToken) res.status(401)
        console.log(refreshToken)
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET) 
        console.log(decoded)
        const user = await User.find({username: decoded.username})
        const accessToken = buildAccess(user)
        res.status(200).json(accessToken)
    } catch (err) {
        next(err)
    }
}   

async function checkAccess(req, res, next) {
    try {
        const token = req.headers.Authorization
        const decoded = jwt.decode(token, process.env.ACCESS_SECRET)
        res.json(decoded.role)
    } catch (err) {
        next(err)
    }
} 


module.exports = {
 login,
 refreshHandle,
 buildAccess,
 buildRefresh,
 checkAccess
}