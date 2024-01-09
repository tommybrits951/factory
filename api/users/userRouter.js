const router = require("express").Router();
const Users = require("./userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const { checkId, checkPassword, checkUser } = require("./middle");

router.post("/add", checkPassword, checkUser, async (req, res, next) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    const users = await Users.getAll();
    user.id = Math.abs(users.length + 10000 + 1);
    const result = await Users.insertUser(user);
    const newUser = await Users.getById(user.id);
    res.status(201).json({ ...newUser, password: "" });
  } catch (err) {
    next(err);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    role_id: user.role_id,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, secret, options);
}

router.post("/login", async (req, res, next) => {
  try {
    const { id, password } = req;
    const user = await Users.getById(id);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = buildToken(user);
      res.status(200).json({ ...user, token: token, password: "" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number(id) + 10000;
    const user = await Users.getById(id);
    if (user) {
      res.status(200).json({ ...user, password: "" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || "somethings wrong" });
});

module.exports = router;
