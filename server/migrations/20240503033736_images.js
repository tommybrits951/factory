/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('image_paths', tbl => {
    tbl.increments('image_id').primary()
    tbl.string('image_path').notNullable()
    tbl
      .integer('part_id')
      .unsigned()
      .references('part_id')
      .inTable('parts_list')
  })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('image_paths')
}
