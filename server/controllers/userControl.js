const User = require("../models/User")
const bcrypt = require("bcrypt")

async function getAll(req, res, next) {
    try {
        const users = await User.find().lean()
        if (!users) {
            return res.status(400).json({message: "user error somewhere"})
        } 
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

async function insertUser(req, res, next) {
    try {
        const {first_name, last_name, gender, role, username, password, phone} = req.body
        if (!first_name || !last_name || !gender || !role || !username || !password || !phone) {
            return res.status(401).json({message: "All fields required!"})
        } 
        const duplicate = await User.findOne({username})
        if (duplicate) res.status(400).json({message: "username taken"})
        const hash = await bcrypt.hash(password, 8)
        const user = await User.create({...req.body, password: hash})
        if (!user) {
            return res.status(400).json({message: "user error"})
        }
        res.status(201).json({message: "User created!"})
    } catch (err) {
        next(err)
    }
}



module.exports = {
     getAll,
     insertUser
}