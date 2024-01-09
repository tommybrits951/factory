/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("material_list", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name").notNullable();
      tbl.integer("vendor_id").unsigned().references("id").inTable("vendors");
      tbl.string("type").notNullable().defaultTo("pp");
    })
    .createTable("part_list", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("name", 200).notNullable();
      tbl
        .integer("material_id")
        .unsigned()
        .references("id")
        .inTable("material_list");
      tbl.integer("mold_maker").unsigned().references("id").inTable("vendors");
      tbl.integer("cavities").notNullable();
      tbl.decimal("cycle").notNullable();
      tbl.decimal("shot_ounces").notNullable();
      tbl.decimal("part_ounces").notNullable();
      tbl.string("description");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("part_list")
    .dropTableIfExists("material_list");
};
