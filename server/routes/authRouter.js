const router = require('express').Router()
const controller = require('../controllers/authControl')

router.route('/').post(controller.login).get(controller.refreshHandle)

router.get('/check', controller.decodeAccess)

router.get('/logout', controller.logout)

module.exports = router
