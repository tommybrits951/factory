const router = require("express").Router();
const controller = require("../controllers/vendorControl");
const { checkToken } = require("../middleware/verifyJWT");
router.route("/").get(controller.getAll).post(controller.addVendor);

module.exports = router;
