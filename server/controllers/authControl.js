require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Auth = require("../models/Auth")
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
        signed: true,
        maxAge: 60 * 60 * 24 * 1000 
    })
    res.status(200).json({accessToken})
    } catch (err) {
        next(err)
    }
}
async function checkCookie(req, res, next) {
    try {
        const cookie = req.cookies.jwt
        console.log(req.cookies)
        console.log(cookie)
        if (!cookie) {
            return res.status(400).json({message: "Not Logged In"})
        } 
        const verified = jwt.verify(cookie, refreshSecret)
        if (!verified) {
            return res.status(400).json({message: "Bitch! Who da fuck is you?"})
        }

        const {username} = jwt.decode(cookie, refreshSecret)
        const user = await User.findOne({username}).lean().exec()
        if (!user) {
            res.status(400).json({message: "Homie inside says he dont know you."})
        } 
        const accessToken = buildAccess(user)
        const refreshToken = buildAccess(user)
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            signed: true,
            maxAge: 24 * 60 * 60 * 1000         
        })
        res.json({accessToken})
    } catch (err) {
        next(err)
    }
}

module.exports = {
 login,
 checkCookie,
}