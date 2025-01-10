/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("records", function (table) {
    table.increments('id')
    table.string("exercise", 255).notNullable();
    table.integer('record').notNullable()
    table.date('date').defaultTo(knex.raw("CURRENT_DATE")).notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('records');
};
