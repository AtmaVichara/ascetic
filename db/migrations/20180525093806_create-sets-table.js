
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sets', (table) => {
    table.increments('id').primary()
    table.bigInteger('exercise_id').unsigned().index().references('id').inTable('exercises')
    table.integer('quantity')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sets')
};
