const db = require("../data/db-config");

function getById(id) {
  return db("material_list").where("id", id).first();
}

async function insertMaterial(material) {
  let mat = await db("material_list").insert(material);
  mat = db("material_list").where("name", material.name);
  return mat;
}
function getAll() {
  return db("material_list");
}

module.exports = {
  getById,
  insertMaterial,
  getAll,
};
