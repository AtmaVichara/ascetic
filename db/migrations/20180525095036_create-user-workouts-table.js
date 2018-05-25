
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_workouts', (table) => {
    table.increments('id').primary()
    table.bigInteger('user_id')
    table.bigInteger('workout_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_workouts')
};
