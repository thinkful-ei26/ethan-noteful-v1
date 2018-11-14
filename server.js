'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');


const { PORT } = require('./config');
// const { logger } = require('./middleware/logger');
// const data = require('./db/notes');
// const simDB = require('./db/simDB');
// const notes = simDB.initialize(data);

console.log('Hello Noteful!');

const notesRouter = require('./router/notes.router');


const app = express();

// app.use(logger);

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());

app.use('/api', notesRouter);


// app.use(notesRouter('/api/notes'));


// app.get('/api/notes/:id', (req, res) => {
//   res.json(data.find(item => item.id === parseInt(req.params.id)));
// });

// app.get('/api/notes/', (req, res) => {
//   // console.log(req.query);
//   const { searchTerm } = req.params;
//   if (searchTerm){
//     res.json(data.filter(item => item.title.includes(req.query.searchTerm) || item.content.includes(req.query.searchTerm)));
//   } else {
//     res.json(data);
//   }
// });

// app.get('/api/notes', (req, res, next) => { 
//   const { searchTerm } = req.query;
//   notes.filter(searchTerm, (err, list) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(list);
//   });

//   // notes.filter(req.query.searchTerm, (err, list) => {
//   //   if (err) {
//   //     return next(err);
//   //   }
//   //   res.json(list);
//   // });
// });

// app.get('/boom', (req, res, next) =>{
//   throw new Error ('Boom!');
// });

// app.get('/api/notes/:id', (req, res, next) => {
//   const id = req.params.id;
//   notes.find(id, (err, list) => {
//     if (err) {
//       return next(err);
//     }
//     res.json(list);
//   }); 
// });

// app.put('/api/notes/:id', (req, res, next) =>{
//   const id = req.params.id;
//   const updateObj = {};
//   const updateFields = ['title', 'content'];
//   console.log(req.body);
//   updateFields.forEach(field => {
//     if (field in req.body) {
//       updateObj[field] = req.body[field];
//     }
//   });
//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     } if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
//   console.log(updateObj);
// });

app.use(function (req, res, next){
  let err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({message: 'Not Found'});
});

app.use(function (err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(PORT, function(){
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
