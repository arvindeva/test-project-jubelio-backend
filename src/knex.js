// knex config

module.exports = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
