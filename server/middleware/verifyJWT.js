require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    const { accessToken } = req.headers.Authorization;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    const { role_id } = decoded;

    if (role_id === "Employee" || role_id === "Supervisor") {
      return res.status(402).json({ message: "Not Authorized!" });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkToken
};
