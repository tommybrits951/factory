/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("material_list").del();
  for (let i = 1; i <= 75; i++) {
    await knex("material_list").insert([
      {
        id: i,
        name: `material ${i}`,
        vendor_id: i < 26 ? i : Math.floor(i / 3),
        type: "pp",
      },
    ]);
  }
};
