const knex = require('../db')
// const knex = require('./../mysqldb')


exports.studentAll = async (req, res) => {
  // Get all student from database
  knex
    .select('*') // select all records
    .from('student') // from 'student' table
    .then(studentData => {
      // Send student extracted from database in response
      res.json({ data: studentData })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving student: ${err}` })
    })
}

exports.studentCreate = async (req, res) => {
  // Add new book to database
  console.log(req.body.idcode);
  knex('student')
    .insert({ // insert new record, a book
      'idcode': req.body.idcode,
      'fullname': req.body.fullname,
      'email': req.body.email,
      'mobilenumber': req.body.mobilenumber,
      'gender': req.body.gender,
      'birthdate': req.body.birthdate,
      'city': req.body.city,
      'notes': req.body.notes,
    })
    .then(() => {
      // Send a success message in response
      res.json({ data: `user \'${req.body.fullname}\' by ${req.body.email} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.fullname} user: ${err}` })
    })
}

exports.studentUpdate = async (req, res) => {
  if (req.body.idcode === "") {
    res.json({ message: 'idcode is required' })
    return false
  }
  if (req.body.fullname === "") {
    res.json({ message: 'fullname is required' })
    return false
  }
  if (req.body.email === "") {
    res.json({ message: 'email is required' })
    return false
  }
  if (req.body.mobilenumber === "") {
    res.json({ message: 'mobilenumber is required' })
    return false
  }
  if (req.body.gender === "") {
    res.json({ message: 'gender is required' })
    return false
  }
  if (req.body.birthdate === "") {
    res.json({ message: 'birthdate is required' })
    return false
  }
  if (req.body.city === "") {
    res.json({ message: 'city is required' })
    return false
  }
  if (req.body.notes === "") {
    res.json({ message: 'notes is required' })
    return false
  }

  // Find specific book in the database and remove it
  knex('student')
    .where('idcode', req.body.idcode) // find correct record based on id
    .update({
      'fullname': req.body.fullname,
      'email': req.body.email,
      'mobilenumber': req.body.mobilenumber,
      'gender': req.body.gender,
      'birthdate': req.body.birthdate,
      'city': req.body.city,
      'notes': req.body.notes,
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

exports.studentDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('student')
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
