const expect = require('chai').expect;
const request = require('supertest-chai').request;
const app = require('../../app.js');

describe('POST server route', () => {
  it('should add a player to the DB', done => {
    request(app)
      .post('/footballers/footballer')
      .send({name: 'freddie', dataType: 'footballer'})
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.an('string');
        expect(res.body.dataType).to.be.an('string');
        done();
      })
  })
})
