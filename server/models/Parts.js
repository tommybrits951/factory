const db = require('../config/dbConnect')

async function getAllParts () {
  const parts = await db('parts_list as p').leftJoin(
    'materials_list as m',
    'p.material_id',
    'm.material_id'
  )
  return parts
}
async function getById (part_id) {
  const part = await db('parts_list as p')
    .leftJoin('materials_list as m', 'p.material_id', 'm.material_id')
    .where('p.part_id', part_id)
    .first()
  return part
}
async function insertPart (part) {
  let results = await db('parts_list').insert(part).returning('part_id')
  return results
}
async function insertMaterial (material) {
  const result = await db('materials_list')
    .insert(material)
    .returning('material_id')
  return result
}
async function getMatById (material_id) {
  const result = await db('materials_list')
    .where('material_id', material_id)
    .first()
  return result
}
module.exports = {
  getAllParts,
  getById,
  insertPart,
  getMatById,
  insertMaterial
}
