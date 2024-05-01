/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("roles").insert([
    { id: 1, role: "Employee" },
    { id: 2, role: "Supervisor" },
    { id: 3, role: "Manager" },
    { id: 4, role: "Admin" }
  ]);
};
