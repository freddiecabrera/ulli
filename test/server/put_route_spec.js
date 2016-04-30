const expect = require('chai').expect;
const request = require('supertest-chai').request;
const app = require('../../app.js');
const Redis = require('../../redis/redis_config.js')

describe('PUT server route', () => {
  it('should', done => {
    request(app)
    .put('/footballers/footballer')
    .send({ name: 'testplayer2', dataType: 'footballer', fullGame: '10', subbedOn: '10', subbedOff: '10' })
    .end((err, res) => {
      if (err) res.status(400).send(err);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.name).to.be.a('string');
      expect(res.body.dataType).to.be.a('string');
      done();
    })
  })

  it('should 401 if it does not contain both a name and a dataType', done => {
    request(app)
    .put('/footballers/footballer')
    .send({ notName: 'freddie', data: 'footballer'})
    .end((err, res) => {
      if (err) return res.status(400).send(err);
      expect(res.status).to.equal(401);
      expect(res.text).to.equal('A name and dataType is required');
      done();
    })
  })

  it('should 202 if the data does not exist', done => {
    request(app)
    .put('/footballers/footballer')
    .send({ name: 'not in the db', dataType: 'footballer'})
    .end((err, res) => {
      if (err) return res.status(400).send(err);
      expect(res.status).to.equal(202);
      expect(res.text).to.equal('Data is not in the DB');
      done();
    })
  })
})
