
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE workouts RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('workouts').insert([
        {name: "Some Workout", user_id: 1},
        {name: "Some Workout", user_id: 1}
      ]);
    });
};
