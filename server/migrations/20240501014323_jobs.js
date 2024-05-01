/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('jobs', tbl => {
    tbl.bigIncrements('job_id').primary()
    tbl
      .integer('part_id')
      .unsigned()
      .references('part_id')
      .inTable('parts_list')
    tbl.bigInteger('job_amount').notNullable()
    tbl.boolean('active').defaultTo(true)
    tbl.dateTime('start_date')
    tbl.dateTime('end_date')
    tbl.dateTime('job_added_date').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('jobs')
}
