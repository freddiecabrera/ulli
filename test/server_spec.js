'use strict'

const expect = require('chai').expect
const request = require('supertest-chai').request;
const app = require('../app.js')

describe('Server connection', () => {
  it('should respond to /', done => {
    request(app)
      .get('/')
      .end(res => { res.should.have.status(200); done();});
  })

  it('should respond to /footballers', done => {
    request(app)
      .get("/footballers/neymar%20jr's%20total%20appearances")
      .end(res => { res.should.have.status(200); done(); });
  })

  it('should 404 if params are empty', done => {
    request(app)
      .get('/footballers')
      .end(res => { res.should.have.status(404); done(); });
  })

  it('should 204 if the footballer is not in the db', done => {
    request(app)
      .get('/footballers/testing')
      .end(res => { res.should.have.status(204); done(); });
  })

  it('should 404', (done) => {
    request(app)
      .get('/falseroute')
      .end(res => { res.should.have.status(404); done(); });
  })

})
