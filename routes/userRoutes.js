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
  //const user = {};
  const templateVars = { user: null };
  //const templateVars = { user: user, error: undefined };
  res.render('login', templateVars);
});

//REGISTER ROUTES
router.get('/register', (req, res) => {
  const user = {};
  const profile_pic = ""; // Change this to the actual path
  const templateVars = { user: user, profile_pic: profile_pic, error: undefined }; // Remove the colon after profile_pic
  res.render('register', templateVars);
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
      const templateVars = { user: currentUser, username: user.username, email: user.email, password: user.password, profile_pic: user.profile_pic }
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

router.post("/:resourceId", (req, res) => {
  const { resourceId } = req.params;

  userQueries.getPostById(resourceId)
    .then((data) => {
      const templateVars = data;
      res.render('resource', templateVars)
    })
})

router.post("/logout", (req, res) => {
  req.session = null;
  return res.redirect(`/login`);
});


// enables storing passwords as hashed passwords instead of plaintext
const bcryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};



module.exports = router;
