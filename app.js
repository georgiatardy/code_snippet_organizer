//===Packages===//
const express = require('express');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const expressFlash = require('express-flash-messages');
const handlebars = require('express-handlebars');
const session = require('express-session');
const mongodb = require('mongodb');
const passport = require('passport');

const app = express();


//===Require Mongoose and Bluebird===//
const mongoose = require('mongoose');
const bluebird = require('bluebird');


//===Models for users and code snippets===//
const User = require('./models/users');
const Snippets = require('./models/snippets');


//===Tell Express to use Handlebars===//
app.engine('handlebars', handlebars());
app.set('views', './views');
app.set('view engine', 'handlebars');


//===Create Session===//
app.use(
  session({
    secret: 'hush hush',
    resave: false,
    saveUninitialized: true
  })
);


//===Connect Passport to Express boilerplate===//
app.use(passport.initialize());
app.use(passport.session());
app.use(expressFlash());


//===BodyParser Middleware===//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//===Middleware that checks if user in in session, if not redirect to login===//
const requireLogin = (request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
};

// app.get('/', requireLogin, (req, res) => {
//       console.log(session);
//       codeSnippet.find({
//           createdBy: request.user.username
//         })
//         .then((snippets) => {
//           res.render('home', {
//             user: req.user.snippets:snippets
//           })
//         });

      //===Log Out===//
      app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
      });


      //===Connect to Mongo via Mongoose===//
      mongoose
        .connect('mongodb://localhost:27017/bcryptExample', {
          useMongoClient: true
        })
        .then(() => app.listen(3000, () => console.log('App is running!')));
