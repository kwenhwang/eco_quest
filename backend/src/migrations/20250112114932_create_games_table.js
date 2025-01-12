/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('games', table => {
      table.increments('id').primary();
      table.string('name').nullable();
      table.integer('mapWidth').nullable();
      table.integer('mapHeight').nullable();
      table.string('gameMode').nullable();
      table.integer('maxPlayers').nullable();
      table.integer('pollution_level').defaultTo(0);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('games');
  };