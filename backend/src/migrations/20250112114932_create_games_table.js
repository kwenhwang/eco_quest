// migrations/20250112114932_create_games_table.js
exports.up = function (knex) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('mapWidth').nullable();
    table.integer('mapHeight').nullable();
    table.string('gameMode').nullable();
    table.integer('maxPlayers').nullable();
    table.float('pollution_level').defaultTo(0); // 오염도
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('games');
};

// migrations/20250113000001_create_game_players_table.js
exports.up = function (knex) {
  return knex.schema.createTable('game_players', function (table) {
    table.increments('id').primary();
    table.integer('game_id').unsigned().notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    
    // FK 설정
    table.foreign('game_id')
      .references('games.id')
      .onDelete('CASCADE');
    table.foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE');

    // 복합 인덱스 추가 (선택사항: 성능 최적화를 위해)
    table.unique(['game_id', 'user_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('game_players');
};
