const path = require('path');
const dbPath = path.resolve(__dirname, 'db/data.sqlite')

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true
  })

  knex.schema
  .hasTable('users')
    .then((exists) => {
      if (!exists) {
        return knex.schema.createTable('users', (table)  => {
          table.increments('id').primary()
          table.string('idcode')
          table.string('title')
          table.text('description')
        })
        .then(() => {
          console.log('Table \'users\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      console.log('users is exist')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

knex.select('*').from('users')
  .then(data => console.log('data:', data,'data length', data.length))
  .catch(err => console.log(err))

module.exports = knex
