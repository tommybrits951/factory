const router = require("express").Router();
const Lists = require("./partListModel");

router.get("/list", async (req, res, next) => {
  try {
    const partsList = await Lists.getAllParts();
    if (partsList) {
      res.status(200).json(partsList);
    } else {
      res.status(404).json({ messgae: "not found" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const part = await Lists.getPartById(id);
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
});

router.get("/ven", async (req, res, next) => {
  try {
    const vendors = await Lists.getAllVendors();
    res.status(200).json(vendors);
  } catch (err) {
    next(err);
  }
});
router.post("/vendor", async (req, res, next) => {
  try {
    const vendor = req.body;
    const newVendor = await Lists.insertVendor(vendor);
    if (newVendor) {
      res.status(201).json(newVendor);
    } else {
      res.status(400).json({ message: "mistake somewhere" });
    }
  } catch (err) {
    next(err);
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const part = req.body;
    const newPart = await Lists.insertPart(part);
    if (newPart) {
      res.status(201).json(newPart);
    } else {
      res.status(400).json({ message: "mistake somewhere" });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "couldn't get parts list" });
});

module.exports = router;
