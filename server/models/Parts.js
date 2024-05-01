const db = require("../config/dbConnect");

async function getAllParts() {
  const parts = await db("parts_list as p").leftJoin(
    "materials_list as m",
    "p.material_id",
    "m.material_id"
  );
  return parts;
}

module.exports = {
  getAllParts
};
