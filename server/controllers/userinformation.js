const knex = require('./../db')
// const knex = require('./../mysqldb')


exports.usersAll = async (req, res) => {
    // Get all users from database
    knex
      .select('*') // select all records
      .from('users') // from 'users' table
      .then(userData => {
        // Send users extracted from database in response
        res.json({data : userData})
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving users: ${err}` })
      })
  }

  exports.usersCreate = async (req, res) => {
    // Add new book to database
    console.log(req.body.idcode);
    knex('users')
      .insert({ // insert new record, a book
        'idcode':req.body.idcode,
        'title': req.body.title,
        'description': req.body.description,
      })
      .then(() => {
        // Send a success message in response
        res.json({ data: `user \'${req.body.title}\' by ${req.body.email} created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.name} user: ${err}` })
      })
  }

  exports.usersUpdate = async (req, res) => {
    if(req.body.idcode === ""){
      res.json({message:'idcode is required'})
      return false
    }
    if(req.body.title === ""){
      res.json({message:'title is required'})
      return false
    }
    if(req.body.description === ""){
      res.json({message:'description is required'})
      return false
    }
    
    // Find specific book in the database and remove it
    knex('users')
      .where('idcode', req.body.idcode) // find correct record based on id
      .update({
        'title': req.body.title,
        'description': req.body.description,
      }) // update the record
      .then(() => {
        // Send a success message in response
        res.json({ data: `User ${req.body.idcode} update.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.idcode} user: ${err}` })
      })
  }

  exports.usersDelete = async (req, res) => {
    // Find specific book in the database and remove it
    knex('users')
      .where('idcode', req.body.idcode) // find correct record based on id
      .del() // delete the record
      .then(() => {
        // Send a success message in response
        res.json({ data: `User ${req.body.idcode} deleted.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error deleting ${req.body.id} user: ${err}` })
      })
  }

  exports.getUsersByIdCode = async (req, res) => {
    // console.log(req.body.idcode);
    knex('users').where(
      'idcode', 'like', `%${req.body.idcode}%`
    ).select('*')
      .then(usersData => {
        res.json({ data: usersData })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.idcode} users: ${err}` })
      })
  }

  exports.getUsersByTitle = async (req, res) => {
    // console.log(req.body.idcode);
    knex('users').where(
      'title', 'like', `%${req.body.title}%`
    ).select('*')
      .then(usersData => {
        res.json({ data: usersData })
      })
      .catch(err => {
        res.json({ message: `There was an error creating ${req.body.idcode} users: ${err}` })
      })
  }

