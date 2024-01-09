/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("parts_inv", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .bigInteger("part_id")
        .unsigned()
        .references("id")
        .inTable("part_list");
      tbl.bigInteger("amount").notNullable();
      tbl
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations");
    })
    .createTable("material_inv", (tbl) => {
      tbl.increments("id").primary();
      tbl
        .integer("material_id")
        .unsigned()
        .references("id")
        .inTable("material_list");
      tbl.bigInteger("lbs").notNullable();
      tbl
        .integer("location_id")
        .unsigned()
        .references("id")
        .inTable("locations");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("material_inv")
    .dropTableIfExists("parts_inv");
};
