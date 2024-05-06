const db = require('../config/dbConnect')

async function getByPartId (part_id) {
  const images = await db('image_paths').where('part_id', part_id)
  return images
}

async function insertImage (image) {
  const result = await db('image_paths')
    .insert(image)
    .returning('image_id', 'image_path', 'part_id')
  return result
}

module.exports = {
  getByPartId,
  insertImage
}
