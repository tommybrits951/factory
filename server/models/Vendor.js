const db = require("../config/dbConnect");

async function getAllVendors() {
  return await db("vendors");
}

async function getVendorById(id) {
  const vendor = await db("vendors").where("vendor_id", id).first();
  return vendor;
}

async function insertVendor(vendor) {
  let vendor_id = await db("vendors").insert(vendor).returning("vendor_id");
  console.log(vendor_id);

  const result = getVendorById({ vendor_id });
  return result;
}

module.exports = {
  getAllVendors,
  insertVendor,
  getVendorById
};
