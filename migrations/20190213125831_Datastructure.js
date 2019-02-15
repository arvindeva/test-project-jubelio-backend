exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', itemsTable => {
    // Primary Key
    itemsTable.increments();

    // Data
    itemsTable.string('name').notNullable();
    itemsTable.string('description').notNullable();
    itemsTable.integer('price').notNullable();
    itemsTable.string('image_url').notNullable();
    itemsTable.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('items');
};
