const express = require('express')
const router = express.Router()
const Redis = require('../RedisDB/redis_config.js').createClient()

router.get('/', (req, res) => {
  res.send('Hello World')
})

router.get('/:footballer', (req, res) => {
  const footballer = req.params.footballer
  Redis.hgetall(footballer, (err, data) => {
    if (err) { return res.status(400).send('No data') }
    else { res.send(data) }
  })
})

router.post('/footballer', (req, res) => {
  const keyName = req.body.name.toLowerCase()
  const footballer = req.body.name
  const footballerData = JSON.stringify(req.body)
  Redis.scan('0', (err, data) => {
    if (err) { return res.status(400).res.send(err) }
    const list = data[1]
    const check = list.filter( key => key === footballer.toLowerCase())[0]
    if (check){
      res.status(200).send(footballer + ' is already in the database')
    } else {
      Redis.HMSET(keyName, { footballerData })
      res.status(200).send(footballer + ' is in the DB')
    }
  })
})

module.exports = router
