const expect = require('chai').expect;
const request = require('supertest-chai').request;
const app = require('../../app.js');
const Redis = require('../../redis/redis_config.js').createClient();

describe('POST server route', () => {
  it('should add a player to the DB', done => {
    request(app)
      .post('/footballers/footballer')
      .send({name: 'testplayer1', dataType: 'footballer'})
      .end((err, res) => {
        if (err) res.status(400).send(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.a('string');
        expect(res.body.dataType).to.be.a('string');
        Redis.DEL('testplayer1', (err, reply) => { if(err) return res.status(404).send(err); })
        done();
      })
  })

  it('should not add player that is already in the DB', done => {
    request(app)
    .post('/footballers/footballer')
    .send({name: 'testplayer2', dataType: 'footballer'})
    .end((err, res) => {
      if (err) return res.status(404).send(err).done();
      expect(res.text).to.equal('Data has already been submitted');
      expect(res.status).to.equal(202);
      done();
    })
  })

  it('should return 401 if it does not contain both a name and a dataType', done => {
    request(app)
    .post('/footballers/footballer')
    .send({ notName: 'freddie', data: 'footballer'} )
    .end((err, res) => {
      if (err) return res.status(400).send(err);
      expect(res.status).to.equal(401);
      expect(res.text).to.equal('A name and dataType is required');
      done();
    })
  })
})
