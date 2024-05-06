const router = require('express').Router()
const controller = require('../controllers/imageControl')

router.post('/', controller.storeImage)

module.exports = router
