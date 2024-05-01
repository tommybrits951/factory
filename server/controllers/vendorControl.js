const Vendor = require("../models/Vendor");

async function getAll(req, res, next) {
  try {
    const vendors = await Vendor.getAllVendors();
    if (!vendors) {
      return res
        .status(400)
        .json({ message: "Couldn't retrieve vendors list." });
    }
    res.status(200).json(vendors);
  } catch (err) {
    next(err);
  }
}

async function addVendor(req, res, next) {
  try {
    const {
      vendor_name,
      vendor_street,
      vendor_city,
      vendor_postal,
      vendor_province,
      vendor_phone,
      vendor_email
    } = req.body;
    const vendor = req.body;
    if (
      !vendor_name ||
      !vendor_street ||
      !vendor_city ||
      !vendor_postal ||
      !vendor_province ||
      !vendor_phone ||
      !vendor_email
    ) {
      return res.status(400).json({ message: "All fields required!" });
    } else if (String(vendor_phone).length !== 10) {
      return res
        .status(400)
        .json({ message: "Vendor phone must be 10 characters!" });
    } else if (String(vendor_postal).length !== 5) {
      return res
        .status(400)
        .json({ message: "Vendor postal code must be 5 characters!" });
    }
    const result = await Vendor.insertVendor(vendor);
    res.status(201).json({ message: `Vendor ${result.vendor_name} added!` });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  getAll,
  addVendor
};
