// knex config

module.exports =  require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'arvin',
    database: 'jubelio-db',
    charset: 'utf8'
  }
});
