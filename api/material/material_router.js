const router = require("express").Router();
const Mat = require("./material_model");
router.post("/add", async (req, res, next) => {
  try {
    const mat = req.body;
    const material = await Mat.insertMaterial(mat);
    res.status(201).json(material);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const mats = await Mat.getAll();
    if (mats) {
      res.status(200).json(mats);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
