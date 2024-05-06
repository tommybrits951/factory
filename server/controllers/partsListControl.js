const Parts = require("../models/Parts");

async function getPartList(req, res, next) {
  try {
    const parts = await Parts.getAllParts();
    if (!parts) {
      return res.status(500).json({ message: "Couldn't get parts list!" });
    }
    res.status(200).json(parts);
  } catch (err) {
    next(err);
  }
}
async function addPartToList(req, res, next) {
  try {
    const part = {...req.body, material_name: undefined,}

    const files = req.files
    if (!part) {}
  } catch (err) {
    next(err)
  }
}


module.exports = {
  getPartList
};
