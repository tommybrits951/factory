/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (tbl) => {
      tbl.increments("id").primary();
      tbl.string("role").notNullable();
    })
    .createTable("users", (tbl) => {
      tbl.increments("id").primary(100);
      tbl.string("first_name").notNullable();
      tbl.string("last_name").notNullable();
      tbl.string("suffix");
      tbl.string("gender").notNullable();
      tbl.date("dob").notNullable();
      tbl.string("street").notNullable();
      tbl.string("city").notNullable();
      tbl.string("province").notNullable().defaultTo("CA");
      tbl.bigInteger("postal").notNullable();
      tbl.bigInteger("phone").notNullable();
      tbl.bigInteger("cell");
      tbl.bigInteger("ssn").notNullable();
      tbl.string("dlNumber").notNullable();
      tbl.string("dlState").notNullable().defaultTo("CA");
      tbl.string("email");
      tbl.integer("role").unsigned().references("id").inTable("roles");
      tbl.string("password").notNullable();
      tbl.string("confirm").defaultTo(null);
      tbl.date("hire").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("roles");
};
