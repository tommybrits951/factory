/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("roles").insert([
    {
      id: 1,
      role: "floor",
    },
    { id: 2, role: "shipping" },
    { id: 3, role: "lead" },
    { id: 4, role: "manager" },
    { id: 5, role: "maintain" },
    { id: 6, role: "admin" },
    { id: 7, role: "hr" },
  ]);
};
