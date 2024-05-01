/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("materials_list").del();
  await knex("materials_list").insert([
    { material_id: 1, material_name: "none", material_vendor_id: 2 },
    {
      material_id: 2,
      material_name: "Dexflex 360 black",
      material_vendor_id: 2
    },
    { material_id: 3, material_name: "Dexflex 250 grey", material_vendor_id: 2 }
  ]);
};
