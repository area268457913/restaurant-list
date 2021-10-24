const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
router.use('/restaurants', restaurants)
router.use('/', home)
router.use('/users', users)
module.exports = router