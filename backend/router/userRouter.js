const express = require('express')
const router = express.Router()
const userController = require('../controller/user/Authenticaiton')
const Authorization = require('../controller/user/Authorization')

router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.post('/logout', userController.Logout)


module.exports = router