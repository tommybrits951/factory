const router = require("express").Router()
const controller = require("../controllers/authControl")

router.route("/").post(controller.login).get(controller.checkCookie)

module.exports = router