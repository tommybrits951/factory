const db = require('../config/dbConnect')

const selection = [
  'u.id',
  'u.first_name',
  'u.last_name',
  'u.gender',
  'u.dob',
  'u.phone',
  'u.cell',
  'u.street',
  'u.city',
  'u.province',
  'u.postal',
  'u.email',
  'u.username',
  'u.active',
  'u.hired',
  'r.role',
  'u.token'
]
const loginSelection = [
  'u.id',
  'u.first_name',
  'u.last_name',
  'u.gender',
  'u.dob',
  'u.phone',
  'u.cell',
  'u.street',
  'u.city',
  'u.province',
  'u.postal',
  'u.email',
  'u.username',
  'u.active',
  'u.hired',
  'r.role',
  'u.password'
]
async function getAll () {
  return await db('users')
}

async function getUserById (id) {
  const user = await db('users').where('id', id).first()
  return user
}
async function getUserByUsername (username) {
  const user = await db('users as u')
    .leftJoin('roles as r', 'u.role_id', 'r.id')
    .where('u.username', username)
    .first()
  return user
}
async function insertUser (user) {
  const { username } = user
  await db('users').insert(user)
  let newUser = await db('users').where('username', username).first()
  newUser = { ...newUser, password: undefined }
  return newUser
}

module.exports = {
  getAll,
  getUserById,
  getUserByUsername,
  insertUser
}
