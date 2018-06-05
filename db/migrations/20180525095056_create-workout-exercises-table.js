
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workout_exercises', (table) => {
    table.increments('id').primary()
    table.bigInteger('workout_id').unsigned().index().references('id').inTable('workouts').onDelete('cascade');
    table.bigInteger('exercise_id').unsigned().index().references('id').inTable('exercises').onDelete('cascade');
    table.integer('sets')
    table.integer('reps')
    table.integer('weight')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTable('workout_exercises')
};
