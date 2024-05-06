/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('roles', tbl => {
      tbl.increments('role_id').primary()
      tbl.string('role').notNullable()
    })
    .createTable('users', tbl => {
      tbl.bigIncrements('user_id').primary()
      tbl.string('first_name', 50).notNullable()
      tbl.string('last_name', 50).notNullable()
      tbl.string('gender', 20).defaultTo('private')
      tbl.date('dob').notNullable()
      tbl.bigInteger('user_phone').notNullable().unique()
      tbl.bigInteger('user_cell')
      tbl.string('user_street', 200).notNullable()
      tbl.string('user_city').notNullable()
      tbl.string('user_province').defaultTo('CA')
      tbl.bigInteger('user_postal').notNullable()
      tbl.string('user_email')
      tbl.bigInteger('username').notNullable()
      tbl.string('password').notNullable()
      tbl.boolean('active').defaultTo(true)
      tbl.date('hired').notNullable()
      tbl.integer('role_id').unsigned().references('role_id').inTable('roles')
      tbl.string('token')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('roles')
}
