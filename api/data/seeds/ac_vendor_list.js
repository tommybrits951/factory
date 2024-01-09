/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("vendors").del();
  for (let i = 1; i <= 50; i++) {
    await knex("vendors").insert([
      {
        company_name: `vendor ${i}`,
        street: `${i * 100} vendor way.`,
        city: "vendor city",
        province: "CA",
        postal: 92500 + i,
        phone: 9995554444,
        email: `vendor${i}@vendor.com`,
        service: `${i < 26 ? "material" : "molds"}`,
      },
    ]);
  }
};
