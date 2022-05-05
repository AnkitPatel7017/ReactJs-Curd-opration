const express = require('express')
const router = express.Router()



const usersRoutes = require('./../controllers/userinformation')


router.get('/usersall', usersRoutes.usersAll)
router.post('/userscreate', usersRoutes.usersCreate)
router.post('/usersupdate', usersRoutes.usersUpdate)
router.post('/usersdelete', usersRoutes.usersDelete)
router.post('/getusersbyidcode', usersRoutes.getUsersByIdCode)
router.post('/getusersbytitle', usersRoutes.getUsersByTitle)



module.exports = router