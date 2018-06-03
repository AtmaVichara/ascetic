
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE workout_exercises RESTART IDENTITY")
    .then(function () {
      // Inserts seed entries
      return knex('workout_exercises').insert([
        {workout_id: 1, exercise_id: 1, reps: 0, sets: 0, weight: 0},
        {workout_id: 2, exercise_id: 2, reps: 0, sets: 0, weight: 0},
        {workout_id: 2, exercise_id: 3, reps: 0, sets: 0, weight: 0},
        {workout_id: 1, exercise_id: 4, reps: 0, sets: 0, weight: 0},
      ]);
    });
};
