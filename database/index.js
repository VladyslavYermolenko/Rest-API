// const { Pool } = require('pg');

// const pool = new Pool({
//     host: '127.0.0.1',
//     port: 5432,
//     user: 'todolist_app',
//     password: 'secret',
//     database: 'tasklistsdb',
    
//     max: 10,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 5000
// });

// pool.connect();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'todolist_app',
      password : 'secret',
      database : 'tasklistsdb'
    },
    pool: {
        max: 10,
        // idleTimeoutMillis: 30000,
        // connectionTimeoutMillis: 5000
    }
  });

module.exports = knex;