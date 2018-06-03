
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('workout_exercises').del()
    .then(function () {
      // Inserts seed entries
      return knex('workout_exercises').insert([
        {workout_id: 1, exercise_id: 1, reps: 0, sets: 0, weight: 0},
      ]);
    });
};
