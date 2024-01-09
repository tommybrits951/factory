const db = require("../data/db-config");

async function getVendors() {
  const vendors = await db("vendors");
  return vendors;
}
function getVendorByName(name) {
  return db("vendors").where("company_name", name).first();
}

async function insertVendor(vendor) {
  let id = await db("vendors").insert(vendor);
  id = await getVendorByName(vendor.company_name);
  return id;
}
function getById(id) {
  return db("vendors").where("id", id).first();
}

module.exports = {
  getVendors,
  getVendorByName,
  insertVendor,
  getById,
};
