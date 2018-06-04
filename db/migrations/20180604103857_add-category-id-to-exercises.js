
exports.up = function(knex, Promise) {
  return knex.schema.table("exercises", (table) => {
    table.bigInteger('category_id').unsigned().index().references('id').inTable('exercise_categories')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("exercises", (table) => {
    table.dropColumn("category_id")
  })
};
