/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("materials_list", (tbl) => {
      tbl.increments("material_id").primary();
      tbl.string("material_name").notNullable();
      tbl
        .integer("material_vendor_id")
        .unsigned()
        .references("vendor_id")
        .inTable("vendors");
      tbl.string("material_description");
    })
    .createTable("parts_list", (tbl) => {
      tbl.increments("part_id").primary();
      tbl.string("part_name").notNullable();
      tbl.integer("cavities").notNullable();
      tbl.decimal("cycle").notNullable();
      tbl
        .integer("mold_maker_id")
        .unsigned()
        .references("vendor_id")
        .inTable("vendors");
      tbl
        .integer("material_id")
        .unsigned()
        .references("material_id")
        .inTable("materials_list");
      tbl
        .integer("material2_id")
        .unsigned()
        .references("material_id")
        .inTable("materials_list")
        .defaultTo(1);
      tbl.decimal("part_weight");
      tbl.decimal("shot_weight");
      tbl.string("part_description");
      tbl.bigInteger("part_sku").notNullable();
      tbl.bigInteger("mold_number").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("parts_list")
    .dropTableIfExists("materials_list");
};
