/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('statistic', function (table) {
    table.increments('id')
    table.date('date').defaultTo(knex.fn.now()).notNullable()
    table.integer('calories').notNullable().checkBetween([0, 1000])
    table.time('time')
    table.integer('type_id').unsigned().notNullable();
    table.foreign('type_id').references('id').inTable('types').onDelete('CASCADE').onUpdate('CASCADE')
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
