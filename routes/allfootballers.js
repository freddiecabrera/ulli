const express = require('express');
const router = express.Router();
const Redis = require('../redis/redis_config.js').createClient();
const objectAssign = require('object-assign')

router.get('/:allfootballers', (req, res) => {
  const key = req.params.allfootballers.toLowerCase();
  Redis.HGETALL(key, (err,data) => {
    if (err) return res.status(400).send(err);
    else data ? res.status(200).send(data.footballersdata) : res.status(202).send('Data not in the DB');
  });
});

router.post('/allfootballers', (req, res) => {
  const footballersdata = JSON.stringify(req.body)
  Redis.HMSET('allfootballers', { footballersdata }, (err, data) => {
    err ? res.status(400).send(err) : res.status(200).json(req.body)
  });
});

router.post('/addplayer', (req, res) => {
  const keyName = 'allfootballers';
  const playerKey = req.body.player;
  const footballerData = req.body.data;
  Redis.HGETALL(keyName, (err, data) => {
    if (err) return res.status(400).send(err);

    const allfootballers = JSON.parse(data.footballersdata);
    if (allfootballers.playerKey) {
      res.status(202).send('player is already in the DB')
    }

    var footballersdata = JSON.stringify(
      objectAssign({},
      JSON.parse(data.footballersdata),
      { [playerKey]: footballerData })
    );

    Redis.HMSET(keyName, { footballersdata }, (err, reply) => {
      if (err) return res.status(400).send(err);
      else return res.status(200).json(footballersdata);
    });
  });
});

module.exports = router;
