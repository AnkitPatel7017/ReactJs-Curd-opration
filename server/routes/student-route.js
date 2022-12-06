const express = require('express')
const router = express.Router()

const studentRoutes = require('../controllers/student')
router.get('/studentall', studentRoutes.studentAll)
router.post('/studentcreate', studentRoutes.studentCreate)
router.post('/studentupdate', studentRoutes.studentUpdate)
router.post('/studentdelete', studentRoutes.studentDelete)

module.exports = router