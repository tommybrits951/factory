require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { logEvent } = require("../middleware/logger");
const Users = require("../models/Users");
const refreshSecret = process.env.REFRESH_SECRET;
const accessSecret = process.env.ACCESS_SECRET;

function buildRefresh(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, refreshSecret, options);
}

function buildAccess(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, accessSecret, options);
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) {
      return res.status(400).json({ message: "username password required" });
    }

    const user = await Users.getUserByUsername(username);
    console.log(user);
    const match = await bcrypt.compare(password, user.password);

    if (!match || !user) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }
    const refreshToken = buildRefresh(user);
    const accessToken = buildAccess(user);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 24 * 1000
    });
    res.status(200).json({ accessToken });
    logEvent(
      `${user.username}\t${user.first_name}${user.last_name}\t${user.role}\t${req.headers.origin}\t${req.url}`,
      "loginLog.log"
    );
  } catch (err) {
    next(err);
  }
}

async function refreshHandle(req, res, next) {
  try {
    const refreshToken = req.cookies.jwt;
    if (!refreshToken) res.status(401);
    console.log(refreshToken);
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    console.log(decoded);
    const user = await User.find({ username: decoded.username });
    const accessToken = buildAccess(user);
    res.status(200).json(accessToken);
  } catch (err) {
    next(err);
  }
}

async function decodeAccess(req, res, next) {
  try {
    const token = req.headers.Authorization;
    const decoded = jwt.decode(token, process.env.ACCESS_SECRET);
    if (!token) {
      const refreshToken = req.cookies.jwt
      const verified = jwt.verify(refreshToken, refreshSecret)
      if (!refreshToken || !verified) {
        return res.status(401).json({message: "Not Authorized!"})
      }
      const decoded = jwt.decode(refreshToken)
      const {username} = decoded
      const user = await Users.getUserByUsername(username)
      const accessToken = buildAccess(user)
      if (!accessToken) {
        return res.status(400).json({message: "couldn't get token"})
      }
      res.status(200).json(accessToken)
    }
    res.json(decoded.role);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const cookies = req.cookies;
    console.log(req.cookies.jwt);
    if (!cookies?.jwt) {
      return res.status(204).json({ message: "something's wrong" });
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "cookie cleared", token: null });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  logout,
  refreshHandle,
  buildAccess,
  buildRefresh,
  decodeAccess
};
