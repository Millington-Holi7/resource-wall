/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
//const cookieSession = require("cookie-session");

// router.use(
//   cookieSession({
//     //
//     name: "session", //name could be anything but make sure context is there
//     keys: ["key1", "key2"],

//   })
// );

//USERS CRUD REST API

//CREATE - POST /
router.post("/register", (req, res) => {
  const { username, email, password, profile_pic } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  const newUser = { username, email, password: hashedPassword, profile_pic }; //DONT FORGET TO IMPLEMENT URL
  userQueries.getUserWithEmail(email).then(user => {
    if (user && user.id) {
      //will reject
      return res.status(400).send({ message: 'email already registered' });
    }
    userQueries.addUser(newUser).then(user => {
      if (user && user.id) {
        console.log(req.body);
        req.session.user_id = user.id;
        res.redirect("/");
      }
    });
  });
});


//READ ALL - GET /
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// //READ ONE - GET /:id
router.post("/login", (req, res) => {
  const { username, email, password } = req.body;

  userQueries.getUserWithEmail(email)
    .then(user => {

      req.session.userId = user.id
      res.redirect("/")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/users/login")
    })

})
// router.get('/:id', (req, res) => {
//
// })

// //UPDATE - POST /:id
// router.post('/:id', (req, res) => {

//
// })

// //DELETE - POST /:id/delete
// router.post('/:id/delete', (req, res) => {
//
// })

// CREATE POST
router.post('/create-post', (req, res) => {
  userQueries.addPost(req.body, req.session.userId)
  res.redirect('/resources');
})

// SEARCH
router.post('/search', (req, res) => {
  console.log(req.body);
  userQueries.getResource(req.body)
  res.redirect('/');
})



module.exports = router;
