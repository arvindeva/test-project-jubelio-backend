module.exports = {
  development: {
    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'arvin',
      database: 'jubelio-db',
      charset: 'utf8'
    }
  }
};
