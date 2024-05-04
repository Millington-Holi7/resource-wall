/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const userQueries = require('../db/queries/users');

//LOGIN ROUTES
router.get('/login', (req, res) => { ///users/login
  const templateVars = { user: null };
  res.render('login', templateVars);
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  userQueries.getUserWithEmail(email)
    .then((user) => {
      console.log(user)
      req.session.user_id = user.id;
      res.redirect("/")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/users/login")
    })

})

//REGISTER ROUTES
router.get('/register', (req, res) => {
  if (req.session.user_id) {
    // If user is already logged in, redirect to /urls or another relevant page
    const currentUser = userQueries.getUser(req.session.user_id);
    if (currentUser) {
      return res.redirect("/login");
    }
  }
  const templateVars = { user: null };
  res.render("register", templateVars);
});

router.post("/register", (req, res) => {
  const { username, email, password, profile_pic } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  const newUser = { username, email, password: hashedPassword, profile_pic }; //DONT FORGET TO IMPLEMENT URL

  userQueries.getUserWithEmail(email).then(user => {
    if (user && user.id) {
      return res.status(400).send({ message: 'email already registered' });
    }
    userQueries.addUser(newUser).then(user => {
      if (user && user.id) {
        console.log('333', user);
        req.session = user;
        res.redirect("/");
      }
    });
  });
});


//PROFILE ROUTES
//path to update user profile
router.get('/profile', (req, res) => {
  console.log(req.session)
  const currentUser = req.session;

  // userQueries.getUser(currentUser) //send to function to get user info
  //   .then((user) => {
  //     if (!user) {
  //       return res.send({ error: "no user with that id" });
  //     }

  const templateVars = { user: currentUser }
  res.render('profile', templateVars)

});

router.post('/profile', (req, res) => {
  const { username, email, password, profile_pic } = req.body;
  console.log(req.session)
  const currentUser = req.session.user_id;
  let hash = bcryptPassword(password)

  const options = { username, email, password: hash, profile_pic }
  console.log(`***`, options)

  userQueries.updateUser(currentUser, options)
    .then(() => {
      console.log('successful')

    })
    .catch(error => {
      console.log(error)
    })
  res.redirect('/users/profile')

})

router.post("/:resourceId", (req, res) => {
  const { resourceId } = req.params;

  userQueries.getPostById(resourceId)
    .then((data) => {
      const templateVars = data;
      res.render('resource', templateVars)
    })
})




// enables storing passwords as hashed passwords instead of plaintext
const bcryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};



module.exports = router;
