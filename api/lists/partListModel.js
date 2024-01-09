const db = require("../data/db-config");

// Part List
async function getAllParts() {
  const partsList = await db("part_list");
  return partsList;
}
function getPartById(id) {
  return db("part_list").where("id", id).first();
}
async function insertPart(part) {
  const [id] = await db("part_list").insert(part);
  const newPart = await getPartById(id);
  return newPart;
}
// Vendor List
async function getAllVendors() {
  const vendors = await db("vendors");
  return vendors;
}
function getVendorById(id) {
  return db("vendors").where("id", id).first();
}
async function insertVendor(vendor) {
  const [id] = await db("vendors").insert(vendor);
  const newVendor = await getVendorById(id);
  return newVendor;
}

// Material List

async function getAllMaterials() {
  return await db("material_list");
}

function getMatById(id) {
  return db("material_list").where("id", id).first();
}
async function insertMat(mat) {
  const [id] = await db("material_list").insert(mat);
  const material = await getMatById(id);
  return material;
}
module.exports = {
  getAllParts,
  getPartById,
  insertPart,
  getAllVendors,
  insertVendor,
  getVendorById,
  getAllMaterials,
  getMatById,
  insertMat,
};
