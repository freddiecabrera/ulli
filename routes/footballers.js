const express = require('express');
const router = express.Router();
const Player = require('../models/model');

router.get('/:footballer', (req, res) => {
  const footballer = req.params.footballer;
  Player.findOne({ name: footballer }, (err, player) => {
    if (!player) return res.status(202).send('player not in the database');
    err ? res.status(400).send(err) : res.send(player);
  });
});

router.post('/footballer', (req, res) => {
  const newPlayer = req.body;
  Player.findOne({ name: newPlayer.name }, (err, player) => {
    if (err) return res.status(400).send(err);
    if (player === null) {
      Player.create(newPlayer, (err, player) => {
        err ? res.status(400).send(err) : res.send(player);
      });
    } else {
      return res.status(202).send('Player already in the database');
    }
  });
});

router.put('/:footballer', (req, res) => {
  const footballer = req.params.footballer;
  const newPlayer = req.body;
  const option = { new: true };

  Player.findOne({ name: footballer }, (err, player) => {
    if (player === null) {
      return res.status(202).send('Player not in the database');
    } else {
      Player.findByIdAndUpdate(player._id, newPlayer, option, (err, player) => {
        if (!player) return res.status(202).send('player not in the database');
        err ? res.status(400).send(err) : res.send(player);
      });
    }
  });
});

router.delete('/:footballer', (req, res) => {
  const footballer = req.params.footballer;
  Player.findOne({ name: footballer }, (err, player) => {
    if (player === null) {
      return res.status(202).send('Player not in the database');
    } else {
      Player.findByIdAndRemove(player.id, (err, player) => {
        err ? res.status(400).send(err) : res.send('Player successfully removed from database');
      })
    }
  });
});

module.exports = router;
