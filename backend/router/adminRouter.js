const express = require('express')
const router = express.Router()
const userController = require('../controller/user/Authenticaiton')
const Authorization = require('../controller/user/Authorization')



module.exports = router