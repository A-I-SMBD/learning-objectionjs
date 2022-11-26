import { Knex } from 'knex';

export const up = async (knex: Knex<any, unknown[]>) => {
  if (await knex.schema.hasTable('users')) {
    return;
  }

  return knex.schema.createTable('users', table => {
    table.uuid('id').primary();
    table.string('username');
    table.string('password');
  });
};

export const down = async (knex: Knex<any, unknown[]>) => {
  return knex.schema.dropTableIfExists('users');
};
