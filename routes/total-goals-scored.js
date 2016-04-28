const express = require('express')
const router = express.Router()
const Redis = require('../redis/redis_config.js').createClient()


module.exports = router
