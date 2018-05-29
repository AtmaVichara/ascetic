
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workouts', (table) => {
    table.increments('id').primary()
    table.bigInteger('user_id').unsigned().index().references('id').inTable('users')
    table.string('name')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('workouts')
};
