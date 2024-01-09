/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("material_inv").del();
  for (let i = 1; i <= 30; i++) {
    await knex("material_inv").insert([
      {
        material_id: i < 15 ? 2 : 4,
        lbs: 4000,
        location_id: i > 26 ? i : i + 130,
      },
    ]);
  }
};
