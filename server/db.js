const path = require('path');
const dbPath = path.resolve(__dirname, 'db/data.sqlite')

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// student table 

knex.select('*').from('student')
  .then(data => console.log('data:', data, 'data length', data.length))
  .catch(err => console.log(err))
knex.schema
  .hasTable('student')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('student', (table) => {
        table.increments('id').primary()
        table.string('idcode')
        table.string('fullname')
        table.string('email')
        table.string('mobilenumber')
        table.string('gender')
        table.string('birthdate')
        table.string('city')
        table.text('notes')
      })
        .then(() => {
          console.log('Table \'student\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
    }
  })
  .then(() => {
    console.log('student is exist')
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`)
  })

module.exports = knex
