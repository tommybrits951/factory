const Users = require('../models/Users')
const bcrypt = require('bcrypt')

async function registerUser (req, res, next) {
  try {
    const user = req.body

    const hash = await bcrypt.hash(user.password, 8)

    const users = await Users.getAll()

    const hired = new Date()

    const username = Math.abs(users.length + 10001)

    const result = await Users.insertUser({
      ...user,
      role_id: Number(user.role_id),
      user_postal: Number(user.user_postal),
      user_phone: Number(user.user_phone),
      password: hash,
      username: Number(username),
      hired: hired
    })
    console.log(result)
    if (!result) {
      return res
        .status(400)
        .json({ message: "Something's wrong with info provided!" })
    }
    res.status(201).json({
      message: `Login for ${result.first_name} ${result.last_name} created!`
    })
  } catch (err) {
    next(err)
  }
}
async function getAllUsers (req, res, next) {
  try {
    const users = await Users.getAll()
    if (!users) {
      return res
        .status(500)
        .json({ message: "Something's wrong with the server!" })
    }
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  registerUser,
  getAllUsers
}
