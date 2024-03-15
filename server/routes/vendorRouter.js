const router = require("express").Router()
const controller = require("../controllers/vendorControl")

router.route("/")
.get(controller.getAllVendors)
.post(controller.addVendor)

router.get("/:name", controller.getVendor)



module.exports = router