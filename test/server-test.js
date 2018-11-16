'use strict';

const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {
  
  it('true should be true', function(){
    expect(true).to.be.true;
  });

  it('2+2 should equal 4', function(){
    expect(2 + 2).to.equal(4);
  });

});

describe('Express static', function(){

  it('GET request "/" should return the index page', function() {
    return chai.request(app)
      .get('/')
      .then(function(res){
        expect(res).to.exist;
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });

});

describe('404 handler', function(){

  it('should respond with 404 when given a bad path', function (){
    return chai.request(app)
      .get('/DOES/NOT/EXIST')
      .then(res => {
        expect(res).to.have.status(404);
      });
  });

});

describe('GET all tests', function (){

  it('should return the default of 10 Notes as an array', function (){
    return chai.request(app)
      .get('/api/notes')
      .then(function(res){
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        // expect(res.body[0]).to.be.a('object');
        res.body.forEach(item => expect(item).to.to.be.a('object'));
        expect(res.body.length).to.eq(10);
      });
  });

  it('should return an array of objects with id, title, and content', function (){
    return chai.request(app)
      .get('/api/notes')
      .then(function(res){
        // expect(res.body[0]).to.include.keys('id', 'title', 'content');
        // expect(res.body.forEach(item => item.to.include.keys('id', 'title', 'content')));
        res.body.forEach(function(item) {
          expect(item).to.include.keys('id', 'title', 'content')
        });
        // expect(res.body.length).to.eq(10);
        // expect(res.body.length).to.eq(0);
      });
  });


  it('should return results for a correct search term', function (){
    const searchTerm = 'cat';
    return chai.request(app)
      .get(`/api/notes/?searchTerm=${searchTerm}`)
      .then(function(res){
        expect(res.body.length).to.be.above(0);
        res.body.forEach(function(item) {
          expect(item.title).to.include(searchTerm);
        });
      });
  });

  it('should return an empty array for incorrect search term', function (){
    const searchTerm = 'america';
    return chai.request(app)
      .get(`/api/notes/?searchTerm=${searchTerm}`)
      .then(function(res){
        expect(res.body.length).to.eq(0);
      });
  });


});