/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("vendors", (tbl) => {
    tbl.increments("vendor_id").primary();
    tbl.string("vendor_name").notNullable();
    tbl.string("vendor_street", 100).notNullable();
    tbl.string("vendor_city", 200).notNullable();
    tbl.bigInteger("vendor_postal").notNullable();
    tbl.string("vendor_province").notNullable();
    tbl.string("vendor_country").defaultTo("United States");
    tbl.bigInteger("vendor_phone").notNullable();
    tbl.bigInteger("vendor_phone2");
    tbl.string("vendor_email").notNullable();
    tbl.string("vendor_product").defaultTo("material");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("vendors");
};
