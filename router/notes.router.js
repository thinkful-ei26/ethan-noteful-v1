'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

router.get('/notes', (req, res, next) => { 
  const { searchTerm } = req.query;
  notes.filter(searchTerm)
    .then(list => {
      // console.log(list);
      res.json(list);
    })
    .catch(err => {
      next(err);
    });
  // notes.filter(searchTerm, (err, list) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json(list);
  // });
});

router.get('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
  // notes.find(id, (err, list) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json(list);
  // }); 
});

router.put('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  const updateObj = {};
  const updateFields = ['title', 'content'];
  // console.log(req.body);
  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  notes.update(id, updateObj)
    .then(item => {
      if(item) {
        res.json(item);
      } else{
        next();
      }
    })
    .catch(err =>{
      next(err);
    });
  // notes.update(id, updateObj, (err, item) => {
  //   if (err) {
  //     return next(err);
  //   } if (item) {
  //     res.json(item);
  //   } else {
  //     next();
  //   }
  // });
  // console.log(updateObj);
});


router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  if (!newItem.title) {
    const err = new Error('Missing title in request body');
    err.status = 400;
    return next(err);
  }
  notes.create(newItem)
    .then(item => {
      if(item){
        res.location(`http://${req.headers.host}/notes/${item}`).status(201).json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
  // notes.create(newItem, (err, item) => {
  //   if (err) {
  //     return next(err);
  //   } if (item) {
  //     res.location(`http://${req.headers.host}/notes/${item}`).status(201).json(item);
  //   } else {
  //     next();
  //   }
  // });
});

router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.delete(id)
    .then(item => {
      if(item){
        res.status(204).end();
      }
    })
    .catch(err => {
      next(err);
    });
  // notes.delete(id, err => {
  //   if (err) {
  //     return next(err);
  //   } else {
  //     res.status(204).end();
  //   }
  // });
});

module.exports = router;

