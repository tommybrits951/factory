const Part = require("../models/Part");

async function insertPart(req, res, next) {
  try {
    const { name, cavities, cycle_time, materials, weight } = req.body;
    if (!name || !cavities || !cycle_time || !materials || !weight) {
      return res.status(400).json({ message: "All fields required!" });
    }
    const parts = await Part.find().lean();
    const sku = parts.length + 10001;
    const part = await Part.create({ ...req.body, sku });
    if (!part) {
      return res
        .status(401)
        .json({ message: "What da fuck happin to the part?" });
    }
    res.status(201).json({ message: "Part add to list." });
  } catch (err) {
    next(err);
  }
}

async function getParts(req, res, next) {
  try {
    const parts = await Part.find().lean();
    if (!parts) {
      return res.status(401).json({ message: "Parts not found" });
    }
    res.status(200).json(parts);
  } catch (err) {
    next(err);
  }
}

async function getPart(req, res, next) {
  try {
    const { sku } = req.params;
    const part = await Part.findOne({ sku });
    if (!part) {
      return res.status(401).json({ message: "Not found" });
    }
    res.status(200).json(part);
  } catch (err) {
    next(err);
  }
}
async function updatePart(req, res, next) {
  try {
    const { sku } = req.body;
    const part = await Part.findByIdAndUpdate({ sku }, req.body);
    if (!part) {
      return res.status(400).json({ message: "user error" });
    }
    res.status(201).json({ message: "Part Updated" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  insertPart,
  getParts,
  getPart,
  updatePart
};
