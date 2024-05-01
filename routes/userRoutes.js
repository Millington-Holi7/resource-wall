/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const cookieSession = require("cookie-session");
const router  = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');


//MIDDLEWEAR
router.use(
  cookieSession({
    //
    name: "cookiez", //name could be anything but make sure context is there
    keys: ["key1", "key2"],
  })
);

//LOGIN ROUTES
router.get('/login', (req, res) => { ///users/login
    res.render('login');
});


//REGISTER ROUTES

router.get('/register', (req, res) => { ///users/register
  const user = {}
  res.render('register', {user});
});



module.exports = router;
