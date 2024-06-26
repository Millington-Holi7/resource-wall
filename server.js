// load .env data into process.env
require('dotenv').config(); //module that helps manage

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require("cookie-session");

// const router  = express.Router();
// const bcrypt = require("bcryptjs");
const userQueries = require('./db/queries/users');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(
  cookieSession({
    //
    name: 'session',
    keys: ['key1', 'key2'], // You can use any string(s) as key(s)
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const apiRoutes = require('./routes/ApiRoutes');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', postRoutes);
app.use('/users', userRoutes); //all routes for users begin with /users
app.use('/resources', resourceRoutes);
app.use('/api', apiRoutes)
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  userQueries.getAllPosts()
    .then(posts => {

      const templateVars = { posts, user: req.session}
      res.render('index', templateVars);
    })
    .catch((error) => {
      console.log(error)
    })
});

app.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect(`/users/login`);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

module.exports = app;
