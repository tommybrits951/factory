const router = require("express").Router()
const verifyToken = require("../middleware/verifyToken")
const controller = require("../controllers/userControl")


router.route("/").get(controller.getAll).post(verifyToken.checkAccess, controller.insertUser)


module.exports = router