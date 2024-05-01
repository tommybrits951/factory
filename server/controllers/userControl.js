const { format } = require('date-fns')
const Users = require('../models/Users')
const bcrypt = require('bcrypt')

async function registerUser (req, res, next) {
  try {
    const {
      password,
      first_name,
      last_name,
      user_street,
      user_city,
      user_phone,
      user_province,
      user_postal,
      gender,
      dob
    } = req.body
    if (
      !password ||
      !first_name ||
      !last_name ||
      !dob ||
      !gender ||
      !user_street ||
      !user_city ||
      !user_province ||
      !user_postal ||
      !user_phone
    ) {
      res.status(400).json({ message: 'All fields required' })
    }
    const hash = bcrypt.hashSync(password, 10)
    const hired = format(new Date(), 'MM/dd/yyyy HH:mm:ss')

    const userList = await Users.getAll()
    console.log(userList.length)
    const emp_id = Number(userList.length) + 10001
    const obj = { ...req.body, password: hash, hired: hired, username: emp_id }
    console.log(obj)
    const result = await Users.insertUser(obj)

    res.status(201).json(result)
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
