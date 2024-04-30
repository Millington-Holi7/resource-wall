/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require("bcryptjs");

router.get('/login', (req, res) => { ///users/login
    res.render('login');
});


//REGISTER ROUTES

router.get('/register', (req, res) => { ///users/register
  res.render('register');
});



module.exports = router;
