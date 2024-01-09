/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("vendors", tbl => {
    tbl.increments("id").primary()
    tbl.string("company_name", 100).notNullable()
    tbl.string("street").notNullable()
    tbl.string("city").notNullable()
    tbl.string("province").notNullable()
    tbl.bigInteger("postal").notNullable()
    tbl.bigInteger("phone").notNullable()
    tbl.string("email", 100).notNullable()
    tbl.string("service").notNullable().defaultTo("material")
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("vendors")
};
