
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reps', (table) => {
    table.increments('id').primary()
    table.bigInteger('sets_id').unsigned().index().references('id').inTable('sets')
    table.integer('amount')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reps')
};
