const expect = require('chai').expect
const request = require('supertest-chai').request;
const app = require('../../app.js')

describe('GET server route', () => {
  it('should respond to /', done => {
    request(app)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  })

  it('should respond to a specific data request like total appearances', done => {
    request(app)
      .get("/footballers/neymar%20jr's%20total%20appearances")
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(parseInt(JSON.parse(res.text).fullGame)).to.be.an('number')
        expect(parseInt(JSON.parse(res.text).subbedOn)).to.be.an('number')
        expect(parseInt(JSON.parse(res.text).subbedOff)).to.be.an('number')
        expect(JSON.parse(res.text)).to.be.an('object')
        done();
      });
  })

  it('should respond to an initial footballer GET', done => {
    request(app)
    .get('/footballers/Neymar%20Jr')
    .end((err, res) => {
      if (err) return done(err);
      expect(JSON.parse(res.text)).to.be.an('object');
      expect(JSON.parse(JSON.parse(res.text).performanceScoreByMatch)).to.be.an('object')
      expect(JSON.parse(JSON.parse(res.text).cumulativePerformanceScore)).to.be.an('object')
      done();
    })
  })

  it('should 404 if params are empty', done => {
    request(app)
      .get('/footballers')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  })

  it('should 202 if the footballer is not in the db', done => {
    request(app)
      .get('/footballers/testing')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(202);
        expect(res.text).to.equal('Data not in the DB')
        done();
      });
  })

  it('should 404', (done) => {
    request(app)
      .get('/falseroute')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(404);
        done();
      });
  })

})
