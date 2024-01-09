const User = require("./userModel");

function checkPassword(req, res, next) {
  let { password } = req.body;
  password = password.trim();
  if (password.length < 6) {
    res.status(400).json({ message: "Password must be 6 characters long!" });
  } else {
    req.body.password = password;
    next();
  }
}

function checkId(req, res, next) {
  let { emp_id } = req.body;
  let id = emp_id.trim();
  if (id <= 10000 || id > 99999) {
    res.status(400).json({ message: "Employee Id has to be 5 digits!" });
  } else {
    req.body.id = id;
    next();
  }
}
function checkUser(req, res, next) {
  let user = req.body;
  if (!user.first_name || user.first_name.trim() === "") {
    res.status(401).json({ message: "First name missing" });
  } else if (!user.last_name || user.last_name.trim() === "") {
    res.status(401).json({ message: "Last name missing" });
  } else if (!user.postal || user.postal.length !== 5) {
    res.status(401).json({ message: "Invalid Postal Code!" });
  } else {
    next();
  }
}
module.exports = {
  checkId,
  checkPassword,
  checkUser,
};
