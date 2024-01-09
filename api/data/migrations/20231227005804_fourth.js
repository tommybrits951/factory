/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("locations", (tbl) => {
    tbl.increments("id").primary();
    tbl.string("aisle", 1).notNullable();
    tbl.integer("level").notNullable();
    tbl.integer("space").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("locations");
};
