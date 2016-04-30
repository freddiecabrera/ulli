const expect = require('chai').expect;
const request = require('supertest-chai').request;
const app = require('../../app.js');

describe('POST server route', () => {
  it('should add a player to the DB', done => {
    request(app)
      .post('/footballers/footballer')
      .send({name: 'freddie', dataType: 'footballer'})
      .end((err, res) => {
        console.log(res);
        expect(res.text).to.equal('Data has already been submitted');
        done();
      })
    request(app)
      .get('/footballers/freddie')
      .end((err,res) => {
        expect(JSON.parse(res.text)).to.be.an('object');
        expect(JSON.parse(res.text).name).to.be.an('string');
        expect(JSON.parse(res.text)).to.be.an('string');
        done();
      })
  })
})
