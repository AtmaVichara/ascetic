
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises')
};
