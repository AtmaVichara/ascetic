
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workout_exercises', (table) => {
    table.increments('id').primary()
    table.bigInteger('workout_id')
    table.bigInteger('exercise_id')
    table.integer('sets')
    table.integer('reps')
    table.integer('weight')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('workout_exercises')
};
