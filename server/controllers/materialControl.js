const Material = require("../models/Material")


async function getAllMats(req, res, next) {
    try {
        const materials = await Material.find().lean()
        if (!materials) res.status(400).json({message: "Couldn't retrieve"})
        res.status(200).json(materials)
    } catch (err) {
        next(err)
    }
} 

async function addMaterial(req, res, next) {
    try {
        const {name, vendor, locations} = req.body
        if (!name || !vendor || !locations?.length) {
            res.status(400).json({message: "all fields required!"})
        }
        const material = await Material.create(req.body)
        if (!material) res.status(400).json({message: "couldn't add material"})
        res.status(201).json({message: "material added"})
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllMats,
    addMaterial
}