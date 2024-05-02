/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('parts_list').del()
  await knex('parts_list').insert([
    {
      part_id: 1,
      part_name: '2 pin female',
      cavities: 12,
      cycle: 76.5,
      material_id: 2,
      material2_id: 1,
      part_weight: 5,
      shot_weight: 70,
      part_sku: 10001,
      mold_number: 202
    },
    {
      part_id: 2,
      part_name: '2 pin male',
      cavities: 6,
      cycle: 90.6,
      material_id: 3,
      material2_id: 1,
      part_weight: 5,
      shot_weight: 70,
      part_sku: 10002,
      mold_number: 203
    },
    {
      part_id: 3,
      part_name: 'three pi female',
      cavities: 10,
      cycle: 125.3,
      material_id: 2,
      material2_id: 1,
      part_weight: 5,
      shot_weight: 70,
      part_sku: 10003,
      mold_number: 204
    }
  ])
}
