const express = require('express')
const router = express.Router()
const Redis = require('../RedisDB/redis_config.js').createClient()

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.get('/:footballer', (req, res) => {
  const footballer = req.params.footballer
  Redis.hgetall(footballer, (err, data) => {
    res.send(data)
  })
})
module.exports = router
