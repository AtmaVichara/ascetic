
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments('id').primary()
    table.bigInteger('exercise_category_id').unsigned().index().references('id').inTable('exercise_categories')
    table.string('name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises')
};
