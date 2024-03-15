const router = require("express").Router()
const controller = require("../controllers/partControl")

router.route("/").get(controller.getParts).post(controller.insertPart)

router.get("/:sku", controller.getPart)

module.exports = router