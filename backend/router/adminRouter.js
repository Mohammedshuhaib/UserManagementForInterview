const express = require('express')
const router = express.Router()
const adminController = require('../controller/admin/Authentication')
const Authorization = require('../controller/admin/Authorization')


router.post('/login', adminController.Login)
router.post('/logout', adminController.Logout)
router.get('/getData', adminController.getData)

module.exports = router