const express = require('express');
const router = express.Router();
const Player = require('../models/model');

router.get('/:playerID', (req, res) => {
  const playerID = req.params.playerID;
  Player.findById(playerID, (err, player) => {
    if (!player) return res.status(202).send('player not in the database');
    err ? res.status(400).send(err) : res.send(player);
  });
});

router.post('/footballer', (req, res) => {
  const newPlayer = req.body;
  Player.create(newPlayer, (err, player) => {
    err ? res.status(400).send(err) : res.send(player);
  });
});

router.put('/:playerID', (req, res) => {
  const playerID = req.params.playerID;
  const newPlayer = req.body;
  const option = { new: true };

  Player.findByIdAndUpdate(playerID, newPlayer, option, (err, player) => {
    if (!player) return res.status(202).send('player not in the database');
    err ? res.status(400).send(err) : res.send(player);
  });
});

router.delete('/:playerID', (req, res) => {
  const playerID = req.params.playerID;

  Player.findByIdAndRemove(playerID, (err, player) => {
    err ? res.status(400).send(err) : res.send('Player successfully removed from database');
  });
});

module.exports = router;
