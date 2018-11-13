'use strict';

// Load array of notes
const express = require('express');

const data = require('./db/notes');

const { PORT } = require('./config');

const app = express();

// console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

app.use(express.static('public'));

app.get('/api/notes/:id', (req, res) => {
  res.json(data.find(item => item.id === parseInt(req.params.id)));
});

app.get('/api/notes/', (req, res) => {
  // console.log(req.query);
  const { searchTerm } = req.params;
  if (searchTerm){
    res.json(data.filter(item => item.title.includes(req.query.searchTerm) || item.content.includes(req.query.searchTerm)));
  } else {
    res.json(data);
  }
});


app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
