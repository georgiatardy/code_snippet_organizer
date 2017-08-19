//===Packages===//
const express = require('express');
const bcryptjs = require('bcryptjs');
const bodyParser = require('body-parser');
const expressFlash = require('express-flash-messages');
const handlebars = require('express-handlebars');
const session = require('express-session');
const mongodb = require('mongodb');
const passport = require('passport');
const expessValidator = require('express-validator');

const app = express();


//===Require Mongoose and Bluebird===//
const mongoose = require('mongoose');
const bluebird = require('bluebird');
mongoose.Promise = bluebird;


//===Models for users and code snippets===//
const User = require('./models/users');
const Snippets = require('./models/snippets');


// ==== Calling Routes ==== //
const loginRoutes = require('./routes/login');
const snippetsRoutes = require('./routes/snippet');
const searchRoutes = require('./routes/search');

// === Connects to my code snippet data in Mongo === //
let url = 'mongodb://localhost:27017/codeSnippets';

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

app.use(express.static('public'));


//===Connect Passport to Express boilerplate===//
app.use(passport.initialize());
app.use(passport.session());
app.use(expressFlash());


//===BodyParser Middleware===//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


//===   Endpoints  ===//
const requireLogin = (request, response, next) => {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
};

app.get('/', requireLogin, function(req, res) {
  // TODO: Find the active template
  Snippets.find({author: req.user.username})
    .then((snippets) => {
      res.render('home', {user: req.user, snippets: snippets})
    })
    .catch(err => res.send('Can not find snippets'));
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  let user = new User(req.body);
  user.provider = 'local';
  user.setPassword(req.body.password);
  user.save()

    .then(() => res.redirect('/'))

    .catch(err => console.log(err));
});

app.use('/', loginRoutes);
app.use('/', snippetsRoutes);
app.use('/', searchRoutes);


      mongoose
        .connect('mongodb://localhost:27017/codeSnippets', {
          useMongoClient: true
        })
        .then(() => app.listen(3000, () => console.log('App is running!')));
