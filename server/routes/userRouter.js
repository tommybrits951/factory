const router = require("express").Router();
const { checkToken } = require("../middleware/verifyJWT");
const controller = require("../controllers/userControl");

router.route("/").post(controller.registerUser).get(controller.getAllUsers);

module.exports = router;
