const expect = require('chai').expect;
const request = require('supertest-chai').request;
const app = require('../../app.js');
const Redis = require('../../redis/redis_config.js').createClient();

describe('DELETE', () => {
  it('should successfully delete', done => {
    request(app)
    .del('/footballers/testplayer3')
    .end((err, res) => {
      if (err) return res.status(400).send(err);
      expect(res.status).to.equal(200);
      expect(res.text).to.equal('Data deleted');
      Redis.HMSET('testplayer3', { name: 'testplayer3', dataType: 'footballer' });
      done();
    })
  })

  it('should 202 if the data is not in the DB', done => {
    request(app)
    .del('/footballers/falsedata')
    .end((err, res) => {
      if (err) return res.status(400).send(err);
      expect(res.status).to.equal(202);
      expect(res.text).to.equal('Data not in the database');
      done();
    })
  })
})
