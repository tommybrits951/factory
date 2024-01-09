const Vendor = require("./vendorModel");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const vendors = await Vendor.getVendors();
    if (vendors) {
      res.status(200).json(vendors);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const vendor = req.body;
    const newVendor = await Vendor.insertVendor(vendor);
    res.status(201).json(newVendor);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendor = await Vendor.getById(id);
    res.status(200).json(vendor);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
