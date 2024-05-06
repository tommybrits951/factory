const fs = require('fs')
const fsPromises = require('fs').promises
const { format } = require('date-fns')
const path = require('path')

async function insertImage (img, filePath) {
  if (!fs.existsSync(path.join(__dirname, '..', 'images', filePath))) {
    await fsPromises.mkdir(path.join(__dirname, '..', 'images', filePath))
  }
  await fsPromises.appendFile(
    path.join(__dirname, '..', 'images', filePath),
    img
  )
}

async function uploadImage (req, res, next) {
  const files = req.files
  const { user_email, user_first_name, user_last_name } = req.body
  const current = new Date().getTime()
  let str = ''
  str += user_email
  str += user_first_name
  str += user_last_name
  str += current.toString()
  str += '.png'
  Object.keys(files).map(key => {
    return insertImage(files[key], str)
  })
  next()
}

module.exports = uploadImage
