const db = require("../data/db-config");

function getById(id) {
  const user = db("users").where("id", id).first();
  return user;
}

async function insertUser(user) {
  const id = await db("users").insert(user);
  return id;
}
function getAll() {
  return db("users");
}

module.exports = {
  getById,
  insertUser,
  getAll,
};
