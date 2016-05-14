const express = require('express');
const router = express.Router();
const Redis = require('../redis/redis_config.js').createClient();

const keyGenerator = (name, dataType) => {
  if (dataType === 'footballer') return name.toLowerCase();
  else return `${name.toLowerCase()}'s ${dataType.toLowerCase()}`;
};

router.get('/:footballer', (req, res) => {
  const footballer = req.params.footballer.toLowerCase();
  Redis.HGETALL(footballer, (err, data) => {
    if (err) return res.status(400).send(err);
    else data ? res.status(200).send(data.footballerData) : res.status(202).send('Data not in the DB');
  });
});

router.post('/footballer', (req, res) => {
  if(req.body.name && req.body.dataType) {
    const keyName = keyGenerator(req.body.name, req.body.dataType);
  } else return res.status(401).send('A name and dataType is required');

  const footballerData = JSON.stringify(req.body);
  Redis.HGETALL(keyName, (err, data) => {
    if (err)  return res.status(400).send(err);
    else if (data) {
      res.status(202).send('Data has already been submitted');
    } else {
      Redis.HMSET(keyName, { footballerData }, (err, reply) => {
        err ? res.status(400).send(err) : res.status(200).json(req.body)
      });
    }
  });
});

router.put('/footballer', (req, res) => {
  if(req.body.name && req.body.dataType){
    const keyName = keyGenerator(req.body.name, req.body.dataType);
  } else return res.status(401).send('A name and dataType is required');

  const footballerData = JSON.stringify(req.body);
  Redis.HGETALL(keyName, (err, data) => {
    if (err) { return res.status(400).send(err); }
    else if (data) {
      Redis.HMSET(keyName, { footballerData }, (err, reply) => {
        if (err) return res.status(400).send(err);
        else return res.status(200).json(req.body);
      });
    } else return res.status(202).send('Data is not in the DB');
  });
});

router.delete('/:footballer', (req, res) => {
  const hash = req.params.footballer;
  Redis.DEL(hash, (err, reply) => {
    if (err) return res.status(400).send(err);
    else reply === 0 ? res.status(202).send('Data not in the database') : res.status(200).send('Data deleted');
  });
});

module.exports = router;
