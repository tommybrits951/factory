require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    const { accessToken } = req.headers.Authorization;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
    const { role } = decoded;
    if (role === "Employee")
      res.status(402).json({ message: "Not Authorized!" });

    next();
  } catch (err) {
    next();
  }
}

module.exports = {
  checkToken
};
