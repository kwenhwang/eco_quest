/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('user_id').primary();  // serial4 타입의 PK
      table.string('username', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('email', 255);  // not null이 아님
      table.string('nickname', 255);
      table.timestamp('created_at').defaultTo(knex.fn.now());  // timestamptz 대신 timestamp 사용
      table.string('provider', 50);
      table.string('provider_id', 255);
  
      // 인덱스 추가 (선택사항)
      table.unique('username');
      table.unique('email');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
