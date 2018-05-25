
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exercise_categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('exercise_categories').insert([
        {name: 'abs'},
        {name: 'adductors'},
        {name: 'abductors'},
        {name: 'lower back'},
        {name: 'middle back'},
        {name: 'lats'},
        {name: 'triceps'},
        {name: 'biceps'},
        {name: 'abs'},
        {name: 'shoulders'},
        {name: 'hamstrings'},
        {name: 'chest'},
        {name: 'calves'},
        {name: 'quadriceps'},
        {name: 'forearms'},
        {name: 'traps'},
        {name: 'glutes'}
      ]);
    });
};
