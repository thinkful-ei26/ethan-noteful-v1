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
          expect(item).to.include.keys('id', 'title', 'content');
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

describe('GET specific ID tests', function(){

  it('should return a correct note object with id, title and content for a given id', function(){
    const itemID = '1001';
    const specificItem = {};
    return (
      chai
        .request(app)
        .get(`/api/notes/${itemID}`)
        .then(function(res){
          // console.log(res.body);
          specificItem.id = res.body.id;
          specificItem.title = res.body.title;
          specificItem.content = res.body.content;
          // console.log(specificItem);
          return chai
            .request(app)
            .get('/api/notes')
            .then(function(res){
              // console.log(res.body[1]);
              const matchedItem = res.body.filter(function (item) {
                return item.title === specificItem.title && item.id === specificItem.id && item.content === specificItem.content;
              });
              // console.log(matchedItem);
              expect(matchedItem.length).to.eq(1);
            });
        }));
  });

  it('should return a 404 for an invalid ID', function(){
    const itemID = 11000;
    return chai.request(app)
      .get(`/api/notes/${itemID}`)
      .then(function(res){
        expect(res).to.have.status(404);
      });
  });
});

describe('POST new notes', function(){

  it('should create and return a new item with location header when provided valid data', function(){
    const newItem = {title: 'foo', content: 'bar'};
    return chai.request(app)
      .post('/api/notes/')
      .send(newItem)
      .then(function(res){
        expect(res).to.have.status(201);
        console.log(res);
        expect(res.headers).to.exist;
      });
  });



});