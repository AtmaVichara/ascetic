
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercise_categories', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercise_categories');
};
