const Image = require('../models/Image')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

async function storeImage (req, res, next) {
  try {
    let file = req.files.img
    console.log(file)
    let current = new Date().getTime()
    file.name = `img${current}`
    let x = await fsPromises.readFile(file, { encoding: '7bit' })
    console.log(x)
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'images', `${file.name}`),
      x
    )
    console.log(result)
  } catch (err) {
    next(err)
  }
}
module.exports = {
  storeImage
}
