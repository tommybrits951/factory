const Vendor = require("../models/Vendor");

async function getAllVendors(req, res, next) {
  try {
    const vendors = await Vendor.find().lean();
    if (!vendors) {
      return res.status(400).json({ message: "can't retrieve vendors" });
    }
    res.status(200).json(vendors);
  } catch (err) {
    next(err);
  }
}

async function addVendor(req, res, next) {
  try {
    const { name, street, province, postal, city, phone, email } = req.body;
    if (!name || !street || !province || !postal || !city || !phone || !email) {
      return res.status(400).json({ message: "all fields required" });
    }
    const vendor = await Vendor.create({ ...req.body });
    if (!vendor) {
      return res
        .status(400)
        .json({ message: "couldn't create vendor contact" });
    }
    res.status(201).json({ message: "Vendor added" });
  } catch (err) {
    next(err);
  }
}
async function getVendor(req, res, next) {
  try {
    const { id } = req.params;
    const vendors = await Vendor.find().lean();
    console.log(vendors);
    const vendor = vendors[id];
    if (!vendor) res.status(400).json({ message: "couldn't get vendor" });
    res.status(200).json(vendor);
  } catch (err) {
    next(err);
  }
}

async function updateVendor(req, res, next) {
  try {
    let obj = req.body;
    const companyName = obj.name;
    const vendor = await Vendor.findOneAndUpdate({ name: companyName }, obj);
    console.log(vendor);
    res.json(vendor);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllVendors,
  addVendor,
  getVendor,
  updateVendor
};
