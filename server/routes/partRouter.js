const router = require("express").Router();
const controller = require("../controllers/partControl");
const { checkToken } = require("../middleware/verifyJWT");
router
  .route("/")
  .get(controller.getParts)
  .post(checkToken, controller.insertPart)
  .patch(checkToken, controller.updatePart);

router.get("/:sku", controller.getPart);

module.exports = router;
