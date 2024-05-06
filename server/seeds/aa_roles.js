/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { role_id: 1, role: 'Employee' },
    { role_id: 2, role: 'Supervisor' },
    { role_id: 3, role: 'Manager' },
    { role_id: 4, role: 'Admin' }
  ])
}
