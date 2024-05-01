const router = require("express").Router();
const controller = require("../controllers/partsListControl");
const { checkToken } = require("../middleware/verifyJWT");
router.route("/").get(controller.getPartList);

module.exports = router;
