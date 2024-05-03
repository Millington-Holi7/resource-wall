/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const cookieSession = require("cookie-session");
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
  res.render('register', { user });
});


//PROFILE ROUTES
//path to update user profile
router.get('/profile', (req, res) => {

  const currentUser = 1;
  // if (!currentUser) { // if they aren't logged in they can't update profile
  //   return res.redirect("/login");
  // }
  userQueries.getUser(currentUser) //send to function to get user info
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      console.log(user.profile_pic)
      const templateVars = { id: currentUser, username: user.username, email: user.email, password: user.password, profile_pic: user.profile_pic }
      res.render('profile', templateVars)
    })
});

router.post('/profile', (req, res) => {
  const { username, email, password, profile_pic } = req.body;
  const currentUser = req.session;

  const hash = bcryptPassword(password)
  const options = { username, email, password: hash, profile_pic }
  console.log(`***`, options)

  userQueries.updateUser(currentUser, options)
    .then(() => {
      console.log('successful')
    })
    .catch(error => {
      console.log(error)
    })

res.redirect('/')
})

router.post ("/:resourceId", (req,res) => {
  const { resourceId } = req.params;

  userQueries.getPostById(resourceId)
  .then((data) =>{
    const templateVars = data;
    res.render ('resource', templateVars)
  })
})



// enables storing passwords as hashed passwords instead of plaintext
const bcryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = router;
