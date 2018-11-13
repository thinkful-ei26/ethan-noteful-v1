'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

notes.filter('cats', (err, list) =>{
  if (err) {
    console.error(err);
  }
  console.log(list);
});

notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

const updateObj = {
  title: 'New Title',
  content: 'Blachh'
};

notes.update(1005, updateObj, (err, item) => {
  if (err){
    console.error(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  } 
});


const newObj = {
  id: null,
  title: 'foo',
  content: 'bar'
};


notes.create(newObj, (err, item) => {
  if (err) {
    console.error(err);
  } else {
    console.log(item);
  }
});

notes.find(1010, (err, item) => {
  if (err) {
    console.error(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

notes.delete(1010, (err, list) => {
  if (err){
    console.error(err);
  } else {
    console.log(list);
  }
});

notes.find(1010, (err, item) => {
  if (err) {
    console.error(err);
  } if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});