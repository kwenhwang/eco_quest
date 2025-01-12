// 20250112103833_initial_schema.js
exports.up = function (knex) {
    return knex.schema
      .createTable('users', function (table) {
        table.increments('id').primary();  // user_id에서 id로 변경
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.string('email', 255);
        table.string('nickname', 255);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('provider', 50);
        table.string('provider_id', 255);
        // 인덱스
        table.unique('username');
        table.unique('email');
      })
      .createTable('games', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('mapWidth').nullable();
        table.integer('mapHeight').nullable();
        table.string('gameMode').nullable();
        table.integer('maxPlayers').nullable();
        table.float('pollution_level').defaultTo(0);
        table.timestamps(true, true);
      })
      .createTable('game_players', function (table) {
        table.increments('id').primary();
        table.integer('game_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.timestamp('joined_at').defaultTo(knex.fn.now());
        
        table.foreign('game_id').references('games.id').onDelete('CASCADE');
        table.foreign('user_id').references('users.id').onDelete('CASCADE'); // users.user_id에서 users.id로 변경
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTable('game_players')
      .dropTable('games')
      .dropTable('users');
  };
