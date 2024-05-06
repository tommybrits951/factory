const router = require('express').Router()
const { checkToken } = require('../middleware/verifyJWT')
const controller = require('../controllers/userControl')
const uploadImage = require('../middleware/imageUpload')
router.route('/').post(controller.registerUser).get(controller.getAllUsers)

module.exports = router
