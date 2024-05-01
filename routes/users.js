/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const database = require("../db/queries/users");

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

//path to update user profile
router.get('/profile', (req, res) => {
  const currentUser = req.session.user_id;

  database.getUserWithId(currentUser)
  .then((user) => {
    if (!user) {
      return res.send({ error: "no user with that id" });
    }
    const templateVars = {id:currentUser, username:user.username, email:, password: user.password, profile}
    res.render('profile', templateVars)
  })
});



router.post('/profile', (req,res) => {

  // Validation: Check if email or password is empty
  if (!email || !password) {
    return res.status(400).send("Email and password cannot be blank.");
  }
  // Everything is fine; proceed with user update

  const hash = bcryptPassword(password);
  users[] = { username, email, password: hash };
database.updatedUser()
  req.session.user_id = id;
  // Redirect to '/urls' after successful registration
  res.redirect("/urls");
})

module.exports = router;


/**
 * ROUTES
 *routes , get /(main page),   get and post /login,    get and post  /register,    get /profile,     get /resources,    post /search,      post /new (save button)

 * get  /login    (login page)
 * get /register  (register page)
 * get /          (main page showing all the posts)
 * get /profile   ()
 * post /logout (allow user to logout of their profile)
 */
