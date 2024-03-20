const router = require("express").Router();
const controller = require("../controllers/vendorControl");
const { checkToken } = require("../middleware/verifyJWT");
router
  .route("/")
  .get(controller.getAllVendors)
  .post(checkToken, controller.addVendor)
  .patch(checkToken, controller.updateVendor);

router.get("/:id", controller.getVendor);

module.exports = router;
