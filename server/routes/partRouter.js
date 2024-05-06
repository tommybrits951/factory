const router = require('express').Router()
const controller = require('../controllers/partsListControl')
const { checkToken } = require('../middleware/verifyJWT')
const path = require('path')
const multer = require('multer')
const imageController = require('../controllers/imageControl')
const upload = multer({
  dest: path.join(__dirname, '..', 'images')
})
router
  .route('/')
  .get(controller.getPartList)
  .post(upload.single('img'), imageController.storeImage)

module.exports = router
