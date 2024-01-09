/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("locations").del();
  for (let i = 0; i < letters.length; i++) {
    for (let x = 1; x <= 5; x++) {
      for (let j = 1; j <= 26; j++) {
        await knex("locations").insert([
          { aisle: letters[i], level: x, space: j },
        ]);
      }
    }
  }
};
