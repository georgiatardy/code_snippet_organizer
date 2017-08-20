const express = require('express');
const routes = express.Router();
const User = require('../models/users');
const Snippet = require('../models/snippets')
const mongoose = require('mongoose');

const requireLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

routes.use(requireLogin);

routes.get('/snippets/add', (req, res) => {


  if (req.query.id) {
    Snippet.findById(req.query.id)

      .then(snippet => res.render('add', {
        snippet: snippet
      }));
  } else {
    res.render('add');
  }
});

routes.post('/snippets', (req, res) => {
  if (!req.body._id) {
    req.body._id = new mongoose.mongo.ObjectID();
  }

  req.body.author = req.user.username;
  console.log(req.body);

  req.body.tags = req.body.tags.filter((item) => {
    return item !== ''
  });
  Snippet.findByIdAndUpdate(req.body._id, req.body, {
      upsert: true
    })
    .then(() => res.redirect('/'))

    .catch(err => {
      console.log(err);
      res.render('snippets', {
        errors: err.errors,
        item: req.body
      });
    });
});


routes.get('/deleteSnippet', (req, res) => {
  Snippet.findById(req.query.id).remove()
    .then(() => res.redirect('/'));
});

module.exports = routes;
