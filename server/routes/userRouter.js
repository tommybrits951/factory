const router = require("express").Router()
const {checkToken} = require("../middleware/verifyJWT")
const controller = require("../controllers/userControl")


router.route("/").get(controller.getAll).post(checkToken, controller.insertUser)


module.exports = router