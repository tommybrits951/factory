const router = require('express').Router()
const controller = require('../controllers/jobController')

router.post('/', controller.addJob)

module.exports = router
